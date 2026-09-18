import { describe, expect, it } from 'vitest'
import { extractComponentProperty, extractDocumentationSections } from './markdown'

const markdown = `# Example

Overview text.

\`\`\`md
## Not a real section
### not-a-property
\`\`\`

## Props

### appearance

Appearance details.

### size

Size details.

## Events

Event details.
`

describe('MCP Markdown selection', () => {
  it('selects documentation sections without treating fenced examples as headings', () => {
    const result = extractDocumentationSections(markdown, ['Props'])
    expect(result.matchedSections).toEqual(['Props'])
    expect(result.markdown).toContain('### appearance')
    expect(result.markdown).not.toContain('## Events')
    expect(result.availableSections).not.toContain('Not a real section')
  })

  it('selects one property and stops at the next property', () => {
    const result = extractComponentProperty(markdown, 'appearance')
    expect(result.matchedProperty).toBe('appearance')
    expect(result.markdown).toContain('Appearance details.')
    expect(result.markdown).not.toContain('### size')
    expect(result.availableProperties).toEqual(['appearance', 'size'])
  })
})
