---
name: "convert-cypress-to-vitest-component"
description: "Convert Cypress component tests (*.cy.ts) to Vitest Browser Mode tests (*.browser.spec.ts) in the Kongponents library. Use this whenever the user asks to convert, migrate, port, or rewrite component tests from Cypress to Vitest, names one or more component folders under src/components to convert (\"do KBadge and KAlert next\", \"convert KTable\"), asks to continue or resume the Cypress-to-Vitest migration, or mentions Vitest browser mode for component tests. Use it even when the user never says \"Cypress\" or \"Vitest\" — a request to migrate, port, or redo the tests for a named Kongponent is this skill."
---
 
# Converting Cypress component tests to Vitest Browser Mode

Kongponents is migrating its component tests off Cypress onto Vitest Browser Mode
(Chromium, Firefox and WebKit via Playwright), one small batch at a time. Your job is to
translate a batch of `*.cy.ts` specs into `*.browser.spec.ts` specs that assert the same
things, then prove they pass.

The migration is incremental and both runners stay green in CI throughout, so a batch that
only half-works is worse than a smaller batch that fully works.

## Scope of one batch

The user names two or three component folders under `src/components`. For each one:

- Read `<Component>.cy.ts`, write `<Component>.browser.spec.ts` beside it. The
  `.browser.spec.ts` suffix is what routes a file to the browser project — a plain
  `.spec.ts` runs in jsdom instead and will fail on the browser-only APIs.
- **Leave the `.cy.ts` file in place.** Cypress is removed in a single final sweep once
  every component has been converted; deleting specs piecemeal would silently drop
  coverage if a conversion turns out to be wrong. Only delete when the user explicitly
  asks.
- Preserve `describe`/`it` names and their order verbatim. That's what makes the two
  suites diffable, and it's how the user checks nothing was quietly dropped.
Some folders hold more than one spec (`KFilterGroup` has four, `KToaster` has two).
Convert all of them, or say which you skipped and why.

## The harness

Shared helpers are added only once something actually needs them, so reach for the library
APIs first: `render` from `vitest-browser-vue`, and `page` from `vitest/browser`. If you
find yourself wanting a helper beyond the one below, say so in your report rather than
adding one — that's a decision for the user, not a side effect of a conversion.

Two harness files, both under `test/`:

- **`test/setup.ts`** imports the global stylesheet (so computed-style and visibility
  assertions are meaningful) and registers a custom `getByCSS` locator, since Vitest's
  `page` ships only semantic `getBy*` selectors and has no `page.locator()`.
- **`test/utils.ts`** exports `resetPointer()`, which parks the mouse pointer away from the
  component about to be mounted. Import it as `import { resetPointer } from '@test/utils'`
  and read "Hover tests need the pointer parked" below before writing any hover test.

```bash
pnpm typecheck
pnpm lint
pnpm test:browser src/components/<componentName>   # run one component's specs
pnpm test:browser:watch                   # headed, for debugging
pnpm test:browser:install                 # first run only — downloads the browsers
```

**Every spec runs once per engine.** That's the point — layout, computed
styles and font metrics differ between Chromium, Firefox and WebKit, and a component
library should catch that before a consumer does. Two consequences: the suite is slow, so
keep batches small; and a failure in one engine only is a real finding, not flake. Report
which engine failed rather than loosening the assertion until all three pass.

## Workflow

1. **Read the whole `.cy.ts` first.** Conversions go wrong when done statement by
   statement — a test's last assertion often reveals what the setup was really for.
2. **Inventory the hard parts** before writing: inline wrapper components using `template`
   (see below — they need care), spies, `Cypress.vueWrapper` calls, `cy.window`/
   `cy.document`, anything in the Edge cases section. If something genuinely doesn't
   translate, plan to leave it out and report it rather than inventing a weaker assertion
   that always passes.
