/**
 * Phase-1 local component-token name registry.
 *
 * These names are VALUE-LESS ("names-only") — they are never declared as CSS
 * anywhere (no `: initial`, no SCSS/LESS/JSON value). They exist only as
 * override slots a theme may write. An undeclared custom property is the
 * guaranteed-invalid value by spec, so `var(--kui-button-border-radius-medium,
 * var(--kui-border-radius-30, $fallback))` falls through to the semantic default
 * whether the token is undeclared or declared `: initial`.
 *
 * This array is the Phase-1 home of the registry. In Phase 2 it moves to
 * `@kong/design-tokens` (`KUI_COMPONENT_TOKENS` on the `./component-tokens`
 * subpath) and this file is deleted; `scripts/generate-theme-contract.mjs`
 * will flip to import from there instead.
 *
 * Naming grammar: `--kui-<component>-<category>-<property>[-<variant>][-<state|scale>]`
 *  - category before property for colors: `color-background`, never `background-color`
 *  - variant before state: `…-primary-hover`, never `…-hover-primary`
 *  - sub-elements slot right after the component: `--kui-card-title-color-text`
 *  - segments after `<component>` mirror the semantic fallback token
 */

/** All value-less component tokens for the Kongponents pilot wave (Phase 1). */
export const KONGPONENTS_COMPONENT_TOKENS: string[] = [
  // ── KButton — `_buttons.scss` / `KButton.vue` ──────────────────────────────
  // Shape — every size gets its own token even when two sizes currently share a default value.
  '--kui-button-border-radius-large',
  '--kui-button-border-radius-medium',
  '--kui-button-border-radius-small',
  '--kui-button-border-width-large',
  '--kui-button-border-width-medium',
  '--kui-button-border-width-small',
  // Typography
  '--kui-button-font-size-large',
  '--kui-button-font-size-medium',
  '--kui-button-font-size-small',
  '--kui-button-font-weight',
  '--kui-button-line-height-large',
  '--kui-button-line-height-medium',
  '--kui-button-line-height-small',
  // Spacing
  '--kui-button-gap-large',
  '--kui-button-gap-medium',
  '--kui-button-gap-small',
  '--kui-button-icon-size-large',
  '--kui-button-icon-size-medium',
  '--kui-button-icon-size-small',
  '--kui-button-padding-x-large',
  '--kui-button-padding-x-medium',
  '--kui-button-padding-x-small',
  '--kui-button-padding-y-large',
  '--kui-button-padding-y-medium',
  '--kui-button-padding-y-small',
  // Focus ring
  '--kui-button-shadow-focus',
  // Color — primary  (4 states × 3 properties = 12; hover also drives :focus-visible via same token)
  '--kui-button-color-background-primary',
  '--kui-button-color-background-primary-active',
  '--kui-button-color-background-primary-disabled',
  '--kui-button-color-background-primary-hover',
  '--kui-button-color-border-primary',
  '--kui-button-color-border-primary-active',
  '--kui-button-color-border-primary-disabled',
  '--kui-button-color-border-primary-hover',
  '--kui-button-color-text-primary',
  '--kui-button-color-text-primary-active',
  '--kui-button-color-text-primary-disabled',
  '--kui-button-color-text-primary-hover',
  // Color — secondary (4 states × 3 properties = 12; hover also drives :focus-visible via same token)
  '--kui-button-color-background-secondary',
  '--kui-button-color-background-secondary-active',
  '--kui-button-color-background-secondary-disabled',
  '--kui-button-color-background-secondary-hover',
  '--kui-button-color-border-secondary',
  '--kui-button-color-border-secondary-active',
  '--kui-button-color-border-secondary-disabled',
  '--kui-button-color-border-secondary-hover',
  '--kui-button-color-text-secondary',
  '--kui-button-color-text-secondary-active',
  '--kui-button-color-text-secondary-disabled',
  '--kui-button-color-text-secondary-hover',
  // Color — tertiary (4 states × 3 properties = 12; hover also drives :focus-visible via same token)
  '--kui-button-color-background-tertiary',
  '--kui-button-color-background-tertiary-active',
  '--kui-button-color-background-tertiary-disabled',
  '--kui-button-color-background-tertiary-hover',
  '--kui-button-color-border-tertiary',
  '--kui-button-color-border-tertiary-active',
  '--kui-button-color-border-tertiary-disabled',
  '--kui-button-color-border-tertiary-hover',
  '--kui-button-color-text-tertiary',
  '--kui-button-color-text-tertiary-active',
  '--kui-button-color-text-tertiary-disabled',
  '--kui-button-color-text-tertiary-hover',
  // Color — danger   (4 states × 3 properties = 12; hover also drives :focus-visible via same token)
  '--kui-button-color-background-danger',
  '--kui-button-color-background-danger-active',
  '--kui-button-color-background-danger-disabled',
  '--kui-button-color-background-danger-hover',
  '--kui-button-color-border-danger',
  '--kui-button-color-border-danger-active',
  '--kui-button-color-border-danger-disabled',
  '--kui-button-color-border-danger-hover',
  '--kui-button-color-text-danger',
  '--kui-button-color-text-danger-active',
  '--kui-button-color-text-danger-disabled',
  '--kui-button-color-text-danger-hover',

  // ── KCard — `_cards.scss` / `KCard.vue` ────────────────────────────────────
  // Surface
  '--kui-card-border-radius',
  '--kui-card-border-width',
  '--kui-card-color-background',
  '--kui-card-color-border',
  // Layout
  '--kui-card-actions-gap',
  '--kui-card-footer-gap',
  '--kui-card-gap',
  '--kui-card-header-gap',
  '--kui-card-padding',
  // Title sub-element
  '--kui-card-title-color-text',
  '--kui-card-title-font-size',
  '--kui-card-title-font-weight',
  '--kui-card-title-line-height',
  // Body sub-element (shared by card-content + card-footer via bodyText mixin)
  '--kui-card-body-color-text',
  '--kui-card-body-font-family',
  '--kui-card-body-font-size',
  '--kui-card-body-font-weight',
  '--kui-card-body-line-height',

  // ── Input family — `_input-text.scss` ──────────────────────────────────────
  // Structure / default state
  '--kui-input-border-radius',
  '--kui-input-color-background',
  '--kui-input-color-text',
  '--kui-input-color-text-placeholder',
  '--kui-input-font-family',
  '--kui-input-font-size',
  '--kui-input-font-weight',
  '--kui-input-line-height',
  '--kui-input-padding-x',
  '--kui-input-padding-y',
  '--kui-input-shadow-border',
  // Hover
  '--kui-input-shadow-border-hover',
  // Focus
  '--kui-input-shadow-border-focus',
  '--kui-input-shadow-focus',
  // Disabled
  '--kui-input-color-background-disabled',
  '--kui-input-color-text-disabled',
  '--kui-input-shadow-border-disabled',
  // Readonly
  '--kui-input-color-background-readonly',
  '--kui-input-color-text-readonly',
  // Error
  '--kui-input-shadow-border-error',
  '--kui-input-shadow-border-error-focus',
  '--kui-input-shadow-border-error-hover',

  // ── KBadge — `_badges.scss` / `KBadge.vue` (first wave — base appearances) ──
  // Structure
  '--kui-badge-border-radius',
  '--kui-badge-font-family',
  '--kui-badge-font-size',
  '--kui-badge-font-weight',
  '--kui-badge-icon-gap',
  '--kui-badge-line-height',
  '--kui-badge-padding-small',
  '--kui-badge-padding-x',
  '--kui-badge-padding-y',
  '--kui-badge-shadow-focus',
  '--kui-badge-color-text-disabled',
  // Appearances — info
  '--kui-badge-color-background-info',
  '--kui-badge-color-text-info',
  '--kui-badge-color-text-info-hover',
  // Appearances — success
  '--kui-badge-color-background-success',
  '--kui-badge-color-text-success',
  '--kui-badge-color-text-success-hover',
  // Appearances — warning
  '--kui-badge-color-background-warning',
  '--kui-badge-color-text-warning',
  '--kui-badge-color-text-warning-hover',
  // Appearances — danger
  '--kui-badge-color-background-danger',
  '--kui-badge-color-text-danger',
  '--kui-badge-color-text-danger-hover',
  // Appearances — neutral
  '--kui-badge-color-background-neutral',
  '--kui-badge-color-text-neutral',
  '--kui-badge-color-text-neutral-hover',
  // Appearances — decorative
  '--kui-badge-color-background-decorative',
  '--kui-badge-color-text-decorative',
  '--kui-badge-color-text-decorative-hover',
]
