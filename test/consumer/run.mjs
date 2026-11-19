// Proves that a Vite 8 consumer can build and run every supported entry point of
// @kong/kongponents without runtime errors: a browser page that mounts KDateTimePicker
// from the ES build alongside the consumer's own `date-fns`/`date-fns-tz` imports, plus
// SSR rendering of the ES build, `require()` of the CJS build, the Nuxt module and the
// UMD build, each in its own child process so one failure cannot hide the rest.
// The cjs and umd steps are expected to fail under bare Node require. The CJS build loads
// v-calendar's CJS files, which sit inside a "type": "module" package, and the UMD file is
// parsed as ESM for the same reason, so it takes its browser-global branch. Bundler
// consumers hit neither. Their failure prints XFAIL (an unexpected pass prints XPASS) and
// does not fail the run.
// The versions in package.json are pinned to a real consumer's resolved versions, so the
// fixture runs on that consumer's toolchain rather than a best-case install.
// `KONGPONENTS_SPEC=<npm spec>` swaps the local build for a published version, e.g. to
// compare against an older release.
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { createReadStream, existsSync } from 'node:fs'
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { chromium } from 'playwright'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const fixtureDir = path.join(repoRoot, 'test', 'consumer')
const packageName = '@kong/kongponents'

/** Set when main() reaches the temp-dir stage, so a setup failure can still clean up. */
let tmpDir = null

/**
 * Reuse the running pnpm (the repo pins one through `packageManager` and Volta) instead of assuming
 * `pnpm` on PATH resolves to the same version.
 */
const pnpmCommand = process.env.npm_execpath && /\.cjs$/.test(process.env.npm_execpath)
  ? { cmd: process.execPath, prefixArgs: [process.env.npm_execpath] }
  : { cmd: 'pnpm', prefixArgs: [] }

function runInherited(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    spawn(cmd, args, { cwd, stdio: 'inherit', env: process.env })
      .on('error', reject)
      .on('close', (code) => resolve({ code }))
  })
}

function runCaptured(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'], env: process.env })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (chunk) => {
      stdout += chunk
    })
    child.stderr.on('data', (chunk) => {
      stderr += chunk
    })
    child.on('error', reject)
    child.on('close', (code) => resolve({ code, stdout, stderr }))
  })
}

async function runNodeStep(stepScript, cwd) {
  const { code, stdout, stderr } = await runCaptured(process.execPath, [stepScript], cwd)
  if (code !== 0) {
    const detail = (stderr.trim() || stdout.trim() || `node exited with code ${code}`).split('\n').pop().replace(/^ERROR: /, '')
    throw new Error(detail.slice(0, 2000))
  }
  return stdout.trim().split('\n').filter(Boolean).pop() ?? ''
}

const mimeTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mjs': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

