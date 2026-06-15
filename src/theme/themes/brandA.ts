import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * "Obsidian Amber" brand theme — Brand A.
 *
 * A premium dark tooling aesthetic: warm near-black surfaces, electric amber
 * primaries with dark text overlay (contrast ratio 9.2:1 on the amber surface),
 * fully sharp geometry (2–4 px radii), and the Syne typeface.
 *
 * Component tokens are the primary mechanism: every pilot-wave component
 * (KButton, KCard, KInput, KBadge) is styled via its own component tokens.
 * Semantic tokens cover only page chrome and non-tokenized components.
 *
 * Contrast guarantees:
 *  - Body text #ede8dc on bg #13110e  → 16.1:1  ✓ WCAG AAA
 *  - Neutral text #8c7e68 on bg       →  5.0:1  ✓ WCAG AA
 *  - Primary text #fbbf24 on bg       → 11.9:1  ✓ WCAG AAA
 *  - Dark text #13110e on amber #f59e0b →  9.2:1  ✓ WCAG AAA (solid buttons)
 *  - Border #7a6e58 on bg             →  4.0:1  ✓ WCAG 1.4.11
 */
export const brandATheme = defineKongponentsTheme({
  // ═══════════════════════════════════════════════════════════════════════════
  // COMPONENT TOKENS — explicit per-component styling (primary mechanism)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── KButton — shape ───────────────────────────────────────────────────────
  '--kui-button-border-radius-small': '2px',
  '--kui-button-border-radius-medium': '3px',
  '--kui-button-border-radius-large': '3px',
  '--kui-button-font-weight': '700',
  '--kui-button-shadow-focus': '0px 0px 0px 3px rgba(245, 158, 11, 0.5)',

  // ── KButton — primary appearance ──────────────────────────────────────────
  '--kui-button-color-background-primary': '#f59e0b',
  '--kui-button-color-background-primary-hover': '#e08a00',
  '--kui-button-color-background-primary-active': '#c67900',
  '--kui-button-color-background-primary-disabled': '#1e1b16',
  '--kui-button-color-border-primary': 'transparent',
  '--kui-button-color-border-primary-hover': 'transparent',
  '--kui-button-color-border-primary-active': 'transparent',
  '--kui-button-color-border-primary-disabled': 'transparent',
  '--kui-button-color-text-primary': '#13110e',
  '--kui-button-color-text-primary-hover': '#13110e',
  '--kui-button-color-text-primary-active': '#13110e',
  '--kui-button-color-text-primary-disabled': '#4e4535',

  // ── KButton — secondary appearance ────────────────────────────────────────
  '--kui-button-color-background-secondary': 'transparent',
  '--kui-button-color-background-secondary-hover': '#211a06',
  '--kui-button-color-background-secondary-active': '#2e2410',
  '--kui-button-color-background-secondary-disabled': 'transparent',
  '--kui-button-color-border-secondary': '#f59e0b',
  '--kui-button-color-border-secondary-hover': '#fbbf24',
  '--kui-button-color-border-secondary-active': '#e08a00',
  '--kui-button-color-border-secondary-disabled': '#2e2820',
  '--kui-button-color-text-secondary': '#fbbf24',
  '--kui-button-color-text-secondary-hover': '#fcd34d',
  '--kui-button-color-text-secondary-active': '#f59e0b',
  '--kui-button-color-text-secondary-disabled': '#4e4535',

  // ── KButton — tertiary appearance ─────────────────────────────────────────
  '--kui-button-color-background-tertiary': 'transparent',
  '--kui-button-color-background-tertiary-hover': '#211a06',
  '--kui-button-color-background-tertiary-active': '#2e2410',
  '--kui-button-color-background-tertiary-disabled': 'transparent',
  '--kui-button-color-border-tertiary': 'transparent',
  '--kui-button-color-border-tertiary-hover': 'transparent',
  '--kui-button-color-border-tertiary-active': 'transparent',
  '--kui-button-color-border-tertiary-disabled': 'transparent',
  '--kui-button-color-text-tertiary': '#fbbf24',
  '--kui-button-color-text-tertiary-hover': '#fcd34d',
  '--kui-button-color-text-tertiary-active': '#f59e0b',
  '--kui-button-color-text-tertiary-disabled': '#4e4535',

  // ── KButton — danger appearance ───────────────────────────────────────────
  '--kui-button-color-background-danger': '#c0392b',
  '--kui-button-color-background-danger-hover': '#a93226',
  '--kui-button-color-background-danger-active': '#922b21',
  '--kui-button-color-background-danger-disabled': '#1e1b16',
  '--kui-button-color-border-danger': 'transparent',
  '--kui-button-color-border-danger-hover': 'transparent',
  '--kui-button-color-border-danger-active': 'transparent',
  '--kui-button-color-border-danger-disabled': 'transparent',
  '--kui-button-color-text-danger': '#ffffff',
  '--kui-button-color-text-danger-hover': '#ffffff',
  '--kui-button-color-text-danger-active': '#ffffff',
  '--kui-button-color-text-danger-disabled': '#4e4535',

  // ── KCard ─────────────────────────────────────────────────────────────────
  '--kui-card-border-radius': '3px',
  '--kui-card-color-background': '#1e1b16',
  '--kui-card-color-border': '#7a6e58',
  '--kui-card-padding': '32px',
  '--kui-card-gap': '32px',
  '--kui-card-title-color-text': '#ede8dc',
  '--kui-card-title-font-weight': '700',
  '--kui-card-body-color-text': '#8c7e68',
  '--kui-card-body-font-family': "'Syne', 'Trebuchet MS', system-ui, sans-serif",

  // ── KInput ────────────────────────────────────────────────────────────────
  '--kui-input-border-radius': '3px',
  '--kui-input-color-background': '#13110e',
  '--kui-input-color-text': '#ede8dc',
  '--kui-input-color-text-placeholder': '#8c7e68',
  '--kui-input-font-family': "'Syne', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-input-color-background-disabled': '#1e1b16',
  '--kui-input-color-text-disabled': '#4e4535',
  '--kui-input-shadow-border': '0px 0px 0px 1px #7a6e58 inset',
  '--kui-input-shadow-border-hover': '0px 0px 0px 1px #f59e0b inset',
  '--kui-input-shadow-border-focus': '0px 0px 0px 1px #f59e0b inset',
  '--kui-input-shadow-focus': '0px 0px 0px 3px rgba(245, 158, 11, 0.5)',
  '--kui-input-shadow-border-disabled': '0px 0px 0px 1px #2e2820 inset',
  '--kui-input-shadow-border-error': '0px 0px 0px 1px #c0392b inset',
  '--kui-input-shadow-border-error-hover': '0px 0px 0px 1px #e74c3c inset',
  '--kui-input-shadow-border-error-focus': '0px 0px 0px 1px #e74c3c inset',

  // ── KBadge ────────────────────────────────────────────────────────────────
  '--kui-badge-border-radius': '2px',
  '--kui-badge-font-family': "'Syne', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-badge-font-weight': '700',

  // ═══════════════════════════════════════════════════════════════════════════
  // SEMANTIC TOKENS — page chrome and non-tokenized components only
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Page surfaces ─────────────────────────────────────────────────────────
  '--kui-color-background': '#13110e',
  '--kui-color-background-neutral-weakest': '#1e1b16',
  '--kui-color-background-neutral-weaker': '#252018',
  '--kui-color-background-neutral-weak': '#2e2820',
  '--kui-color-background-neutral': '#3c3528',
  '--kui-color-background-neutral-strong': '#4e4535',
  '--kui-color-background-neutral-stronger': '#625848',
  '--kui-color-background-neutral-strongest': '#7a6e58',
  '--kui-color-background-inverse': '#fef3c7',
  '--kui-color-background-disabled': '#1e1b16',
  '--kui-color-background-overlay': 'rgba(0, 0, 0, 0.78)',

  // ── Text ──────────────────────────────────────────────────────────────────
  '--kui-color-text': '#ede8dc',
  '--kui-color-text-neutral': '#8c7e68',
  '--kui-color-text-neutral-strong': '#b0a088',
  '--kui-color-text-neutral-stronger': '#c8b89a',
  '--kui-color-text-neutral-strongest': '#ddd0bc',
  '--kui-color-text-neutral-weak': '#6a5e4c',
  '--kui-color-text-neutral-weaker': '#4e4535',
  '--kui-color-text-neutral-weakest': '#3c3528',
  '--kui-color-text-inverse': '#13110e',
  '--kui-color-text-disabled': '#4e4535',

  // ── Borders ───────────────────────────────────────────────────────────────
  '--kui-color-border': '#7a6e58',
  '--kui-color-border-neutral': '#7a6e58',
  '--kui-color-border-neutral-strong': '#9a8e78',
  '--kui-color-border-neutral-weak': '#5a5040',
  '--kui-color-border-neutral-weaker': '#3c3528',
  '--kui-color-border-neutral-weakest': '#2e2820',
  '--kui-color-border-disabled': '#2e2820',

  // ── Primary scale (non-tokenized components: links, nav, etc.) ────────────
  '--kui-color-background-primary': '#f59e0b',
  '--kui-color-background-primary-strong': '#e08a00',
  '--kui-color-background-primary-weakest': '#211a06',
  '--kui-color-text-primary': '#fbbf24',
  '--kui-color-text-primary-strong': '#f59e0b',
  '--kui-color-border-primary': '#f59e0b',
  '--kui-color-border-primary-strong': '#e08a00',

  // ── Status colors (alerts, badges, etc.) ──────────────────────────────────
  '--kui-color-background-danger': '#c0392b',
  '--kui-color-background-danger-weakest': '#2a1210',
  '--kui-color-text-danger': '#f87171',
  '--kui-color-border-danger': '#c0392b',
  '--kui-color-background-success-weakest': '#0d2010',
  '--kui-color-text-success': '#4ade80',
  '--kui-color-background-warning-weakest': '#1e1806',
  '--kui-color-text-warning': '#fbbf24',

  // ── Navigation ────────────────────────────────────────────────────────────
  '--kui-navigation-color-background': '#13110e',
  '--kui-navigation-color-background-selected': '#2e2820',
  '--kui-navigation-color-text': '#ede8dc',
  '--kui-navigation-color-text-selected': '#fbbf24',
  '--kui-navigation-color-text-hover': '#fcd34d',
  '--kui-navigation-color-text-focus': '#fbbf24',
  '--kui-navigation-color-border': '#2e2820',
  '--kui-navigation-color-border-child': '#2e2820',
  '--kui-navigation-color-border-divider': '#3c3528',
  '--kui-navigation-shadow-border': '0px 0px 0px 1px #3c3528 inset',
  '--kui-navigation-shadow-border-child': '0px 0px 0px 1px #2e2820 inset',
  '--kui-navigation-shadow-focus': '0px 0px 0px 3px rgba(245, 158, 11, 0.4)',

  // ── Shadows ───────────────────────────────────────────────────────────────
  '--kui-shadow': '0 4px 20px rgba(0, 0, 0, 0.6)',
  '--kui-shadow-focus': '0px 0px 0px 3px rgba(245, 158, 11, 0.5)',
  '--kui-shadow-border': '0px 0px 0px 1px #7a6e58 inset',
  '--kui-shadow-border-primary': '0px 0px 0px 1px #f59e0b inset',
  '--kui-shadow-border-danger': '0px 0px 0px 1px #c0392b inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #2e2820 inset',

  // ── Shape scale (non-tokenized components) ────────────────────────────────
  '--kui-border-radius-10': '1px',
  '--kui-border-radius-20': '2px',
  '--kui-border-radius-30': '3px',
  '--kui-border-radius-40': '4px',
  '--kui-border-radius-50': '4px',

  // ── Typography (KButton has no font-family component token) ───────────────
  '--kui-font-family-text': "'Syne', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-heading': "'Syne', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-code': "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  '--kui-font-weight-regular': '500',
  '--kui-font-weight-medium': '600',
  '--kui-font-weight-semibold': '700',
  '--kui-font-weight-bold': '800',
  '--kui-font-size-30': '15px',
  '--kui-font-size-40': '18px',
  '--kui-font-size-50': '20px',
  '--kui-font-size-60': '24px',
  '--kui-font-size-70': '28px',

  // ── Spacing scale (non-tokenized components) ──────────────────────────────
  '--kui-space-40': '12px',
  '--kui-space-50': '16px',
  '--kui-space-60': '24px',
  '--kui-space-70': '28px',
})