3. **Convert test for test**, using the mapping below.
4. **Run it**: `pnpm test:browser src/components/<Name>`. Iterate until green in all three
   engines.
5. **Run `pnpm typecheck` and `pnpm lint`.**
6. **Report** in the format at the bottom.
Work through components one at a time and get each green before starting the next. A
failure in the second component is much easier to diagnose when the first is settled.

## Mapping

### Mounting

| Cypress                                       | Vitest                                        |
| --------------------------------------------- | --------------------------------------------- |
| `cy.mount(C, opts)`                           | `const screen = await render(C, opts)`        |
| `Cypress.vueWrapper.setProps({ a: 1 })`       | `await screen.rerender({ a: 1 })`             |
| `Cypress.vueWrapper.emitted()`                | `screen.emitted()`                            |
| `Cypress.vueWrapper.emitted('input')?.[0][0]` | same shape; the value is typed `unknown`      |
| `Cypress.vueWrapper.unmount()`                | `await screen.unmount()`                      |
| `Cypress.vueWrapper.setData({ ready: true })` | no equivalent — see "Dynamic slots" below     |
| `cy.mountWithProdRouter(C, opts)`             | no helper exists — see "Location and routing" |

`render` is imported from `vitest-browser-vue`. Mount options pass straight through, so
`props`, `slots`, `attrs` and `global` work unchanged, and `render` infers the component's
prop types so a wrong prop is a type error.

**Await it.** Synchronous use is deprecated upstream and disappears in the next major.
(The KBadge reference spec predates that discovery and doesn't await — follow this
guidance rather than copying it.)

Components are unmounted between tests automatically (`vitest-browser-vue` is in
`setupFiles`), so don't add manual cleanup.

Asserting that an event fired at all needs `expect.poll`, because `emitted()` returns a
plain snapshot rather than a locator and so doesn't retry — the click resolves before Vue
has flushed the handler:

```ts
await expect.poll(() => screen.emitted()).toHaveProperty('input')
expect(screen.emitted('input')?.[0][0]).toBe(true)   // subsequent reads can be plain
```

### Selectors

| Cypress                                  | Vitest                                 |
| ---------------------------------------- | -------------------------------------- |
| `cy.get('.k-badge')`                     | `page.getByCSS('.k-badge')`            |
| `cy.getTestId('foo')`                    | `page.getByTestId('foo')`              |
| `cy.get('.a').find('.b')`                | `page.getByCSS('.a').getByCSS('.b')`   |
| `cy.get('.a').findTestId('b')`           | `page.getByCSS('.a').getByTestId('b')` |
| `cy.get('.a').find('[data-testid="b"]')` | `page.getByCSS('.a').getByTestId('b')` |
| `.eq(n)`                                 | `.nth(n)`                              |
| `.first()` / `.last()`                   | `.first()` / `.last()`                 |
| `.contains('text')`                      | `page.getByText('text')`               |
| `cy.wrap(x).should('eq', v)`             | `expect(x).toBe(v)`                    |

`getByTestId` is built in and reads `data-testid`, so the old `getTestId`/`findTestId`
commands need no replacement — they were only ever shorthand.

Prefer an existing stable selector over adding one. Utilizing `data-testid`
attributes is **always preferred** over class names or other selectors.
Add a `data-testid` only when there's no stable selector at all,
and call it out in your report — it changes shipped component markup.

**Locators are strict.** A locator matching two elements throws when you use it, where
Cypress's `cy.get` silently yielded a collection. This surfaces genuine ambiguity that
Cypress hid, so when it happens prefer tightening the selector over reaching for
`.first()`, unless the original test really did mean "any of these".

### Assertions

Every assertion is awaited. `expect.element` retries until it passes or times out, which
is what replaces Cypress's built-in retries — so translate `should` into an awaited
`expect.element` rather than reading DOM properties yourself.

