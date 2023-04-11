export const BorderVariantsArray = ['borderTop', 'noBorder', 'border'] as const

export type AnyElementOf<T extends readonly string[]> = T[number];

export type BorderVariant = AnyElementOf<typeof BorderVariantsArray>
