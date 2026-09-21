import { describe, expect, it } from 'vitest'
import { extractComponentProperty, extractDocumentationScope, extractDocumentationSections, listComponentProperties } from './markdown'

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

## Slots

### default

Default slot details.
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

  it('does not treat a matching slot heading as a property', () => {
    const result = extractComponentProperty(markdown, 'default')
    expect(result.matchedProperty).toBeUndefined()
    expect(result.markdown).toBeUndefined()
  })

  it('indexes nested HTML attributes without listing their container as a property', () => {
    const result = listComponentProperties(`
# Button

## Props

### appearance

Details.

### HTML Attributes

#### disabled

Disabled details.
`)
    expect(result).toEqual(['appearance', 'disabled'])
  })

  it('does not interpret tables inside a prop description as additional props', () => {
    const result = listComponentProperties(`
# Button

## Props

### appearance

| Value | Description |
| --- | --- |
| primary | Primary action. |
`)
    expect(result).toEqual(['appearance'])
  })

  it('indexes argument-based component APIs', () => {
    const result = extractComponentProperty(`
# Toaster

## Arguments

### title

Notification title.
`, 'title')
    expect(result.matchedProperty).toBe('title')
    expect(result.markdown).toContain('Notification title.')
  })

  it('scopes a nested component and reads table-based properties', () => {
    const scoped = extractDocumentationScope(`
# Dropdown

## Props

### triggerText

Parent prop.

## KDropdownItem

Nested component.

### Props

| Prop | Description |
| --- | --- |
| \`item\` | Item data. |
| \`disabled\` | Disable the item. |

### Events

#### click
`, 'KDropdownItem')

    expect(scoped).toBeDefined()
    expect(listComponentProperties(scoped!)).toEqual(['item', 'disabled'])
    const result = extractComponentProperty(scoped!, 'item')
    expect(result.markdown).toContain('| `item` | Item data. |')
    expect(result.markdown).not.toContain('triggerText')
  })
})