| Cypress                                  | Vitest                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| `.should('be.visible')`                  | `await expect.element(l).toBeVisible()`                                |
| `.should('not.be.visible')`              | `await expect.element(l).not.toBeVisible()`                            |
| `.should('exist')`                       | `await expect.element(l).toBeInTheDocument()`                          |
| `.should('not.exist')`                   | `await expect.element(l).not.toBeInTheDocument()`                      |
| `.should('contain.text', t)`             | `await expect.element(l).toHaveTextContent(t)`                         |
| `.should('have.text', t)`                | `await expect.element(l).toHaveTextContent(new RegExp('^' + t + '$'))` |
| `.should('have.class', c)`               | `await expect.element(l).toHaveClass(c)`                               |
| `.should('have.attr', a, v)`             | `await expect.element(l).toHaveAttribute(a, v)`                        |
| `.should('have.value', v)`               | `await expect.element(l).toHaveValue(v)`                               |
| `.should('be.disabled')`                 | `await expect.element(l).toBeDisabled()`                               |
| `.should('be.checked')`                  | `await expect.element(l).toBeChecked()`                                |
| `.should('have.focus')` / `'be.focused'` | `await expect.element(l).toHaveFocus()`                                |
| `.should('have.css', 'max-width', v)`    | `await expect.element(l).toHaveStyle({ maxWidth: v })`                 |
| `.should('have.length', n)`              | `await expect.poll(() => l.all().length).toBe(n)`                      |
| `.should('contain.html', h)`             | `expect(l.element().innerHTML).toContain(h)`                           |
| `.and('...')`                            | a second `await expect.element(...)` statement                         |

Four of these bite regularly:

- **`have.css` properties are camelCase.** `toHaveStyle` is typed against
  `CSSStyleDeclaration`, so `'max-width'` is a type error; write `maxWidth`.
- **`have.text` is exact, `contain.text` is a substring.** `toHaveTextContent` is a
  substring match, so an exact assertion needs the anchored regex above.
- **`.all()` doesn't retry.** It's a one-shot query, so a length assertion needs
  `expect.poll` to wait for the DOM to settle. The same goes for `.element()`.
- **Computed styles vary by engine.** An exact `toHaveStyle` on a font metric or a derived
  length can pass in Chromium and fail in WebKit. If a value is genuinely engine-dependent,
  assert the property that actually matters rather than the pixel value.

### Interactions

All awaited, and each waits for the element to be actionable first.

| Cypress                                  | Vitest                                                                                               |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `.click()` / `.trigger('click')`         | `await l.click()`                                                                                    |
| `.type('abc')`                           | `await l.fill('abc')`                                                                                |
| `.clear()`                               | `await l.clear()`                                                                                    |
| `.trigger('keydown', { key: 'Enter' })`  | `await l.click()` then `await userEvent.keyboard('{Enter}')`                                         |
| `.trigger('mouseenter')` / `'mouseover'` | `await l.hover()`                                                                                    |
| `.trigger('mouseleave')` / `'mouseout'`  | `await l.unhover()`                                                                                  |
| `.check()`                               | `await l.click()`                                                                                    |
| `.focus()`                               | `await userEvent.click(l)`, or `l.element().focus()` when a real click would trigger other behaviour |
| `.select(v)`                             | `await l.selectOptions(v)`                                                                           |
| `cy.viewport(w, h)`                      | `await page.viewport(w, h)`                                                                          |

`fill` replaces the field's contents, while Cypress's `type` appends to them. When a test
types into a field that already has a value, or asserts on intermediate input events, use
`userEvent.type` instead to keep the keystroke-by-keystroke behaviour.

**`hover()` is not a drop-in for `.trigger('mouseenter')`.** Cypress dispatched a synthetic
bubbling event *on the element you selected*. Playwright moves a real pointer, so the event
fires on the deepest element under the cursor — which may be a descendant. That's usually
more faithful to what a user does, but it means a test can pass or fail for a different
reason than it used to. When a hover assertion behaves unexpectedly, check where the
component actually binds its listener before assuming the selector is wrong.

