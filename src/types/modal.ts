import type { AnyElementOf } from '@/types/utils'

export const DismissButtonThemeArray = ['light', 'dark'] as const
export type DismissButtonTheme = AnyElementOf<typeof DismissButtonThemeArray>

export const TextAlignArray = ['left', 'center', 'right'] as const
export type TextAlign = AnyElementOf<typeof TextAlignArray>
