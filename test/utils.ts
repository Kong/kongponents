import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
// vue-router only throws uncaught errors in production mode
import { createMemoryHistory, createRouter } from 'vue-router/dist/vue-router.prod.cjs'
import type { Locator } from 'vitest/browser'
import type { Router, RouteRecordRaw } from 'vue-router'
import { h } from 'vue'

/**
 * Browser Mode counterparts of the Cypress custom commands in `cypress/support/index.ts`,
 * so converting a `*.cy.ts` spec stays a mechanical translation:
 *
 *   cy.mount(C, opts)              -> renderComponent(C, opts)
 *   cy.mountWithProdRouter(C, o)   -> renderWithProdRouter(C, o)
 *   cy.getTestId('foo')            -> getTestId('foo')
 *   cy.get('.selector')            -> page.getByCSS('.selector')
 *   cy.get('x').findTestId('foo')  -> findTestId(page.getByCSS('x'), 'foo')
 *
 * `getByCSS` is registered in `test/setup.ts`; Vitest's `page` has no CSS selector.
 *
 * One behavioural difference to know before converting: Cypress commands retried and
 * could resolve to several elements, hence `.eq(n)`. Vitest locators are lazy and strict
 * — they throw on more than one match. Use `.nth(n)` or `.all()` instead of `.eq(n)`, and
 * let `expect.element()` do the waiting rather than adding manual timeouts.
 */

/**
 * `render` is generic over the component, so its options are instantiated per component and
 * props are typechecked. Keep these aliases parameterised by `T` — `Parameters<typeof
 * render>` without it collapses the generics to their defaults and silently widens every
 * prop to `any`.
 */
type RenderOptions<T> = NonNullable<Parameters<typeof render<T>>[1]>
type RenderResult<T> = ReturnType<typeof render<T>>

/** Render options plus the `router` escape hatch our Cypress `mount` command supported. */
type RenderComponentOptions<T> = RenderOptions<T> & { router?: Router }

const testRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    alias: '/:pathMatch(.*)*',
    meta: { title: 'Kongponents Tests' },
    component: { render: () => h('div') },
  },
]

/** Push a plugin onto `global.plugins` without mutating the caller's options object. */
const withPlugin = <T>(options: RenderOptions<T>, plugin: Router): RenderOptions<T> => {
  const global = { ...options.global }

  global.plugins = [...(global.plugins ?? []), plugin]

  return { ...options, global }
}

/**
 * Render a component for testing. Mirrors `cy.mount`: options pass straight through, and
 * a `router` option is installed as a plugin.
 */
export const renderComponent = <T>(
  component: T,
  options: RenderComponentOptions<T> = {} as RenderComponentOptions<T>,
): RenderResult<T> => {
  const { router, ...renderOptions } = options

  return render(component, router ? withPlugin(renderOptions, router) : renderOptions)
}

/**
 * Render a component with a production-build router mounted against the sandbox routes.
 * Use for components that read from or navigate the router (e.g. anchor links), where the
 * dev build's uncaught-error behaviour would obscure the assertion.
 */
export const renderWithProdRouter = <T>(
  component: T,
  options: RenderComponentOptions<T> = {} as RenderComponentOptions<T>,
): RenderResult<T> => {
  const router = options.router ?? createRouter({
    routes: testRoutes,
    history: createMemoryHistory(),
  })

  return renderComponent<T>(component, { ...options, router })
}

/** Locate an element by its `data-testid` attribute. Counterpart of `cy.getTestId`. */
export const getTestId = (dataTestId: string): Locator => page.getByTestId(dataTestId)

/** Locate an element by `data-testid` within another locator. Counterpart of `cy.findTestId`. */
export const findTestId = (subject: Locator, dataTestId: string): Locator =>
  subject.getByTestId(dataTestId)
