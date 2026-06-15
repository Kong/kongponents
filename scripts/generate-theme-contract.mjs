/**
 * Generates `src/theme/contract.ts` — the source-of-truth list of themeable
 * `--kui-*` custom properties for the Kongponents theming API.
 *
 * The list is derived from two sources:
 *  1. The installed `@kong/design-tokens` package (semantic/scale tokens) — stays
 *     1:1 with the tokens the components actually consume and cannot drift. Re-run
 *     after bumping `@kong/design-tokens`.
 *  2. The local `KONGPONENTS_COMPONENT_TOKENS` registry in `src/theme/component-tokens.ts`
 *     (Phase-1 home; in Phase 2 this moves to `@kong/design-tokens` and the import
 *     below flips to `import { KUI_COMPONENT_TOKENS } from '@kong/design-tokens/component-tokens'`).
 *
 * Both sets are unioned, deduplicated, and sorted.
 *
 *   pnpm build:theme-contract
 */
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import * as tokens from '@kong/design-tokens'
import { KONGPONENTS_COMPONENT_TOKENS } from '../src/theme/component-tokens.ts'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

/** Version of `@kong/design-tokens` the contract was generated from. */
const designTokensVersion = require('@kong/design-tokens/package.json').version

/**
 * Converts a `KUI_*` JS constant name to its `--kui-*` CSS custom property name.
 * e.g. `KUI_COLOR_TEXT_PRIMARY` -> `--kui-color-text-primary`
 */
const toCustomProperty = (constantName) => `--${constantName.toLowerCase().replace(/_/g, '-')}`

/**
 * Breakpoint tokens are excluded: CSS custom properties cannot be read inside
 * `@media` queries, so overriding them has no themable effect.
 */
const isThemeable = (customProperty) => !customProperty.startsWith('--kui-breakpoint')

/** Semantic tokens from @kong/design-tokens (only string-valued KUI_* exports). */
const semanticProps = Object.keys(tokens)
  .filter((key) => key.startsWith('KUI_') && typeof tokens[key] === 'string')
  .map(toCustomProperty)
  .filter(isThemeable)

/**
 * Component tokens are already in `--kui-*` form (do not re-transform).
 * Union with semantic props, deduplicate, and sort.
 */
const customProperties = [...new Set([...semanticProps, ...KONGPONENTS_COMPONENT_TOKENS])].sort()

const arrayBody = customProperties.map((token) => `  '${token}',`).join('\n')

const fileContents = `/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 *
 * The themeable \`--kui-*\` custom properties exposed by the Kongponents theming API.
 * Includes both semantic tokens (from @kong/design-tokens v${designTokensVersion}) and
 * value-less component tokens (from the local Phase-1 registry; moves to
 * @kong/design-tokens in Phase 2).
 *
 * Regenerate after bumping @kong/design-tokens or editing component-tokens.ts:
 *   pnpm build:theme-contract
 */

/**
 * The complete, ordered list of \`--kui-*\` custom properties that a Kongponents
 * theme may override. Breakpoint tokens are intentionally omitted because CSS
 * custom properties cannot be consumed inside \`@media\` queries.
 *
 * Includes two tiers:
 *  - **Semantic/scale tokens** (\`--kui-color-*\`, \`--kui-space-*\`, \`--kui-border-radius-*\`, …)
 *    from @kong/design-tokens. These have values; override them to retheme everywhere.
 *  - **Component tokens** (\`--kui-button-*\`, \`--kui-card-*\`, \`--kui-input-*\`, \`--kui-badge-*\`, …)
 *    that are value-less. Set one to diverge a single component from its semantic default;
 *    leave unset to inherit the semantic cascade.
 */
export const KONGPONENTS_THEME_TOKENS = [
${arrayBody}
] as const

/**
 * A single themeable \`--kui-*\` custom property name.
 *
 * This is the key type of {@link KongponentsTheme} and the foundation of the
 * theming contract — any token in this union may be assigned a value by a theme.
 */
export type KongponentsThemeToken = typeof KONGPONENTS_THEME_TOKENS[number]
`

const outPath = resolve(__dirname, '../src/theme/contract.ts')
writeFileSync(outPath, fileContents)

console.log(`Generated ${customProperties.length} themeable tokens (${semanticProps.length} semantic + ${KONGPONENTS_COMPONENT_TOKENS.length} component) -> src/theme/contract.ts (from @kong/design-tokens v${designTokensVersion})`)
