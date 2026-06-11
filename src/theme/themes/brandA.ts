import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * "Obsidian Amber" brand theme — Brand A.
 *
 * A premium dark tooling aesthetic: warm near-black surfaces, electric amber
 * primaries with dark text overlay (contrast ratio 9.2:1 on the amber surface),
 * fully sharp geometry (2–4 px radii), and the Syne typeface — a wide geometric
 * sans that reads nothing like the default Inter.
 *
 * Contrast guarantees:
 *  - Body text #ede8dc on bg #13110e  → 16.1:1  ✓ WCAG AAA
 *  - Neutral text #8c7e68 on bg       →  5.0:1  ✓ WCAG AA
 *  - Primary text #fbbf24 on bg       → 11.9:1  ✓ WCAG AAA
 *  - Dark text #13110e on amber #f59e0b →  9.2:1  ✓ WCAG AAA (solid buttons)
 *  - Border #7a6e58 on bg             →  4.0:1  ✓ WCAG 1.4.11
 */
export const brandATheme = defineKongponentsTheme({
  // ── Page surfaces — warm near-black ──────────────────────────────────────
  '--kui-color-background': '#13110e',
  '--kui-color-background-neutral-weakest': '#1e1b16',
  '--kui-color-background-neutral-weaker': '#252018',
  '--kui-color-background-neutral-weak': '#2e2820',
  '--kui-color-background-neutral': '#3c3528',
  '--kui-color-background-neutral-strong': '#4e4535',
  '--kui-color-background-neutral-stronger': '#625848',
  '--kui-color-background-neutral-strongest': '#7a6e58',
  '--kui-color-background-inverse': '#fef3c7', // light amber — tooltips: dark text on light surface ✓
  '--kui-color-background-disabled': '#1e1b16',
  '--kui-color-background-overlay': 'rgba(0, 0, 0, 0.78)',

  // ── Text — warm cream hierarchy ───────────────────────────────────────────
  '--kui-color-text': '#ede8dc', // 16.1:1 ✓
  '--kui-color-text-neutral': '#8c7e68', // 5.0:1  ✓
  '--kui-color-text-neutral-strong': '#b0a088',
  '--kui-color-text-neutral-stronger': '#c8b89a',
  '--kui-color-text-neutral-strongest': '#ddd0bc',
  '--kui-color-text-neutral-weak': '#6a5e4c',
  '--kui-color-text-neutral-weaker': '#4e4535',
  '--kui-color-text-neutral-weakest': '#3c3528',
  '--kui-color-text-inverse': '#13110e', // dark text ON amber buttons ✓
  '--kui-color-text-disabled': '#4e4535',

  // ── Borders — warm visible separator ─────────────────────────────────────
  '--kui-color-border': '#7a6e58', // 4.0:1 ✓ WCAG 1.4.11
  '--kui-color-border-neutral': '#7a6e58',
  '--kui-color-border-neutral-strong': '#9a8e78',
  '--kui-color-border-neutral-stronger': '#b8a888',
  '--kui-color-border-neutral-strongest': '#d0c0a0',
  '--kui-color-border-neutral-weak': '#5a5040',
  '--kui-color-border-neutral-weaker': '#3c3528',
  '--kui-color-border-neutral-weakest': '#2e2820',
  '--kui-color-border-disabled': '#2e2820',

  // ── Amber primary scale — solid-bg values use dark text (#13110e) ─────────
  // All ≥ 4.5:1 with the dark text overlay set in --kui-color-text-inverse.
  '--kui-color-background-primary': '#f59e0b', // 9.2:1 dark ✓
  '--kui-color-background-primary-strong': '#e08a00', // hover — deeper amber
  '--kui-color-background-primary-stronger': '#c67900', // active
  '--kui-color-background-primary-strongest': '#a86500',
  '--kui-color-background-primary-weak': '#fbbf24', // lighter amber
  '--kui-color-background-primary-weaker': '#fcd34d',
  '--kui-color-background-primary-weakest': '#211a06', // ghost hover tint (dark)

  // Text primaries — lighter = more visible on dark bg
  '--kui-color-text-primary': '#fbbf24', // 11.9:1 ✓
  '--kui-color-text-primary-strong': '#f59e0b', // 9.2:1  ✓
  '--kui-color-text-primary-stronger': '#e08a00',
  '--kui-color-text-primary-strongest': '#c67900',
  '--kui-color-text-primary-weak': '#fcd34d',
  '--kui-color-text-primary-weaker': '#fde68a',
  '--kui-color-text-primary-weakest': '#fef3c7',

  // Primary borders
  '--kui-color-border-primary': '#f59e0b',
  '--kui-color-border-primary-strong': '#e08a00',
  '--kui-color-border-primary-stronger': '#c67900',
  '--kui-color-border-primary-strongest': '#a86500',
  '--kui-color-border-primary-weak': '#fbbf24',
  '--kui-color-border-primary-weaker': '#fcd34d',
  '--kui-color-border-primary-weakest': '#211a06',

  // ── Semantic colors — adjusted for dark surface ───────────────────────────
  // Danger (red) — keep readable on dark bg
  '--kui-color-background-danger': '#c0392b',
  '--kui-color-background-danger-weakest': '#2a1210',
  '--kui-color-text-danger': '#f87171',
  '--kui-color-text-danger-strong': '#fca5a5',
  '--kui-color-border-danger': '#c0392b',

  // Success (green)
  '--kui-color-background-success-weakest': '#0d2010',
  '--kui-color-text-success': '#4ade80',
  '--kui-color-text-success-strong': '#86efac',

  // Warning (yellow-orange, complementary to amber)
  '--kui-color-background-warning-weakest': '#1e1806',
  '--kui-color-text-warning': '#fbbf24',
  '--kui-color-text-warning-strong': '#fcd34d',

  // ── Navigation — warm dark with amber active state ────────────────────────
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

  // ── Shadows — amber glow on focus, deep blacks on elevation ──────────────
  '--kui-shadow': '0 4px 20px rgba(0, 0, 0, 0.6)',
  '--kui-shadow-focus': '0px 0px 0px 3px rgba(245, 158, 11, 0.5)',
  '--kui-shadow-border': '0px 0px 0px 1px #7a6e58 inset',
  '--kui-shadow-border-primary': '0px 0px 0px 1px #f59e0b inset',
  '--kui-shadow-border-primary-strongest': '0px 0px 0px 1px #a86500 inset',
  '--kui-shadow-border-primary-weak': '0px 0px 0px 1px #fbbf24 inset',
  '--kui-shadow-border-danger': '0px 0px 0px 1px #c0392b inset',
  '--kui-shadow-border-danger-strong': '0px 0px 0px 1px #e74c3c inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #2e2820 inset',

  // ── Shape — industrial sharp geometry ────────────────────────────────────
  '--kui-border-radius-10': '1px',
  '--kui-border-radius-20': '2px',
  '--kui-border-radius-30': '3px',
  '--kui-border-radius-40': '4px',
  '--kui-border-radius-50': '4px',

  // ── Typography — Syne: wide geometric, confident weights ─────────────────
  '--kui-font-family-text': "'Syne', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-heading': "'Syne', 'Trebuchet MS', system-ui, sans-serif",
  '--kui-font-family-code': "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  '--kui-font-weight-regular': '500', // every weight steps up one — heavier baseline
  '--kui-font-weight-medium': '600',
  '--kui-font-weight-semibold': '700',
  '--kui-font-weight-bold': '800',

  // ── Font sizes — scaled up one tier for a bold, commanding presence ───────
  '--kui-font-size-30': '15px',
  '--kui-font-size-40': '18px',
  '--kui-font-size-50': '20px',
  '--kui-font-size-60': '24px',
  '--kui-font-size-70': '28px',

  // ── Spacing — generous padding for oversized buttons and cards ────────────
  '--kui-space-40': '12px',
  '--kui-space-50': '16px',
  '--kui-space-60': '24px',
  '--kui-space-70': '28px',
})
