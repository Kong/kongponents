import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url))
const source = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8')
const releasePattern = /^#{1,2} \[([^\]]+)\]\(([^)]+)\) \((\d{4}-\d{2}-\d{2})\)\s*$/gm
const matches = [...source.matchAll(releasePattern)]
const latest = matches.slice(0, 20)

if (latest.length < 20) {
  throw new Error(`Expected at least 20 releases in ${repositoryRoot}CHANGELOG.md; found ${latest.length}.`)
}

const releases = latest.map((match, index) => {
  const next = matches[index + 1]
  const details = source.slice(match.index + match[0].length, next?.index ?? source.length)
    .trim()
    .replace(/^### (.+)$/gm, '**$1**')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/(\*\*[^\n]+\*\*)\n(?=\*)/g, '$1\n\n')
  const date = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${match[3]}T00:00:00Z`))

  return `### [v${match[1]}](${match[2]})\n\n*${date}*\n\n${details}`
})

const page = `---
title: Changelog
description: The 20 most recent Kongponents releases and their changes.
---

# Changelog

The 20 most recent Kongponents releases, with changes from the [repository changelog](https://github.com/Kong/kongponents/blob/main/CHANGELOG.md).

## Latest 20 releases

${releases.join('\n\n')}

## Upgrading?

Read the [v9 migration guide](/guide/migrating-to-version-9) for breaking changes, or browse [all releases on GitHub](https://github.com/Kong/kongponents/releases).
`

writeFileSync(new URL('../docs/changelog.md', import.meta.url), page)
