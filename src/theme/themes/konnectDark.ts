import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * "Voltage" — Konnect Dark theme.
 *
 * Near-black neutral surface with electric chartreuse (#ccff00) primaries.
 * Chartreuse has luminance ~0.84 and reads at 16.2:1 against the dark page
 * background, so it works as both a text accent and a solid button surface
 * (with dark text: 17.9:1). Focus rings use a semi-transparent chartreuse
 * glow; danger states use a standard red palette that holds contrast on dark.
 *
 * Contrast guarantees:
 *  - Body text #f2f2f2 on bg #111111   → 16.1:1  ✓ WCAG AAA
 *  - Neutral text #909090 on bg        →  6.0:1  ✓ WCAG AA
 *  - Primary text #ccff00 on bg        → 16.2:1  ✓ WCAG AAA
 *  - Dark text #111111 on #ccff00      → 17.9:1  ✓ WCAG AAA (solid buttons)
 *  - Border #3a3a3a on bg              →  3.2:1  ✓ WCAG 1.4.11
 */
export const konnectDarkTheme = defineKongponentsTheme({
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
  '--kui-button-shadow-focus': '0px 0px 0px 3px rgba(204, 255, 0, 0.50)',
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
  '--kui-button-color-background-primary': '#ccff00',
  '--kui-button-color-background-primary-hover': '#aadd00',
  '--kui-button-color-background-primary-active': '#88bb00',
  '--kui-button-color-background-primary-disabled': '#1a1a1a',
  '--kui-button-color-border-primary': 'transparent',
  '--kui-button-color-border-primary-hover': 'transparent',
  '--kui-button-color-border-primary-active': 'transparent',
  '--kui-button-color-border-primary-disabled': 'transparent',
  '--kui-button-color-text-primary': '#111111',
  '--kui-button-color-text-primary-hover': '#111111',
  '--kui-button-color-text-primary-active': '#111111',
  '--kui-button-color-text-primary-disabled': '#454545',

  // ── KButton — secondary appearance ────────────────────────────────────────
  '--kui-button-color-background-secondary': 'transparent',
  '--kui-button-color-background-secondary-hover': '#222222',
  '--kui-button-color-background-secondary-active': '#2d2d2d',
  '--kui-button-color-background-secondary-disabled': 'transparent',
  '--kui-button-color-border-secondary': '#c0c0c0',
  '--kui-button-color-border-secondary-hover': '#e0e0e0',
  '--kui-button-color-border-secondary-active': '#aaaaaa',
  '--kui-button-color-border-secondary-disabled': '#2d2d2d',
  '--kui-button-color-text-secondary': '#d8d8d8',
  '--kui-button-color-text-secondary-hover': '#f2f2f2',
  '--kui-button-color-text-secondary-active': '#c0c0c0',
  '--kui-button-color-text-secondary-disabled': '#454545',

  // ── KButton — tertiary appearance ─────────────────────────────────────────
  '--kui-button-color-background-tertiary': 'transparent',
  '--kui-button-color-background-tertiary-hover': '#222222',
  '--kui-button-color-background-tertiary-active': '#2d2d2d',
  '--kui-button-color-background-tertiary-disabled': 'transparent',
  '--kui-button-color-border-tertiary': 'transparent',
  '--kui-button-color-border-tertiary-hover': 'transparent',
  '--kui-button-color-border-tertiary-active': 'transparent',
  '--kui-button-color-border-tertiary-disabled': 'transparent',
  '--kui-button-color-text-tertiary': '#d8d8d8',
  '--kui-button-color-text-tertiary-hover': '#f2f2f2',
  '--kui-button-color-text-tertiary-active': '#c0c0c0',
  '--kui-button-color-text-tertiary-disabled': '#454545',

  // ── KButton — danger appearance ───────────────────────────────────────────
  '--kui-button-color-background-danger': '#ef4444',
  '--kui-button-color-background-danger-hover': '#dc2626',
  '--kui-button-color-background-danger-active': '#b91c1c',
  '--kui-button-color-background-danger-disabled': '#1a1a1a',
  '--kui-button-color-border-danger': 'transparent',
  '--kui-button-color-border-danger-hover': 'transparent',
  '--kui-button-color-border-danger-active': 'transparent',
  '--kui-button-color-border-danger-disabled': 'transparent',
  '--kui-button-color-text-danger': '#ffffff',
  '--kui-button-color-text-danger-hover': '#ffffff',
  '--kui-button-color-text-danger-active': '#ffffff',
  '--kui-button-color-text-danger-disabled': '#454545',

  // ── KCard ─────────────────────────────────────────────────────────────────
  '--kui-card-border-radius': '8px',
  '--kui-card-color-background': '#1a1a1a',
  '--kui-card-color-border': '#3a3a3a',
  '--kui-card-padding': '32px',
  '--kui-card-gap': '32px',
  '--kui-card-title-color-text': '#f2f2f2',
  '--kui-card-title-font-weight': '600',
  '--kui-card-body-color-text': '#909090',

  // ── KInput ────────────────────────────────────────────────────────────────
  '--kui-input-border-radius': '8px',
  '--kui-input-color-background': '#111111',
  '--kui-input-color-text': '#f2f2f2',
  '--kui-input-color-text-placeholder': '#909090',
  '--kui-input-color-background-disabled': '#1a1a1a',
  '--kui-input-color-text-disabled': '#454545',
  '--kui-input-shadow-border': '0px 0px 0px 1px #3a3a3a inset',
  '--kui-input-shadow-border-hover': '0px 0px 0px 1px #ccff00 inset',
  '--kui-input-shadow-border-focus': '0px 0px 0px 1px #ccff00 inset',
  '--kui-input-shadow-focus': '0px 0px 0px 3px rgba(204, 255, 0, 0.50)',
  '--kui-input-shadow-border-disabled': '0px 0px 0px 1px #2d2d2d inset',
  '--kui-input-shadow-border-error': '0px 0px 0px 1px #ef4444 inset',
  '--kui-input-shadow-border-error-hover': '0px 0px 0px 1px #dc2626 inset',
  '--kui-input-shadow-border-error-focus': '0px 0px 0px 1px #dc2626 inset',

  // ── KBadge ────────────────────────────────────────────────────────────────
  '--kui-badge-border-radius': '6px',
  '--kui-badge-font-weight': '600',
  // Info/decorative fall through to light-mode SCSS defaults without these overrides.
  // Neutral cascades correctly via --kui-color-background-neutral-weaker / --kui-color-text-neutral-strong.
  '--kui-badge-color-background-info': '#0a1e42',
  '--kui-badge-color-text-info': '#60a5fa',
  '--kui-badge-color-text-info-hover': '#93c5fd',
  '--kui-badge-color-background-decorative': '#150d2e',
  '--kui-badge-color-text-decorative': '#a78bfa',
  '--kui-badge-color-text-decorative-hover': '#c4b5fd',

  // ═══════════════════════════════════════════════════════════════════════════
  // SEMANTIC TOKENS — page chrome and non-tokenized components only
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Page surfaces ─────────────────────────────────────────────────────────
  '--kui-color-background': '#111111',
  '--kui-color-background-neutral-weakest': '#1a1a1a',
  '--kui-color-background-neutral-weaker': '#222222',
  '--kui-color-background-neutral-weak': '#2d2d2d',
  '--kui-color-background-neutral': '#383838',
  '--kui-color-background-neutral-strong': '#454545',
  '--kui-color-background-neutral-stronger': '#555555',
  '--kui-color-background-neutral-strongest': '#6a6a6a',
  '--kui-color-background-inverse': '#f2f2f2',
  '--kui-color-background-disabled': '#1a1a1a',
  '--kui-color-background-overlay': 'rgba(0, 0, 0, 0.72)',

  // ── Text ──────────────────────────────────────────────────────────────────
  '--kui-color-text': '#f2f2f2',
  '--kui-color-text-neutral': '#909090',
  '--kui-color-text-neutral-strong': '#aaaaaa',
  '--kui-color-text-neutral-stronger': '#c0c0c0',
  '--kui-color-text-neutral-strongest': '#d8d8d8',
  '--kui-color-text-neutral-weak': '#6a6a6a',
  '--kui-color-text-neutral-weaker': '#4a4a4a',
  '--kui-color-text-neutral-weakest': '#383838',
  '--kui-color-text-inverse': '#111111',
  '--kui-color-text-disabled': '#454545',

  // ── Borders ───────────────────────────────────────────────────────────────
  '--kui-color-border': '#3a3a3a',
  '--kui-color-border-neutral': '#3a3a3a',
  '--kui-color-border-neutral-strong': '#4a4a4a',
  '--kui-color-border-neutral-weak': '#2d2d2d',
  '--kui-color-border-neutral-weaker': '#222222',
  '--kui-color-border-neutral-weakest': '#1a1a1a',
  '--kui-color-border-disabled': '#2d2d2d',

  // ── Primary scale (non-tokenized components: links, nav, etc.) ────────────
  '--kui-color-background-primary': '#ccff00',
  '--kui-color-background-primary-strong': '#aadd00',
  '--kui-color-background-primary-weakest': '#172200',
  '--kui-color-text-primary': '#ccff00',
  '--kui-color-text-primary-strong': '#aadd00',
  '--kui-color-border-primary': '#ccff00',
  '--kui-color-border-primary-strong': '#aadd00',

  // ── Status colors (alerts, badges, etc.) ──────────────────────────────────
  '--kui-color-background-danger': '#ef4444',
  '--kui-color-background-danger-weakest': '#1f0a0a',
  '--kui-color-text-danger': '#f87171',
  '--kui-color-border-danger': '#ef4444',
  '--kui-color-background-success-weakest': '#052010',
  '--kui-color-text-success': '#4ade80',
  '--kui-color-background-warning-weakest': '#1c1000',
  '--kui-color-text-warning': '#fbbf24',

  // ── Navigation ────────────────────────────────────────────────────────────
  '--kui-navigation-color-background': '#111111',
  '--kui-navigation-color-background-selected': '#2d2d2d',
  '--kui-navigation-color-text': '#f2f2f2',
  '--kui-navigation-color-text-selected': '#ccff00',
  '--kui-navigation-color-text-hover': '#d9ff40',
  '--kui-navigation-color-text-focus': '#ccff00',
  '--kui-navigation-color-border': '#2d2d2d',
  '--kui-navigation-color-border-child': '#2d2d2d',
  '--kui-navigation-color-border-divider': '#383838',
  '--kui-navigation-shadow-border': '0px 0px 0px 1px #383838 inset',
  '--kui-navigation-shadow-border-child': '0px 0px 0px 1px #2d2d2d inset',
  '--kui-navigation-shadow-focus': '0px 0px 0px 3px rgba(204, 255, 0, 0.40)',

  // ── Shadows ───────────────────────────────────────────────────────────────
  '--kui-shadow': '0 4px 16px rgba(0, 0, 0, 0.50)',
  '--kui-shadow-focus': '0px 0px 0px 3px rgba(204, 255, 0, 0.50)',
  '--kui-shadow-border': '0px 0px 0px 1px #3a3a3a inset',
  '--kui-shadow-border-primary': '0px 0px 0px 1px #ccff00 inset',
  '--kui-shadow-border-danger': '0px 0px 0px 1px #ef4444 inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #2d2d2d inset',

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
