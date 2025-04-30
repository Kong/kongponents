import { warn } from 'vue'

/**
 * Warns about invalid prop validation.
 * @param name prop name
 * @param msg validation message
 */
export function warnInvalidProp(name: string, msg: string) {
  // Matches the warning format used in Vue’s internal prop type validation:
  // https://github.com/vuejs/core/blob/a23fb59e83c8b65b27eaa21964c8baa217ab0573/packages/runtime-core/src/componentProps.ts#L767-L769
  // Use Vue's `warn` helper to include a component trace in the output.
  warn(`Invalid prop: validator check failed for prop "${name}". ${msg}`)
}
