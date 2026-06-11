import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * "Nocturne" brand theme — Brand B.
 *
 * A premium dark aesthetic built on deep violet-black surfaces and electric
 * amethyst primaries. Ultra-rounded pill geometry (8–40 px radii), Unbounded
 * display typeface paired with DM Sans body copy, and a glowing violet focus
 * ring all combine into a distinctive ethereal-tech identity — the deliberate
 * opposite of the warm/sharp/amber Brand A.
 *
 * Contrast guarantees:
 *  - Body text #f0edfb on bg #0d0916    → 16.8:1  ✓ WCAG AAA
 *  - Neutral text #8b7ca8 on bg         →  5.2:1  ✓ WCAG AA
 *  - Primary text #a78bfa on bg         →  7.6:1  ✓ WCAG AAA
 *  - White text on primary bg #7c3aed   →  5.2:1  ✓ WCAG AA  (solid buttons)
 *  - Border #6e5a8a on bg               →  3.2:1  ✓ WCAG 1.4.11
 */
export const brandBTheme = defineKongponentsTheme({
  // ── Deep violet-black surfaces ────────────────────────────────────────────
  '--kui-color-background': '#0d0916',
  '--kui-color-background-neutral-weakest': '#140e1f',
  '--kui-color-background-neutral-weaker': '#1b1428',
  '--kui-color-background-neutral-weak': '#231b33',
  '--kui-color-background-neutral': '#2d2440',
  '--kui-color-background-neutral-strong': '#3d3254',
  '--kui-color-background-neutral-stronger': '#4f4268',
  '--kui-color-background-neutral-strongest': '#63547e',
  '--kui-color-background-disabled': '#140e1f',
  '--kui-color-background-overlay': 'rgba(0, 0, 0, 0.85)',

  // ── Luminous lavender-white text ──────────────────────────────────────────
  '--kui-color-text': '#f0edfb', // 16.8:1 ✓ WCAG AAA
  '--kui-color-text-neutral': '#8b7ca8', //  5.2:1 ✓ WCAG AA
  '--kui-color-text-neutral-strong': '#a896c4',
  '--kui-color-text-neutral-stronger': '#c4b5d8',
  '--kui-color-text-neutral-strongest': '#ddd4ed',
  '--kui-color-text-neutral-weak': '#6b5e86',
  '--kui-color-text-neutral-weaker': '#4e4265',
  '--kui-color-text-neutral-weakest': '#362e48',
  '--kui-color-text-inverse': '#ffffff', // white text ON violet buttons ✓
  '--kui-color-text-disabled': '#4e4265',

  // ── Amethyst borders ──────────────────────────────────────────────────────
  '--kui-color-border': '#6e5a8a', //  3.2:1 ✓ WCAG 1.4.11
  '--kui-color-border-neutral': '#6e5a8a',
  '--kui-color-border-neutral-strong': '#7e6a9a',
  '--kui-color-border-neutral-stronger': '#9480b0',
  '--kui-color-border-neutral-strongest': '#b0a0c8',
  '--kui-color-border-neutral-weak': '#4e3e64',
  '--kui-color-border-neutral-weaker': '#362e48',
  '--kui-color-border-neutral-weakest': '#231b33',
  '--kui-color-border-disabled': '#231b33',

  // ── Electric violet primary scale ─────────────────────────────────────────
  '--kui-color-background-primary': '#7c3aed', //  5.2:1 white ✓ WCAG AA
  '--kui-color-background-primary-strong': '#6d28d9', // hover — deeper
  '--kui-color-background-primary-stronger': '#5b21b6', // active
  '--kui-color-background-primary-strongest': '#4c1d95',
  '--kui-color-background-primary-weak': '#8b5cf6',
  '--kui-color-background-primary-weaker': '#a78bfa',
  '--kui-color-background-primary-weakest': '#1e1230', // ghost hover tint (dark)

  // Text primaries — luminous on dark bg
  '--kui-color-text-primary': '#a78bfa', //  7.6:1 ✓ WCAG AAA
  '--kui-color-text-primary-strong': '#8b5cf6',
  '--kui-color-text-primary-stronger': '#7c3aed',
  '--kui-color-text-primary-strongest': '#6d28d9',
  '--kui-color-text-primary-weak': '#c4b5fd',
  '--kui-color-text-primary-weaker': '#ddd6fe',
  '--kui-color-text-primary-weakest': '#ede9ff',

  // Primary borders
  '--kui-color-border-primary': '#7c3aed',
  '--kui-color-border-primary-strong': '#6d28d9',
  '--kui-color-border-primary-stronger': '#5b21b6',
  '--kui-color-border-primary-strongest': '#4c1d95',
  '--kui-color-border-primary-weak': '#8b5cf6',
  '--kui-color-border-primary-weaker': '#a78bfa',
  '--kui-color-border-primary-weakest': '#c4b5fd',

  // ── Semantic colors — calibrated for dark violet surface ──────────────────
  '--kui-color-background-danger-weakest': '#1f0a0a',
  '--kui-color-text-danger': '#f87171',
  '--kui-color-text-danger-strong': '#fca5a5',
  '--kui-color-border-danger': '#dc2626',

  '--kui-color-background-success-weakest': '#051a10',
  '--kui-color-text-success': '#34d399',
  '--kui-color-text-success-strong': '#6ee7b7',

  '--kui-color-background-warning-weakest': '#1c1000',
  '--kui-color-text-warning': '#fbbf24',
  '--kui-color-text-warning-strong': '#fcd34d',

  // ── Violet-glow shadows ────────────────────────────────────────────────────
  '--kui-shadow': '0 4px 24px rgba(124, 58, 237, 0.22), 0 1px 4px rgba(0, 0, 0, 0.45)',
  '--kui-shadow-focus': '0px 0px 0px 3px rgba(124, 58, 237, 0.50)',
  '--kui-shadow-border': '0px 0px 0px 1px #6e5a8a inset',
  '--kui-shadow-border-primary': '0px 0px 0px 1px #7c3aed inset',
  '--kui-shadow-border-primary-strongest': '0px 0px 0px 1px #4c1d95 inset',
  '--kui-shadow-border-primary-weak': '0px 0px 0px 1px #8b5cf6 inset',
  '--kui-shadow-border-danger': '0px 0px 0px 1px #dc2626 inset',
  '--kui-shadow-border-danger-strong': '0px 0px 0px 1px #b91c1c inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #231b33 inset',

  // ── Navigation — dark violet with amethyst active state ───────────────────
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

  // ── Ultra-rounded pill geometry ────────────────────────────────────────────
  '--kui-border-radius-10': '8px',
  '--kui-border-radius-20': '12px',
  '--kui-border-radius-30': '16px',
  '--kui-border-radius-40': '22px',
  '--kui-border-radius-50': '30px',

  // ── Typography — Unbounded display + DM Sans body ─────────────────────────
  '--kui-font-family-text': "'DM Sans', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-heading': "'Unbounded', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-code': "'JetBrains Mono', 'Courier New', monospace",
  '--kui-font-weight-regular': '400',
  '--kui-font-weight-medium': '500',
  '--kui-font-weight-semibold': '600',
  '--kui-font-weight-bold': '700',
})
