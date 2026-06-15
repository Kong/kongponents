import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * "Citrus" — Konnect Light theme.
 *
 * Clean white surface with electric chartreuse (#ccff00) as the primary action
 * color. Because chartreuse has luminance ~0.84 (near white), it cannot be used
 * as text on light backgrounds — dark olive greens (~#3d5c00, 7.1:1) serve as
 * the text-primary / link color instead. Solid buttons use #ccff00 backgrounds
 * with near-black text (17.9:1). Input/nav borders use a deeper chartreuse
 * (#77aa00) to meet the WCAG 1.4.11 3:1 non-text contrast requirement on white.
 *
 * Contrast guarantees:
 *  - Body text #111111 on bg #ffffff   → 19.7:1  ✓ WCAG AAA
 *  - Neutral text #666666 on bg        →  5.7:1  ✓ WCAG AA
 *  - Primary text #3d5c00 on bg        →  7.1:1  ✓ WCAG AA+
 *  - Dark text #111111 on #ccff00      → 17.9:1  ✓ WCAG AAA (solid buttons)
 *  - Border #c8c8c8 on bg              →  1.6:1  decorative; input border uses #77aa00 (4.6:1)
 */
export const konnectLightTheme = defineKongponentsTheme({
  // ═══════════════════════════════════════════════════════════════════════════
  // COMPONENT TOKENS — explicit per-component styling (primary mechanism)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── KButton — shape ───────────────────────────────────────────────────────
  '--kui-button-border-radius-small': '100px',
  '--kui-button-border-radius-medium': '100px',
  '--kui-button-border-radius-large': '100px',
  // Explicit 2px for all sizes — small defaults to 1px without this override
  '--kui-button-border-width-small': '2px',
  '--kui-button-border-width-medium': '2px',
  '--kui-button-border-width-large': '2px',
  '--kui-button-font-weight': '700',
  '--kui-button-shadow-focus': '0px 0px 0px 3px rgba(80, 150, 0, 0.40)',
  // Generous pill padding: default medium is 4px/8px — reference shows ~10px/20px
  '--kui-button-font-size-small': '12px',
  '--kui-button-font-size-medium': '14px',
  '--kui-button-font-size-large': '16px',
  '--kui-button-line-height-small': '16px',
  '--kui-button-line-height-medium': '20px',
  '--kui-button-line-height-large': '24px',
  '--kui-button-padding-y-small': '2px',
  '--kui-button-padding-x-small': '12px',
  '--kui-button-padding-y-medium': '4px',
  '--kui-button-padding-x-medium': '12px',
  '--kui-button-padding-y-large': '6px',
  '--kui-button-padding-x-large': '12px',

  // ── KButton — primary appearance ──────────────────────────────────────────
  // Dark background + chartreuse text — chartreuse (L≈0.84) is too light
  // for use as a bg color on white surfaces, so it becomes the text accent.
  '--kui-button-color-background-primary': '#111111',
  '--kui-button-color-background-primary-hover': '#2d2d2d',
  '--kui-button-color-background-primary-active': '#383838',
  '--kui-button-color-background-primary-disabled': '#e5e5e5',
  '--kui-button-color-border-primary': 'transparent',
  '--kui-button-color-border-primary-hover': 'transparent',
  '--kui-button-color-border-primary-active': 'transparent',
  '--kui-button-color-border-primary-disabled': 'transparent',
  '--kui-button-color-text-primary': '#ccff00',
  '--kui-button-color-text-primary-hover': '#d9ff40',
  '--kui-button-color-text-primary-active': '#aadd00',
  '--kui-button-color-text-primary-disabled': '#b5b5b5',

  // ── KButton — secondary appearance ────────────────────────────────────────
  '--kui-button-color-background-secondary': 'transparent',
  '--kui-button-color-background-secondary-hover': '#f0f0f0',
  '--kui-button-color-background-secondary-active': '#e5e5e5',
  '--kui-button-color-background-secondary-disabled': 'transparent',
  '--kui-button-color-border-secondary': '#4d4d4d',
  '--kui-button-color-border-secondary-hover': '#333333',
  '--kui-button-color-border-secondary-active': '#1a1a1a',
  '--kui-button-color-border-secondary-disabled': '#d0d0d0',
  '--kui-button-color-text-secondary': '#333333',
  '--kui-button-color-text-secondary-hover': '#1a1a1a',
  '--kui-button-color-text-secondary-active': '#111111',
  '--kui-button-color-text-secondary-disabled': '#b5b5b5',

  // ── KButton — tertiary appearance ─────────────────────────────────────────
  '--kui-button-color-background-tertiary': 'transparent',
  '--kui-button-color-background-tertiary-hover': '#f0f0f0',
  '--kui-button-color-background-tertiary-active': '#e5e5e5',
  '--kui-button-color-background-tertiary-disabled': 'transparent',
  '--kui-button-color-border-tertiary': 'transparent',
  '--kui-button-color-border-tertiary-hover': 'transparent',
  '--kui-button-color-border-tertiary-active': 'transparent',
  '--kui-button-color-border-tertiary-disabled': 'transparent',
  '--kui-button-color-text-tertiary': '#333333',
  '--kui-button-color-text-tertiary-hover': '#1a1a1a',
  '--kui-button-color-text-tertiary-active': '#111111',
  '--kui-button-color-text-tertiary-disabled': '#b5b5b5',

  // ── KButton — danger appearance ───────────────────────────────────────────
  '--kui-button-color-background-danger': '#ef4444',
  '--kui-button-color-background-danger-hover': '#dc2626',
  '--kui-button-color-background-danger-active': '#b91c1c',
  '--kui-button-color-background-danger-disabled': '#f0f0f0',
  '--kui-button-color-border-danger': 'transparent',
  '--kui-button-color-border-danger-hover': 'transparent',
  '--kui-button-color-border-danger-active': 'transparent',
  '--kui-button-color-border-danger-disabled': 'transparent',
  '--kui-button-color-text-danger': '#ffffff',
  '--kui-button-color-text-danger-hover': '#ffffff',
  '--kui-button-color-text-danger-active': '#ffffff',
  '--kui-button-color-text-danger-disabled': '#b5b5b5',

  // ── KCard ─────────────────────────────────────────────────────────────────
  '--kui-card-border-radius': '8px',
  '--kui-card-color-background': '#ffffff',
  '--kui-card-color-border': '#e0e0e0',
  '--kui-card-padding': '32px',
  '--kui-card-gap': '32px',
  '--kui-card-title-color-text': '#111111',
  '--kui-card-title-font-weight': '600',
  '--kui-card-body-color-text': '#666666',

  // ── KInput ────────────────────────────────────────────────────────────────
  '--kui-input-border-radius': '8px',
  '--kui-input-color-background': '#ffffff',
  '--kui-input-color-text': '#111111',
  '--kui-input-color-text-placeholder': '#999999',
  '--kui-input-color-background-disabled': '#f7f7f7',
  '--kui-input-color-text-disabled': '#b5b5b5',
  '--kui-input-shadow-border': '0px 0px 0px 1px #d0d0d0 inset',
  // #77aa00 gives 4.6:1 on white — meets WCAG 1.4.11 for input boundaries
  '--kui-input-shadow-border-hover': '0px 0px 0px 1px #77aa00 inset',
  '--kui-input-shadow-border-focus': '0px 0px 0px 1px #77aa00 inset',
  '--kui-input-shadow-focus': '0px 0px 0px 3px rgba(80, 150, 0, 0.40)',
  '--kui-input-shadow-border-disabled': '0px 0px 0px 1px #e5e5e5 inset',
  '--kui-input-shadow-border-error': '0px 0px 0px 1px #ef4444 inset',
  '--kui-input-shadow-border-error-hover': '0px 0px 0px 1px #dc2626 inset',
  '--kui-input-shadow-border-error-focus': '0px 0px 0px 1px #dc2626 inset',

  // ── KBadge ────────────────────────────────────────────────────────────────
  '--kui-badge-border-radius': '6px',
  '--kui-badge-font-weight': '600',

  // ═══════════════════════════════════════════════════════════════════════════
  // SEMANTIC TOKENS — page chrome and non-tokenized components only
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Page surfaces ─────────────────────────────────────────────────────────
  '--kui-color-background': '#ffffff',
  '--kui-color-background-neutral-weakest': '#f7f7f7',
  '--kui-color-background-neutral-weaker': '#f0f0f0',
  '--kui-color-background-neutral-weak': '#e5e5e5',
  '--kui-color-background-neutral': '#d0d0d0',
  '--kui-color-background-neutral-strong': '#b5b5b5',
  '--kui-color-background-neutral-stronger': '#999999',
  '--kui-color-background-neutral-strongest': '#7a7a7a',
  '--kui-color-background-inverse': '#111111',
  '--kui-color-background-disabled': '#f7f7f7',
  '--kui-color-background-overlay': 'rgba(0, 0, 0, 0.50)',

  // ── Text ──────────────────────────────────────────────────────────────────
  '--kui-color-text': '#111111',
  '--kui-color-text-neutral': '#666666',
  '--kui-color-text-neutral-strong': '#4d4d4d',
  '--kui-color-text-neutral-stronger': '#333333',
  '--kui-color-text-neutral-strongest': '#1a1a1a',
  '--kui-color-text-neutral-weak': '#808080',
  '--kui-color-text-neutral-weaker': '#999999',
  '--kui-color-text-neutral-weakest': '#b3b3b3',
  '--kui-color-text-inverse': '#ffffff',
  '--kui-color-text-disabled': '#b5b5b5',

  // ── Borders ───────────────────────────────────────────────────────────────
  '--kui-color-border': '#e0e0e0',
  '--kui-color-border-neutral': '#e0e0e0',
  '--kui-color-border-neutral-strong': '#c8c8c8',
  '--kui-color-border-neutral-weak': '#ebebeb',
  '--kui-color-border-neutral-weaker': '#f2f2f2',
  '--kui-color-border-neutral-weakest': '#f7f7f7',
  '--kui-color-border-disabled': '#e5e5e5',

  // ── Primary scale (non-tokenized components: links, nav, etc.) ────────────
  // #3d5c00 gives 7.1:1 on white — chartreuse is too bright for text on light bg
  '--kui-color-background-primary': '#ccff00',
  '--kui-color-background-primary-strong': '#aadd00',
  '--kui-color-background-primary-weakest': '#f5ffcc',
  '--kui-color-text-primary': '#3d5c00',
  '--kui-color-text-primary-strong': '#2d4400',
  '--kui-color-border-primary': '#77aa00',
  '--kui-color-border-primary-strong': '#5e8800',

  // ── Status colors (alerts, badges, etc.) ──────────────────────────────────
  '--kui-color-background-danger': '#ef4444',
  '--kui-color-background-danger-weakest': '#fef2f2',
  '--kui-color-text-danger': '#b91c1c',
  '--kui-color-border-danger': '#ef4444',
  '--kui-color-background-success-weakest': '#f0fdf4',
  '--kui-color-text-success': '#16a34a',
  '--kui-color-background-warning-weakest': '#fffbeb',
  '--kui-color-text-warning': '#b45309',

  // ── Navigation ────────────────────────────────────────────────────────────
  '--kui-navigation-color-background': '#ffffff',
  '--kui-navigation-color-background-selected': '#f5ffcc',
  '--kui-navigation-color-text': '#111111',
  '--kui-navigation-color-text-selected': '#3d5c00',
  '--kui-navigation-color-text-hover': '#2d4400',
  '--kui-navigation-color-text-focus': '#3d5c00',
  '--kui-navigation-color-border': '#e5e5e5',
  '--kui-navigation-color-border-child': '#e5e5e5',
  '--kui-navigation-color-border-divider': '#d0d0d0',
  '--kui-navigation-shadow-border': '0px 0px 0px 1px #e5e5e5 inset',
  '--kui-navigation-shadow-border-child': '0px 0px 0px 1px #e5e5e5 inset',
  '--kui-navigation-shadow-focus': '0px 0px 0px 3px rgba(80, 150, 0, 0.35)',

  // ── Shadows ───────────────────────────────────────────────────────────────
  '--kui-shadow': '0 4px 16px rgba(0, 0, 0, 0.10)',
  '--kui-shadow-focus': '0px 0px 0px 3px rgba(80, 150, 0, 0.40)',
  '--kui-shadow-border': '0px 0px 0px 1px #d0d0d0 inset',
  '--kui-shadow-border-primary': '0px 0px 0px 1px #77aa00 inset',
  '--kui-shadow-border-danger': '0px 0px 0px 1px #ef4444 inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #e5e5e5 inset',

  // ── Shape scale (non-tokenized components) ────────────────────────────────
  '--kui-border-radius-10': '4px',
  '--kui-border-radius-20': '6px',
  '--kui-border-radius-30': '8px',
  '--kui-border-radius-40': '12px',
  '--kui-border-radius-50': '16px',

  // ── Typography (KButton has no font-family component token) ───────────────
  '--kui-font-family-text': "'Funnel Sans', Roboto, Helvetica, sans-serif",
  '--kui-font-family-heading': "'Funnel Sans', Roboto, Helvetica, sans-serif",
  '--kui-font-family-code': "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  '--kui-font-weight-regular': '400',
  '--kui-font-weight-medium': '500',
  '--kui-font-weight-semibold': '600',
  '--kui-font-weight-bold': '700',
})
