import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * "Nocturne" brand theme — Brand B.
 *
 * A premium dark aesthetic built on deep violet-black surfaces and electric
 * amethyst primaries. Ultra-rounded pill geometry (8–30 px radii), Unbounded
 * display typeface paired with DM Sans body copy, and a glowing violet focus
 * ring all combine into a distinctive ethereal-tech identity — the deliberate
 * opposite of the warm/sharp/amber Brand A.
 *
 * Component tokens are the primary mechanism: every pilot-wave component
 * (KButton, KCard, KInput, KBadge) is styled via its own component tokens.
 * Semantic tokens cover only page chrome and non-tokenized components.
 *
 * Contrast guarantees:
 *  - Body text #f0edfb on bg #0d0916    → 16.8:1  ✓ WCAG AAA
 *  - Neutral text #8b7ca8 on bg         →  5.2:1  ✓ WCAG AA
 *  - Primary text #a78bfa on bg         →  7.6:1  ✓ WCAG AAA
 *  - White text on primary bg #7c3aed   →  5.2:1  ✓ WCAG AA  (solid buttons)
 *  - Border #6e5a8a on bg               →  3.2:1  ✓ WCAG 1.4.11
 */
export const brandBTheme = defineKongponentsTheme({
  // ═══════════════════════════════════════════════════════════════════════════
  // COMPONENT TOKENS — explicit per-component styling (primary mechanism)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── KButton — shape ───────────────────────────────────────────────────────
  '--kui-button-border-radius-small': '12px',
  '--kui-button-border-radius-medium': '16px',
  '--kui-button-border-radius-large': '16px',
  '--kui-button-font-weight': '600',
  '--kui-button-shadow-focus': '0px 0px 0px 3px rgba(124, 58, 237, 0.50)',

  // ── KButton — primary appearance ──────────────────────────────────────────
  '--kui-button-color-background-primary': '#7c3aed',
  '--kui-button-color-background-primary-hover': '#6d28d9',
  '--kui-button-color-background-primary-active': '#5b21b6',
  '--kui-button-color-background-primary-disabled': '#140e1f',
  '--kui-button-color-border-primary': 'transparent',
  '--kui-button-color-border-primary-hover': 'transparent',
  '--kui-button-color-border-primary-active': 'transparent',
  '--kui-button-color-border-primary-disabled': 'transparent',
  '--kui-button-color-text-primary': '#ffffff',
  '--kui-button-color-text-primary-hover': '#ffffff',
  '--kui-button-color-text-primary-active': '#ffffff',
  '--kui-button-color-text-primary-disabled': '#4e4265',

  // ── KButton — secondary appearance ────────────────────────────────────────
  '--kui-button-color-background-secondary': 'transparent',
  '--kui-button-color-background-secondary-hover': '#1e1230',
  '--kui-button-color-background-secondary-active': '#231b33',
  '--kui-button-color-background-secondary-disabled': 'transparent',
  '--kui-button-color-border-secondary': '#7c3aed',
  '--kui-button-color-border-secondary-hover': '#8b5cf6',
  '--kui-button-color-border-secondary-active': '#6d28d9',
  '--kui-button-color-border-secondary-disabled': '#231b33',
  '--kui-button-color-text-secondary': '#a78bfa',
  '--kui-button-color-text-secondary-hover': '#c4b5fd',
  '--kui-button-color-text-secondary-active': '#8b5cf6',
  '--kui-button-color-text-secondary-disabled': '#4e4265',

  // ── KButton — tertiary appearance ─────────────────────────────────────────
  '--kui-button-color-background-tertiary': 'transparent',
  '--kui-button-color-background-tertiary-hover': '#1e1230',
  '--kui-button-color-background-tertiary-active': '#231b33',
  '--kui-button-color-background-tertiary-disabled': 'transparent',
  '--kui-button-color-border-tertiary': 'transparent',
  '--kui-button-color-border-tertiary-hover': 'transparent',
  '--kui-button-color-border-tertiary-active': 'transparent',
  '--kui-button-color-border-tertiary-disabled': 'transparent',
  '--kui-button-color-text-tertiary': '#a78bfa',
  '--kui-button-color-text-tertiary-hover': '#c4b5fd',
  '--kui-button-color-text-tertiary-active': '#8b5cf6',
  '--kui-button-color-text-tertiary-disabled': '#4e4265',

  // ── KButton — danger appearance ───────────────────────────────────────────
  '--kui-button-color-background-danger': '#dc2626',
  '--kui-button-color-background-danger-hover': '#b91c1c',
  '--kui-button-color-background-danger-active': '#991b1b',
  '--kui-button-color-background-danger-disabled': '#140e1f',
  '--kui-button-color-border-danger': 'transparent',
  '--kui-button-color-border-danger-hover': 'transparent',
  '--kui-button-color-border-danger-active': 'transparent',
  '--kui-button-color-border-danger-disabled': 'transparent',
  '--kui-button-color-text-danger': '#ffffff',
  '--kui-button-color-text-danger-hover': '#ffffff',
  '--kui-button-color-text-danger-active': '#ffffff',
  '--kui-button-color-text-danger-disabled': '#4e4265',

  // ── KCard ─────────────────────────────────────────────────────────────────
  '--kui-card-border-radius': '16px',
  '--kui-card-color-background': '#140e1f',
  '--kui-card-color-border': '#6e5a8a',
  '--kui-card-padding': '32px',
  '--kui-card-gap': '32px',
  '--kui-card-title-color-text': '#f0edfb',
  '--kui-card-title-font-weight': '700',
  '--kui-card-body-color-text': '#8b7ca8',
  '--kui-card-body-font-family': "'DM Sans', 'Trebuchet MS', system-ui, sans-serif",

  // ── KInput ────────────────────────────────────────────────────────────────
  '--kui-input-border-radius': '16px',
  '--kui-input-color-background': '#0d0916',
  '--kui-input-color-text': '#f0edfb',
  '--kui-input-color-text-placeholder': '#8b7ca8',
  '--kui-input-font-family': "'DM Sans', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-input-color-background-disabled': '#140e1f',
  '--kui-input-color-text-disabled': '#4e4265',
  '--kui-input-shadow-border': '0px 0px 0px 1px #6e5a8a inset',
  '--kui-input-shadow-border-hover': '0px 0px 0px 1px #7c3aed inset',
  '--kui-input-shadow-border-focus': '0px 0px 0px 1px #7c3aed inset',
  '--kui-input-shadow-focus': '0px 0px 0px 3px rgba(124, 58, 237, 0.50)',
  '--kui-input-shadow-border-disabled': '0px 0px 0px 1px #231b33 inset',
  '--kui-input-shadow-border-error': '0px 0px 0px 1px #dc2626 inset',
  '--kui-input-shadow-border-error-hover': '0px 0px 0px 1px #b91c1c inset',
  '--kui-input-shadow-border-error-focus': '0px 0px 0px 1px #b91c1c inset',

  // ── KBadge ────────────────────────────────────────────────────────────────
  '--kui-badge-border-radius': '12px',
  '--kui-badge-font-family': "'DM Sans', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-badge-font-weight': '600',

  // ═══════════════════════════════════════════════════════════════════════════
  // SEMANTIC TOKENS — page chrome and non-tokenized components only
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Page surfaces ─────────────────────────────────────────────────────────
  '--kui-color-background': '#0d0916',
  '--kui-color-background-neutral-weakest': '#140e1f',
  '--kui-color-background-neutral-weaker': '#1b1428',
  '--kui-color-background-neutral-weak': '#231b33',
  '--kui-color-background-neutral': '#2d2440',
  '--kui-color-background-neutral-strong': '#3d3254',
  '--kui-color-background-neutral-stronger': '#4f4268',
  '--kui-color-background-neutral-strongest': '#63547e',
  '--kui-color-background-inverse': '#ede9ff',
  '--kui-color-background-disabled': '#140e1f',
  '--kui-color-background-overlay': 'rgba(0, 0, 0, 0.85)',

  // ── Text ──────────────────────────────────────────────────────────────────
  '--kui-color-text': '#f0edfb',
  '--kui-color-text-neutral': '#8b7ca8',
  '--kui-color-text-neutral-strong': '#a896c4',
  '--kui-color-text-neutral-stronger': '#c4b5d8',
  '--kui-color-text-neutral-strongest': '#ddd4ed',
  '--kui-color-text-neutral-weak': '#6b5e86',
  '--kui-color-text-neutral-weaker': '#4e4265',
  '--kui-color-text-neutral-weakest': '#362e48',
  '--kui-color-text-inverse': '#ffffff',
  '--kui-color-text-disabled': '#4e4265',

  // ── Borders ───────────────────────────────────────────────────────────────
  '--kui-color-border': '#6e5a8a',
  '--kui-color-border-neutral': '#6e5a8a',
  '--kui-color-border-neutral-strong': '#7e6a9a',
  '--kui-color-border-neutral-weak': '#4e3e64',
  '--kui-color-border-neutral-weaker': '#362e48',
  '--kui-color-border-neutral-weakest': '#231b33',
  '--kui-color-border-disabled': '#231b33',

  // ── Primary scale (non-tokenized components: links, nav, etc.) ────────────
  '--kui-color-background-primary': '#7c3aed',
  '--kui-color-background-primary-strong': '#6d28d9',
  '--kui-color-background-primary-weakest': '#1e1230',
  '--kui-color-text-primary': '#a78bfa',
  '--kui-color-text-primary-strong': '#8b5cf6',
  '--kui-color-border-primary': '#7c3aed',
  '--kui-color-border-primary-strong': '#6d28d9',

  // ── Status colors (alerts, badges, etc.) ──────────────────────────────────
  '--kui-color-background-danger': '#dc2626',
  '--kui-color-background-danger-weakest': '#1f0a0a',
  '--kui-color-text-danger': '#f87171',
  '--kui-color-border-danger': '#dc2626',
  '--kui-color-background-success-weakest': '#051a10',
  '--kui-color-text-success': '#34d399',
  '--kui-color-background-warning-weakest': '#1c1000',
  '--kui-color-text-warning': '#fbbf24',

  // ── Navigation ────────────────────────────────────────────────────────────
  '--kui-navigation-color-background': '#0d0916',
  '--kui-navigation-color-background-selected': '#231b33',
  '--kui-navigation-color-text': '#f0edfb',
  '--kui-navigation-color-text-selected': '#a78bfa',
  '--kui-navigation-color-text-hover': '#c4b5fd',
  '--kui-navigation-color-text-focus': '#a78bfa',
  '--kui-navigation-color-border': '#231b33',
  '--kui-navigation-color-border-child': '#231b33',
  '--kui-navigation-color-border-divider': '#2d2440',
  '--kui-navigation-shadow-border': '0px 0px 0px 1px #2d2440 inset',
  '--kui-navigation-shadow-border-child': '0px 0px 0px 1px #231b33 inset',
  '--kui-navigation-shadow-focus': '0px 0px 0px 3px rgba(124, 58, 237, 0.50)',

  // ── Shadows ───────────────────────────────────────────────────────────────
  '--kui-shadow': '0 4px 24px rgba(124, 58, 237, 0.22), 0 1px 4px rgba(0, 0, 0, 0.45)',
  '--kui-shadow-focus': '0px 0px 0px 3px rgba(124, 58, 237, 0.50)',
  '--kui-shadow-border': '0px 0px 0px 1px #6e5a8a inset',
  '--kui-shadow-border-primary': '0px 0px 0px 1px #7c3aed inset',
  '--kui-shadow-border-danger': '0px 0px 0px 1px #dc2626 inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #231b33 inset',

  // ── Shape scale (non-tokenized components) ────────────────────────────────
  '--kui-border-radius-10': '8px',
  '--kui-border-radius-20': '12px',
  '--kui-border-radius-30': '16px',
  '--kui-border-radius-40': '22px',
  '--kui-border-radius-50': '30px',

  // ── Typography (KButton has no font-family component token) ───────────────
  '--kui-font-family-text': "'DM Sans', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-heading': "'Unbounded', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-code': "'JetBrains Mono', 'Courier New', monospace",
  '--kui-font-weight-regular': '400',
  '--kui-font-weight-medium': '500',
  '--kui-font-weight-semibold': '600',
  '--kui-font-weight-bold': '700',
})
