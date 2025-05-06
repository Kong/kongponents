export type Replace<T extends string, S extends string, D extends string,
  A extends string = ''> = T extends `${infer L}${S}${infer P}${infer R}` ?
    Replace<`${Uppercase<P>}${R}`, S, D, `${A}${L}${D}`> : `${A}${T}`

export type AnyElementOf<T extends readonly string[]> = T[number]

export type NonUndefined<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>
}