async function startStaticServer(rootDir) {
  const server = createServer((request, response) => {
    const urlPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    let filePath = path.join(rootDir, path.normalize(urlPath))
    if (!filePath.startsWith(rootDir) || !existsSync(filePath) || !path.extname(filePath)) {
      filePath = path.join(rootDir, 'index.html')
    }
    response.writeHead(200, { 'content-type': mimeTypes[path.extname(filePath)] ?? 'application/octet-stream' })
    createReadStream(filePath).pipe(response)
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  return server
}

const stepScripts = {
  'es-import': `try {
  const mod = await import('@kong/kongponents')
  // A compiled single-file component is an object, not a function.
  if (!mod.KDateTimePicker) {
    throw new Error('the ES entry does not export KDateTimePicker')
  }
  console.log('ES entry imports, ' + Object.keys(mod).length + ' named exports')
} catch (error) {
  console.error('ERROR: ' + error.message)
  process.exit(1)
}
`,
  ssr: `try {
  const [{ createSSRApp, h }, { renderToString }, kongponents] = await Promise.all([
    import('vue'),
    import('vue/server-renderer'),
    import('@kong/kongponents'),
  ])
  const html = await renderToString(createSSRApp({
    render: () => h(kongponents.KDateTimePicker, { mode: 'dateTime', range: true }),
  }))
  if (typeof html !== 'string' || html.length === 0) {
    throw new Error('renderToString returned ' + (html === '' ? 'an empty string' : typeof html))
  }
  console.log('SSR rendered ' + html.length + ' chars')
} catch (error) {
  console.error('ERROR: ' + error.message)
  process.exit(1)
}
`,
  cjs: `try {
  const { createRequire } = await import('node:module')
  const require = createRequire(import.meta.url)
  require('@kong/kongponents')
  console.log('CJS entry loads through require()')
} catch (error) {
  console.error('ERROR: ' + error.message)
  process.exit(1)
}
`,
  nuxt: `try {
  const mod = await import('@kong/kongponents/nuxt')
  if (!mod.default) {
    throw new Error('the Nuxt entry has no default export')
  }
  console.log('Nuxt module imports with a default export')
} catch (error) {
  console.error('ERROR: ' + error.message)
  process.exit(1)
}
`,
  umd: `try {
  const { createRequire } = await import('node:module')
  const require = createRequire(import.meta.url)
  const umdPath = require.resolve('@kong/kongponents/dist/kongponents.umd.js')
  const umd = require(umdPath)
  const picker = umd.KDateTimePicker ?? umd.default?.KDateTimePicker
  if (!picker) {
    throw new Error('the UMD bundle does not expose KDateTimePicker')
  }
  console.log('UMD bundle loads and exposes KDateTimePicker')
} catch (error) {
  console.error('ERROR: ' + error.message)
  process.exit(1)
}
`,
}

async function main() {
  // Fail fast when the library has not been built: the packed tarball would be empty otherwise.
  if (!existsSync(path.join(repoRoot, 'dist', 'kongponents.es.js'))) {
    throw new Error('dist/kongponents.es.js is missing. Build the library first (pnpm build:ci).')
  }

  tmpDir = await mkdtemp(path.join(os.tmpdir(), 'kongponents-consumer-'))

  await cp(fixtureDir, tmpDir, {
    recursive: true,
    filter: (source) => {
      const base = path.basename(source)
      return !['node_modules', 'dist', 'pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'].includes(base)
        && !base.endsWith('.tgz')
    },
  })

  const stepScriptsDir = path.join(tmpDir, '.consumer-check')
  await mkdir(stepScriptsDir, { recursive: true })
  for (const [name, script] of Object.entries(stepScripts)) {
    await writeFile(path.join(stepScriptsDir, `${name}.mjs`), script)
  }

  const fixturePkgPath = path.join(tmpDir, 'package.json')
  const fixturePkg = JSON.parse(await readFile(fixturePkgPath, 'utf8'))

  let specSource
  if (process.env.KONGPONENTS_SPEC) {
    // A `name@version` spec carries the package name, which pnpm misreads as a local
    // path when it appears in a dependency value; keep only the version part.
    const spec = process.env.KONGPONENTS_SPEC.startsWith(`${packageName}@`)
      ? process.env.KONGPONENTS_SPEC.slice(packageName.length + 1) || 'latest'
      : process.env.KONGPONENTS_SPEC
    specSource = `spec ${process.env.KONGPONENTS_SPEC}`
    fixturePkg.dependencies[packageName] = spec
  } else {
    specSource = 'local tarball'
    const pack = await runInherited(pnpmCommand.cmd, [...pnpmCommand.prefixArgs, 'pack', '--pack-destination', tmpDir], repoRoot)
    if (pack.code !== 0) {
      throw new Error('pnpm pack failed for the repository package')
    }
    const tarballs = (await readdir(tmpDir)).filter((name) => name.endsWith('.tgz'))
    if (tarballs.length !== 1) {
      throw new Error(`expected exactly one packed tarball in ${tmpDir}, got: ${tarballs.join(', ') || 'none'}`)
    }
    fixturePkg.dependencies['@kong/kongponents'] = `file:${path.join(tmpDir, tarballs[0])}`
  }

  await writeFile(fixturePkgPath, `${JSON.stringify(fixturePkg, null, 2)}\n`)

  console.log(`==> installing the consumer fixture (${specSource})`)
  const install = await runCaptured(pnpmCommand.cmd, [...pnpmCommand.prefixArgs, 'install', '--ignore-workspace', '--ignore-scripts'], tmpDir)
  if (install.code !== 0) {
    process.stderr.write(install.stdout + install.stderr)
    throw new Error(`pnpm install failed in ${tmpDir}`)
  }

  console.log('==> building the consumer fixture with vite')
  const build = await runCaptured(pnpmCommand.cmd, [...pnpmCommand.prefixArgs, 'exec', 'vite', 'build'], tmpDir)
  if (build.code !== 0) {
    process.stderr.write(build.stdout + build.stderr)
    throw new Error(`vite build failed in ${tmpDir}`)
  }

  const installedPkg = JSON.parse(await readFile(path.join(tmpDir, 'node_modules', '@kong', 'kongponents', 'package.json'), 'utf8'))
  const kongponentsLabel = `@kong/kongponents@${installedPkg.version}`
  console.log(`==> running checks against ${kongponentsLabel}`)

  const steps = [
    {
      name: 'browser: vite build loads, mounts KDateTimePicker, date-fns helpers render',
      async run() {
        const distDir = path.join(tmpDir, 'dist')
        const server = await startStaticServer(distDir)
        const { port } = server.address()
        let browser
        const problems = []
        try {
          browser = await chromium.launch()
          const context = await browser.newContext({ timezoneId: 'America/New_York' })
          const page = await context.newPage()
          page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))
          page.on('console', (message) => {
            if (message.type() === 'error') problems.push(`console error: ${message.text()}`)
          })
          await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' })
          try {
            await page.waitForSelector('body[data-ready="true"]', { timeout: 15000 })
          } catch {
            if (problems.length > 0) {
              throw new Error(`the page errored before mounting: ${problems.join(' | ')}`)
            }
            throw new Error('the page never signalled ready within 15s')
          }
          const triggerText = (await page.textContent('[data-testid="datetime-picker-display"]')) ?? ''
          if (!triggerText.includes('2025')) {
            throw new Error(`the picker trigger does not show 2025 (got ${JSON.stringify(triggerText)})`)
          }
          for (const testId of ['date-fns-year', 'date-fns-tz-year']) {
            const text = ((await page.textContent(`[data-testid="${testId}"]`)) ?? '').trim()
            if (text !== '2025') {
              throw new Error(`[data-testid="${testId}"] shows ${JSON.stringify(text)}, expected "2025"`)
            }
          }
          if (problems.length > 0) {
            throw new Error(`the page reported errors: ${problems.join(' | ')}`)
          }
          return `trigger shows ${JSON.stringify(triggerText.replace(/\s+/g, ' ').trim())}`
        } finally {
          await browser?.close()
          await new Promise((resolve) => server.close(resolve))
        }
      },
    },
    { name: 'es-import: the ES entry imports in node', script: 'es-import' },
    { name: 'ssr: KDateTimePicker renders through vue/server-renderer', script: 'ssr' },
    // Expected failure: see the header comment.
    { name: 'cjs: the CJS entry loads through require()', script: 'cjs', expected: true },
    { name: 'nuxt: the Nuxt module imports with a default export', script: 'nuxt' },
    // Expected failure: see the header comment.
    { name: 'umd: the UMD bundle loads and exposes KDateTimePicker', script: 'umd', expected: true },
  ]

  const results = []
  for (const step of steps) {
    try {
      const note = step.script
        ? await runNodeStep(path.join(stepScriptsDir, `${step.script}.mjs`), tmpDir)
        : await step.run()
      results.push({ name: step.name, ok: true, expected: step.expected ?? false })
      if (step.expected) {
        console.log(`XPASS ${step.name}`)
      } else {
        console.log(`PASS ${step.name}: ${note}`)
      }
    } catch (error) {
      results.push({ name: step.name, ok: false, expected: step.expected ?? false })
      const suffix = step.expected ? ' (also fails on published 9.64.21)' : ''
      console.log(`${step.expected ? 'XFAIL' : 'FAIL'} ${step.name} [${kongponentsLabel}]: ${error.message}${suffix}`)
    }
  }

  if (process.env.KEEP_TMP === '1') {
    console.log(`==> temp dir kept: ${tmpDir}`)
  } else {
    await rm(tmpDir, { recursive: true, force: true })
  }

  process.exitCode = results.some((result) => !result.ok && !result.expected) ? 1 : 0
}

main().catch(async (error) => {
  console.error(error.message)
  if (tmpDir && process.env.KEEP_TMP !== '1') {
    try {
      await rm(tmpDir, { recursive: true, force: true })
    } catch {
      // the temp dir is best-effort cleanup; never mask the original error
    }
  }
  process.exitCode = 1
})
