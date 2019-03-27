import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import multiEntry from 'rollup-plugin-multi-entry'
import svg from 'rollup-plugin-svg'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'packages/**/*.vue',
  plugins: [
    vue({ compileTemplate: true, css: true }),
    svg(),
    multiEntry(),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports: {
        'node_modules/vue-runtime-helpers/dist/normalize-component.mjs': [ 'normalize-component' ]
      }
    })
  ],
  output: [
    {
      name: 'Kongponents',
      file: `.dist/bundle.umd.js`,
      format: 'umd'
    }
  ],
  external: ['normalize-component.js']
}