### Hover tests need the pointer parked

The pointer position belongs to the browser context, not the page, so it **survives between
tests** — and components remount at the same coordinates every time. A component therefore
mounts *underneath* the cursor the previous test left behind, and the browser fires
`mouseenter` on it unprompted. The result is a hover test that passes whether or not its
`hover()` call does anything: three of KPop's and KDropdown's did exactly that.

Call `resetPointer()` **before** `render()` in every test that hovers:

```ts
import { resetPointer } from '@test/utils'

it('shows element on hover', async () => {
  await resetPointer()

  await render(KPop, { props: { trigger: 'hover' } })

  await expect.element(page.getByCSS('.popover')).not.toBeVisible()
  await page.getByCSS('.slottedEl').hover()
  await expect.element(page.getByCSS('.popover')).toBeVisible()
})
```

Two things that look like fixes and aren't:

- **`locator.unhover()`** is implemented as "hover `html > body`", so it parks the cursor at
  the *centre of the body* — frequently still over the component under test. It ignores the
  locator you call it on entirely.
- **Parking after `render()`** still leaves a window where the component mounts under the
  stale cursor and shows its popover transiently. That window is long enough for a retrying
  `toBeVisible()` to catch, so the test goes green on the transient.

This is the single most common way a converted hover test passes vacuously, so verify by
deleting the `hover()` call and confirming the test fails.

### Spies and emitted events

| Cypress                              | Vitest                                            |
| ------------------------------------ | ------------------------------------------------- |
| `cy.spy()`                           | `vi.fn()`                                         |
| `cy.spy(obj, 'method')`              | `vi.spyOn(obj, 'method')`                         |
| `cy.stub(obj, 'method')`             | `vi.spyOn(obj, 'method').mockImplementation(...)` |
| `.as('name')` + `cy.get('@name')`    | drop the alias, keep the `const` and reference it |
| `.should('have.callCount', n)`       | `expect(fn).toHaveBeenCalledTimes(n)`             |
| `.should('have.been.calledOnce')`    | `expect(fn).toHaveBeenCalledTimes(1)`             |
| `.should('have.been.calledWith', a)` | `expect(fn).toHaveBeenCalledWith(a)`              |
| `.should('not.have.been.called')`    | `expect(fn).not.toHaveBeenCalled()`               |
| `.its('lastCall')`                   | `fn.mock.lastCall`                                |

Plain `expect(fn)` assertions don't retry. After an interaction that triggers an async
update, either await a DOM assertion that can only be true once the handler has run, or use
`await expect.poll(() => fn.mock.calls.length).toBe(n)`. Reaching for a fixed sleep instead
is how this suite gets flaky.

Prefer asserting on emitted events over spied props where the original test had the choice
— `screen.emitted('update:modelValue')` checks the component's contract, whereas a spy
checks the test's own wiring.

### Dynamic slots (the `setData` pattern)

Several specs mount an inline wrapper with `data: () => ({ ready: false })` and a
`v-if="ready"` slot, then call `setData({ ready: true })` to assert the slot appears.
`render()` has no `setData`. Hoist the flag into a `ref` the test holds directly:

```ts
const ready = ref(false)
 
await render(defineComponent({
  setup: () => () => h(
    KTextArea,
    null,
    ready.value ? { help: () => helpText } : {},
  ),
}))
 
await expect.element(page.getByCSS('.k-textarea .help-text')).not.toBeInTheDocument()
ready.value = true
await expect.element(page.getByCSS('.k-textarea .help-text')).toHaveTextContent(helpText)
```

**Use a render function, not a `template` string.** Vue's package exports resolve `vue` to
the runtime-only build, which has no template compiler, and `vitest.config.ts` doesn't
alias it to the full build. Cypress got away with `template` because `cypress/vue` imports
`compile` from `@vue/compiler-dom` itself; Vue Test Utils doesn't. A wrapper with a
`template` option therefore renders **nothing**, silently — and its first
`not.toBeInTheDocument()` assertion passes against a component that never mounted.

