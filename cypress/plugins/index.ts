import path from 'path'
import { startDevServer } from '@cypress/vite-dev-server'
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin'

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config)

  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
      },
    })
  })
  return config
}
