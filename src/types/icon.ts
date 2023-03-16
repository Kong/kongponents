import * as allIcons from '@/components/KIcon/icons'

export type IconsKeys<T extends Record<string, unknown>> = keyof T

export type IconNames = IconsKeys<typeof allIcons>

export type MaybeIcon = IconNames | '' | null | undefined
