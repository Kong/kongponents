/**
 * Generates `src/theme/contract.ts` — the source-of-truth list of themeable
 * `--kui-*` custom properties for the Kongponents theming API.
 *
 * The list is derived directly from the installed `@kong/design-tokens` package
 * so it stays 1:1 with the tokens the components actually consume and cannot
 * drift. Re-run after bumping `@kong/design-tokens`:
 *
 *   pnpm build:theme-contract
 */
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import * as tokens from '@kong/design-tokens'

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

const customProperties = Object.keys(tokens)
  .filter((key) => key.startsWith('KUI_'))
  .map(toCustomProperty)
  .filter(isThemeable)
  .sort()

const arrayBody = customProperties.map((token) => `  '${token}',`).join('\n')

const fileContents = `/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 *
 * The themeable \`--kui-*\` custom properties exposed by the Kongponents theming API,
 * generated from @kong/design-tokens v${designTokensVersion}.
 *
 * Regenerate after bumping @kong/design-tokens:
 *   pnpm build:theme-contract
 */

/**
 * The complete, ordered list of \`--kui-*\` custom properties that a Kongponents
 * theme may override. Breakpoint tokens are intentionally omitted because CSS
 * custom properties cannot be consumed inside \`@media\` queries.
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

console.log(`Generated ${customProperties.length} themeable tokens -> src/theme/contract.ts (from @kong/design-tokens v${designTokensVersion})`)
