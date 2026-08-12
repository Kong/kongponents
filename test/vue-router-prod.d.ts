// `renderWithProdRouter` imports vue-router's production CJS build directly, because
// only that build swallows the navigation errors that would otherwise surface as
// unhandled exceptions and fail an otherwise-passing test. That file ships without
// type declarations, so point it at the package's public types — the shape is identical.
declare module 'vue-router/dist/vue-router.prod.cjs' {
  export * from 'vue-router'
}
