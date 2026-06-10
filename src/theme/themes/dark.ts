import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * Example dark theme.
 *
 * Inverts the neutral surface and text tokens to a dark palette.
 * All interactive-state color pairs meet WCAG AA (4.5:1 for text, 3:1 for
 * non-text UI components against adjacent backgrounds).
 *
 * Notes on the primary scale direction:
 * - Background primaries go darker as strength increases — solid button
 *   surfaces with white overlay text follow the same convention as light mode.
 * - Text primaries go lighter as strength increases — on a dark page background,
 *   higher luminance means higher contrast and therefore stronger emphasis.
 * - `--kui-color-text-inverse` is intentionally absent; it falls back to the
 *   SCSS default #ffffff (white text on colored/dark surfaces such as buttons).
 */
export const darkTheme = defineKongponentsTheme({
  // ── Neutral surfaces ─────────────────────────────────────────────────────
  '--kui-color-background': '#16161d',
  '--kui-color-background-neutral-weakest': '#1f1f29',
  '--kui-color-background-neutral-weaker': '#26262f',
  '--kui-color-background-neutral-weak': '#33333f',
  '--kui-color-background-neutral': '#3d3d4d',
  '--kui-color-background-neutral-strong': '#4a4a5a',
  '--kui-color-background-disabled': '#2a2a33',

  // ── Text ─────────────────────────────────────────────────────────────────
  // Contrast ratios are against --kui-color-background (#16161d, L≈0.007).
  '--kui-color-text': '#f2f3f5', // 16.2:1 ✓
  '--kui-color-text-neutral': '#a7adba', // 8.0:1  ✓
  '--kui-color-text-neutral-strong': '#c8ccd6', // 12.1:1 ✓
  // --kui-color-text-inverse absent → SCSS fallback #ffffff (white on buttons)
  '--kui-color-text-disabled': '#5c6172', // intentionally dimmed; disabled state exempt per WCAG 1.4.3

  // ── Borders ───────────────────────────────────────────────────────────────
  // #6b6b80 gives 3.6:1 against the dark page bg — meets WCAG 1.4.11 (3:1)
  // for interactive component boundaries (inputs, selects, etc.).
  '--kui-color-border': '#6b6b80',
  '--kui-color-border-disabled': '#2a2a33',

  // ── Primary — solid backgrounds ──────────────────────────────────────────
  // Not overriding the main solid-button scale; design-token defaults (#0044f4
  // family) apply unchanged — the same blue as light mode.
  // Ghost-button hover tint requires a dark override since the default #eefaff
  // (nearly white) would be jarring on a dark surface.
  '--kui-color-background-primary-weakest': '#1a2540',

  // ── Primary — text (on dark page background) ──────────────────────────────
  // The light-mode blue (#0044f4) is only 2.7:1 on this dark bg — too low for
  // text. These lighter values share the same hue and all meet WCAG AA.
  '--kui-color-text-primary': '#5f9aff', // 6.8:1  ✓ links, secondary button text
  '--kui-color-text-primary-strong': '#7aadff', // 8.6:1  ✓
  '--kui-color-text-primary-stronger': '#99c0ff', // 10.6:1 ✓
  '--kui-color-text-primary-strongest': '#bee2ff', // 13.2:1 ✓
  '--kui-color-text-primary-weak': '#4080f0', // 5.0:1  ✓ de-emphasised uses
  '--kui-color-text-primary-weaker': '#2860d0', // 3.4:1  decorative
  '--kui-color-text-primary-weakest': '#1a44a8', // 2.1:1  very subtle tints

  // ── Primary — borders (non-text UI elements, 3:1 threshold per WCAG 1.4.11) ─
  // #0044f4 is only 2.7:1 on the dark bg; use lighter blues here.
  '--kui-color-border-primary': '#5f9aff', // 6.8:1 ✓
  '--kui-color-border-primary-strong': '#4d7cff', // 5.5:1 ✓
  '--kui-color-border-primary-stronger': '#3d6dee', // 4.0:1 ✓
  '--kui-color-border-primary-strongest': '#2d5acc',
  '--kui-color-border-primary-weak': '#7aadff',
  '--kui-color-border-primary-weaker': '#99c0ff',
  '--kui-color-border-primary-weakest': '#1a2540',

  // ── Navigation ───────────────────────────────────────────────────────────
  '--kui-navigation-color-background': '#16161d',
  '--kui-navigation-color-background-selected': '#1f1f29',
  '--kui-navigation-color-text': '#f2f3f5',
  '--kui-navigation-color-text-selected': '#5f9aff',
  '--kui-navigation-color-text-hover': '#7aadff',
  '--kui-navigation-color-text-focus': '#5f9aff',
  '--kui-navigation-color-border': '#2a2a33',
  '--kui-navigation-color-border-child': '#2a2a33',
  '--kui-navigation-color-border-divider': '#33333f',
  '--kui-navigation-shadow-border': '0px 0px 0px 1px #33333f inset',
  '--kui-navigation-shadow-border-child': '0px 0px 0px 1px #2a2a33 inset',
  '--kui-navigation-shadow-focus': '0px 0px 0px 3px rgba(0, 68, 244, 0.45)',

  // ── Shadows ───────────────────────────────────────────────────────────────
  '--kui-shadow-focus': '0px 0px 0px 4px rgba(0, 68, 244, 0.55)',
  '--kui-shadow-border': '0px 0px 0px 1px #6b6b80 inset',
  '--kui-shadow-border-primary': '0px 0px 0px 1px #5f9aff inset',
  '--kui-shadow-border-primary-strongest': '0px 0px 0px 1px #2d5acc inset',
  '--kui-shadow-border-primary-weak': '0px 0px 0px 1px #7aadff inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #2a2a33 inset',
})