17 of the `.cy.ts` specs use `template`, so you'll meet this repeatedly. Converting each
to a render function is the low-risk path. Adding `vue: 'vue/dist/vue.esm-bundler.js'` to
the config's aliases would let templates work verbatim and make those conversions far more
mechanical — worth raising with the user when the volume justifies it, but not a change to
make unilaterally.

String slots (`slots: { icon: '<span/>' }`) are unaffected — Vue Test Utils compiles those
itself, which is why the KBadge reference spec works.

### Waiting

`cy.wait(800)` and similar fixed sleeps exist because Cypress lacked a better tool at that
spot. Replace them with an assertion that waits for the actual condition — `expect.element`
and `expect.poll` both retry. Only keep an explicit delay if the test is genuinely about
elapsed time (a debounce or transition duration), and say so in a comment.

`cy.then(cb)` is just sequencing; inline the callback body.

## Edge cases

Each of these appears in only a few specs. Jump to the relevant one when the spec in front
of you uses it; skip the rest.

- Popovers and tooltips — KTooltip, KPop, KLabel, KSelect, KDropdown, KMultiselect
- The test runs inside the page — `cy.window`, `cy.document`
- Clipboard — KCopy, KCodeBlock
- File upload / Drag and drop — KFileUpload
- Location and routing — KLabel
- Expected exceptions — KMultiselect
- Shadow DOM — KDateTimePicker
- Component internals — KSelect, KDropdown, KMultiselect
- Mock data and fixtures — KTable, KTableData, KDateTimePicker
- Timers and transitions — KPop, KToaster
Read "Popovers and tooltips" before any component that renders a tooltip: `.k-tooltip` is
in the DOM even when hidden, so `toBeInTheDocument` passes vacuously there and only
`toBeVisible` means anything.

### Popovers and tooltips

KPop renders its popover inline (it only teleports when a `target` is set) using `v-show`
plus a fade transition, and KTooltip passes `popover-classes="k-tooltip"`. So `.k-tooltip`
is **in the document from the moment the component mounts**, whether or not it's showing.

That makes existence assertions meaningless in both directions here:

```ts
// Vacuous — passes whether or not the tooltip is showing.
await expect.element(page.getByCSS('.k-tooltip')).toBeInTheDocument()
 
// Meaningful — toBeVisible is opacity- and display-aware.
await expect.element(page.getByCSS('.k-tooltip')).toBeVisible()
await expect.element(page.getByCSS('.k-tooltip')).not.toBeVisible()
```

Cypress's `should('be.visible')` maps over cleanly, but `should('not.exist')` on a popover
should become `not.toBeVisible()`, not `not.toBeInTheDocument()`. Read the component
first: some popovers genuinely are conditionally rendered, and then existence is the right
assertion. Getting this backwards produces a test that passes forever.

Related: KPop binds its hover listeners to the trigger's first child rather than the
wrapper element the specs usually select. Combined with `hover()` dispatching to the
element under the pointer, a converted hover test can work for a different reason than the
Cypress one did. It's worth confirming the tooltip actually appears rather than trusting a
green result — and see "Hover tests need the pointer parked" above, which is the usual
reason one of these is green for the wrong reason.

### The test runs inside the page

Cypress ran your test in a parent frame and handed you the app's `window` through
`cy.window()`. In Vitest Browser Mode the test file is executed *in* the page, so
`window`, `document`, `navigator` and `location` are all directly in scope.

```ts
// Cypress
cy.document().then((doc) => { ... })
cy.window().then((win) => { ... })
 
// Vitest — just use them
document.querySelector('...')
window.getComputedStyle(el)
```

