/**
 * `renderWithProdRouter` imports vue-router's production CJS build directly, because only
 * that build swallows navigation errors that would otherwise fail an otherwise-passing
 * test. That file ships without declarations, so point it at the package's public types —
 * the shape is identical.
 */
declare module 'vue-router/dist/vue-router.prod.cjs' {
  export * from 'vue-router'
}