`cy.document().trigger('keydown', { code: 'F3' })` (KCodeBlock) becomes
`await userEvent.keyboard('{F3}')`, which dispatches to the focused element and bubbles
to the document the same way.

### Clipboard

```ts
// Cypress
cy.window().then((win) => {
  cy.stub(win.navigator.clipboard, 'writeText').as('writeText').resolves()
})
cy.get('@writeText').should('have.been.calledOnceWith', code)
 
// Vitest
const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
// ...interact...
expect(writeText).toHaveBeenCalledTimes(1)
expect(writeText).toHaveBeenCalledWith(code)
```

Spy before rendering, so the component can't capture the real method first. `restoreMocks`
is on in the Vitest config, so there's no manual teardown.

If `navigator.clipboard` is undefined in the test environment, define it rather than
skipping the test:

```ts
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  configurable: true,
})
```

### File upload

`locator.upload()` accepts a path relative to the project root, or `File` objects.

```ts
// Cypress
cy.get('input[type=file]').selectFile('cypress/fixtures/file-upload/file-upload-document.md')
 
// Vitest
await page.getByCSS('input[type=file]').upload('test/fixtures/file-upload-document.md')
```

The fixture currently lives under `cypress/fixtures/`, which goes away with Cypress. When
converting KFileUpload, copy it to `test/fixtures/` and point the new spec there — leave the
original in place for the Cypress spec that's still running. `test/` holds only `setup.ts`
and `utils.ts` so far, so flag a new file there in your report rather than treating it as
routine.

Constructing the `File` inline avoids the fixture entirely and is often clearer:

```ts
const file = new File(['# Heading'], 'file-upload-document.md', { type: 'text/markdown' })
await page.getByCSS('input[type=file]').upload(file)
```

### Drag and drop

Cypress's `.selectFile(path, { action: 'drag-drop' })` has no Vitest equivalent —
`locator.dropTo()` drags one element onto another, not a file from disk. Dispatch the
events directly:

```ts
const file = new File(['# Heading'], 'file-upload-document.md', { type: 'text/markdown' })
const dataTransfer = new DataTransfer()
dataTransfer.items.add(file)
 
const dropzone = page.getByCSS('.k-file-upload').element()
dropzone.dispatchEvent(new DragEvent('dragenter', { dataTransfer, bubbles: true }))
dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true }))
```

Check which events the component actually listens for before assuming this pair is
enough — some handlers also need `dragover` with `preventDefault`.

### Location and routing

`cy.location('hash')` becomes an assertion on `window.location.hash`. Use `expect.poll`,
since navigation is asynchronous and a bare `expect` won't retry:

```ts
await expect.poll(() => window.location.hash).toBe('#docs-link')
```

There is no `renderWithProdRouter` helper — the team removed it in review, since exactly
one spec (KLabel) needs a router and speculative helpers weren't wanted. Install the router
inline as a plugin when you reach it:

```ts
import { createMemoryHistory, createRouter } from 'vue-router'
 
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: defineComponent({ setup: () => () => h('div') }) }],
})
 
await render(KLabel, { global: { plugins: [router] } })
```

The Cypress command imported vue-router's *production* CJS build, because only that build
swallows navigation errors that would otherwise fail the test. Start with the normal
import; if the dev build's warnings surface as failures, that's the reason, and it's worth
telling the user rather than working around it silently.

### Expected exceptions

KMultiselect suppresses benign `ResizeObserver loop` errors via
`cy.on('uncaught:exception')`. Vitest fails a test on unhandled errors too, so the
suppression has to be re-expressed. Scope it to the one test and to that one message —
`dangerouslyIgnoreUnhandledErrors` in the config would hide real failures across the whole
suite:

```ts
const ignoreResizeObserverLoop = (event: ErrorEvent) => {
  if (event.message.includes('ResizeObserver loop')) {
    event.stopImmediatePropagation()
  }
}
 
beforeEach(() => window.addEventListener('error', ignoreResizeObserverLoop))
afterEach(() => window.removeEventListener('error', ignoreResizeObserverLoop))
```

If the error turns out not to fire in any of the three engines, drop the suppression
entirely rather than carrying it over on faith — and say so in your report.

### Shadow DOM

Cypress ran with `includeShadowDom: true` globally, and one KDateTimePicker test opts out
with `{ includeShadowDom: false }`. Playwright's CSS engine pierces open shadow roots by
default, so the global setting needs no translation — but that one opt-out test was
relying on *not* seeing into a shadow root, and will behave differently.

Convert it, run it, and if it fails for that reason, report it rather than forcing it
green. Scoping the selector to a host element outside the shadow root is usually the fix.

### Component internals

A few specs reach into the instance:

```ts
cy.get('...').its('component.$.exposed')
cy.get('...').invoke('openDropdown')
```

`render()` returns DOM-oriented helpers (`container`, `baseElement`, `emitted`,
`rerender`, `unmount`, `html`, `debug`) and deliberately no `vm`, because testing-library
conventions push you toward the public surface.

Prefer re-expressing these through the DOM — a dropdown that's been opened is observable
without touching `exposed`. When a test genuinely needs the instance, mount a small
wrapper component holding a template `ref` and expose it to the test that way. If neither
works, leave the test unconverted and report it; that's a better outcome than an
assertion that no longer checks what it claims to.

### Mock data and fixtures

The `@mocks` alias is configured in `vitest.config.ts`, so
`import { offsetPaginationHeaders } from '@mocks/KTableMockData'` works unchanged.

KTable and KTableData spy on fetcher functions with `cy.spy(fns, 'fetcher')`. Those become
`vi.spyOn(fns, 'fetcher')`, and the assertions that follow generally need `expect.poll`,
since a fetch-triggered re-render lands a tick or two after the interaction.

### Timers and transitions

Replace a fixed sleep with an assertion on the end state (`toBeVisible`, or a computed style
once the transition has settled) wherever there *is* an end state to wait for — that's both
faster and more honest about what's being tested.

The exception is a test proving a **non-event**. KPop's `cy.wait(800)` outlives a 500ms
`popoverDelay` to prove a pending show was cancelled; there is nothing to converge on, so
the converted spec keeps the sleep with a comment saying why. Don't shorten it below the
delay it is outlasting.

Avoid `vi.useFakeTimers()` here. Fake timers interact badly with Playwright's own waiting
in browser mode. If a test truly needs them, pass `{ shouldAdvanceTime: true }` so the
runner's internal timers keep moving.

## Verification

A conversion isn't done until `pnpm test:browser src/components/<Name>` passes in all three
engines for every component in the batch, plus `pnpm typecheck` and `pnpm lint`.

If a test passes immediately and you're unsure it's really exercising anything, break it on
purpose once — flip an assertion or a prop — and confirm it fails. `not.exist`-style
assertions, spy call counts, hover tests, and anything mounted through a wrapper component
are the usual culprits: they pass just as happily when the selector is wrong, the pointer
was already in the right place, or the component never rendered at all.

For a hover test the mutation to make is deleting the `hover()` call. Do it in a scratch
copy of the spec on its own — leaving the mutant alongside the other tests lets the very
pointer residue you're testing for mask the result.

## Report

Close with:

- **Converted** — component, spec file, number of tests.
- **Not converted** — each test you left out and the specific reason. Never pad the count
  with a weaker assertion; an honest gap the user can decide about is worth more than a
  test that passes vacuously.
- **Engine differences** — anything that behaved differently across Chromium, Firefox and
  WebKit, even if you got it green.
- **Component changes** — any `data-testid` or markup added, and why it was unavoidable.
- **Helpers you wanted** — anything you were tempted to extract into a shared utility. The
  team adds those deliberately, so surface the need instead of acting on it.
- **Commands run** and their results.
