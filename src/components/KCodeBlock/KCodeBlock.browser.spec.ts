import { describe, it, expect, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KCodeBlock from './KCodeBlock.vue'
import type { CodeBlockProps } from '@/types'

const code = `{
  "key1": "string value",
  "key2": 5681,
  "key3": [1, 2, 3]
}`

const longCode = `{
  "key1": "string value",
  "key2": 5681,
  "key3": [1, 2, 3],
  "key4": "string value",
  "key5": 5681,
  "key6": [1, 2, 3],
  "key7": "string value",
  "key8": 5681,
  "key9": [1, 2, 3],
  "key10": "string value",
  "key11": 5681,
  "key12": [1, 2, 3],
  "key13": "string value",
  "key14": 5681,
  "key15": [1, 2, 3],
  "key16": "string value",
  "key17": 5681,
  "key18": [1, 2, 3],
  "key19": "string value",
  "key20": 5681,
  "key21": [1, 2, 3],
  "key22": "string value",
  "key23": 5681,
  "key24": [1, 2, 3],
  "key25": "string value",
  "key26": 5681,
  "key27": [1, 2, 3],
  "key28": "string value",
  "key29": 5681,
  "key30": [1, 2, 3]
}`

function renderComponent(props: Partial<CodeBlockProps> & Pick<CodeBlockProps, 'id'>) {
  return render(KCodeBlock, {
    props: {
      language: 'json',
      code,
      ...props,
    },
  })
}

describe('KCodeBlock', () => {
  it('has the right default content', async () => {
    await renderComponent({ id: 'code-block' })

    await expect.poll(() => page.getByCSS('.line').all().length).toBe(5)
    await expect.element(page.getByTestId('code-block-copy-button-code-block')).toBeInTheDocument()
    await expect.element(page.getByTestId('highlighted-code-block')).toHaveTextContent(code.replace(/\s+/g, ' ').trim())
  })

  it('has no copy button when props.showCopyButton is false', async () => {
    await renderComponent({ id: 'code-block', showCopyButton: false })

    await expect.element(page.getByTestId('code-block-copy-button-code-block')).not.toBeInTheDocument()
  })

  it('always show the copy button without needing to hover when props.showCopyButton is "always"', async () => {
    await page.viewport(1281, 800)

    // The copy button is revealed via `opacity`, which Playwright's actionability model
    // (and thus `toBeVisible`) doesn't factor in — a fully transparent element still has a
    // non-empty bounding box. Assert the computed style that actually gates the reveal.
    const defaultRender = await renderComponent({ id: 'code-block' })
    await expect.element(page.getByCSS('.secondary-actions-wrapper')).toHaveStyle({ opacity: '0' })
    await defaultRender.unmount()

    await renderComponent({ id: 'code-block', showCopyButton: 'always' })
    await expect.element(page.getByCSS('.secondary-actions-wrapper')).toHaveStyle({ opacity: '1' })
  })

  it('copies the value of props.code to the clipboard when props.copyCode is not provided', async () => {
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()

    await renderComponent({ id: 'code-block', showCopyButton: 'always' })

    await page.getByTestId('code-block-copy-button-code-block').click()
    await expect.poll(() => writeText.mock.calls.length).toBe(1)
    expect(writeText).toHaveBeenCalledWith(code)
  })

  it('copies the value of props.copyCode to the clipboard when provided, instead of props.code', async () => {
    const copyCode = '{ "redacted": "actual-secret-value" }'
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()

    await renderComponent({ id: 'code-block', copyCode, showCopyButton: 'always' })

    await page.getByTestId('code-block-copy-button-code-block').click()
    await expect.poll(() => writeText.mock.calls.length).toBe(1)
    expect(writeText).toHaveBeenCalledWith(copyCode)
    expect(writeText).not.toHaveBeenCalledWith(code)
  })

  it('copies the value of props.copyCode when triggered via the Alt+C shortcut', async () => {
    const copyCode = 'real-value-to-be-copied'
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()

    await renderComponent({ id: 'code-block', copyCode })

    page.getByTestId('k-code-block').element().focus()
    await userEvent.keyboard('{Alt>}c{/Alt}')

    await expect.poll(() => writeText.mock.calls.length).toBe(1)
    expect(writeText).toHaveBeenCalledWith(copyCode)
  })

  it('can be searched to highlight matching lines', async () => {
    const id = 'code-block'
    await renderComponent({
      id,
      searchable: true,
    })

    // Searches in normal mode.
    const expectedLineNumbers = [2, 3, 4]

    await expect.element(page.getByTestId('code-block-search-input')).toHaveAttribute('name', 'code-search')
    await page.getByTestId('code-block-search-input').fill('key')
    // Ensures processing of the search is done. (The transient "processing" state itself isn't
    // asserted — the debounce's leading edge resolves within a single tick here, faster than
    // it's reliably observable, unlike in the Cypress command queue.)
    await expect.element(page.getByTestId('code-block-processing-icon')).not.toBeInTheDocument()

    // Jumps to the next (i.e. first) match using F3 and checks that the highlighted line numbers are jumped to in order.
    await expect.element(page.getByCSS('.line-is-highlighted-match')).not.toBeInTheDocument()
    const codeBlock = page.getByTestId('k-code-block')
    codeBlock.element().focus()
    for (const lineNumber of expectedLineNumbers) {
      await userEvent.keyboard('{F3}')
      await expect.element(page.getByCSS(`.line-is-highlighted-match .line-anchor#${id}-L${lineNumber}`)).toBeVisible()
    }

    // Searches again in regular expression mode.
    const expectedLineNumbersForRegExp = [2, 3]

    await page.getByTestId('regexp-mode-button').click()

    await page.getByTestId('code-block-search-input').clear()
    await page.getByTestId('code-block-search-input').fill('key[12]')
    await expect.element(page.getByTestId('code-block-processing-icon')).not.toBeInTheDocument()

    await expect.poll(() => page.getByCSS('.line-is-match').all().length).toBe(expectedLineNumbersForRegExp.length)
    // Checks if the correct line numbers are highlighted now that processing is done.
    for (const lineNumber of expectedLineNumbersForRegExp) {
      await expect.element(page.getByCSS(`.line-is-match .line-anchor#${id}-L${lineNumber}`)).toBeInTheDocument()
    }
  })

  it('can highlight matching lines when initialized with highlightedLineNumbers', async () => {
    const id = 'code-block'
    const expectedLineNumbers = [3, 4, 5]
    await renderComponent({
      id,
      highlightedLineNumbers: expectedLineNumbers,
    })

    await expect.element(page.getByTestId('code-block-processing-icon')).not.toBeInTheDocument()

    // Jumps to the next (i.e. first) match using F3 and checks that the highlighted line numbers are jumped to in order.
    await expect.element(page.getByCSS('.line-is-highlighted-match')).not.toBeInTheDocument()
    page.getByTestId('k-code-block').element().focus()
    for (const lineNumber of expectedLineNumbers) {
      await userEvent.keyboard('{F3}')
      await expect.element(page.getByCSS(`.line-is-highlighted-match .line-anchor#${id}-L${lineNumber}`)).toBeVisible()
    }
  })

  it('can highlight matching lines when initialized with highlightedLineNumbers in range expressions', async () => {
    const id = 'code-block'
    const expectedLineNumbers = [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 30, 31, 32]
    await renderComponent({
      id,
      code: longCode,
      highlightedLineNumbers: '10-3,4,6,12,1,13-13,30-34',
    })

    for (const lineNumber of expectedLineNumbers) {
      await expect.element(page.getByCSS('.line').nth(lineNumber - 1)).toHaveClass('line-is-match')
    }
  })

  it('can highlight matching lines when initialized with highlightedLineNumbers as tuples', async () => {
    const id = 'code-block'
    const expectedLineNumbers = [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 30, 31, 32]
    await renderComponent({
      id,
      code: longCode,
      highlightedLineNumbers: [[10, 3], 4, 6, 12, 1, [13, 13], [30, 34]],
    })

    for (const lineNumber of expectedLineNumbers) {
      await expect.element(page.getByCSS('.line').nth(lineNumber - 1)).toHaveClass('line-is-match')
    }
  })

  it('can be filtered to show only matching lines (like grep)', async () => {
    await renderComponent({ id: 'code-block', searchable: true })

    // Searches in normal mode.
    const expectedMatchedTerms = ['key']
    const expectedNumberOfMatches = 3

    await page.getByTestId('filter-mode-button').click()

    await page.getByTestId('code-block-search-input').fill('key')
    // Ensures processing of the search is done. (The transient "processing" state itself isn't
    // asserted — the debounce's leading edge resolves within a single tick here, faster than
    // it's reliably observable, unlike in the Cypress command queue.)
    await expect.element(page.getByTestId('code-block-processing-icon')).not.toBeInTheDocument()

    const matchedTerms = page.getByCSS('.matched-term')
    await expect.poll(() => matchedTerms.all().length).toBe(expectedNumberOfMatches)
    for (const matchedTerm of matchedTerms.all()) {
      expect(expectedMatchedTerms.includes(matchedTerm.element().textContent as string)).toBe(true)
    }

    // Searches again in regular expression mode.
    const expectedMatchedTermsForRegExp = ['key1', 'key2']
    const expectedNumberOfMatchesForRegExp = 2

    await page.getByTestId('regexp-mode-button').click()

    await page.getByTestId('code-block-search-input').clear()
    await page.getByTestId('code-block-search-input').fill('key[12]')
    await expect.element(page.getByTestId('code-block-processing-icon')).not.toBeInTheDocument()

    const matchedTermsForRegExp = page.getByCSS('.matched-term')
    await expect.poll(() => matchedTermsForRegExp.all().length).toBe(expectedNumberOfMatchesForRegExp)
    for (const matchedTerm of matchedTermsForRegExp.all()) {
      expect(expectedMatchedTermsForRegExp.includes(matchedTerm.element().textContent as string)).toBe(true)
    }
  })

  it('shows matching results when initializing with query', async () => {
    await renderComponent({ id: 'code-block', searchable: true, query: 'key' })

    await expect.poll(() => page.getByCSS('.line-is-match').all().length).toBe(3)
  })

  it('matching results when initializing with query overrides highlightedNumberLines', async () => {
    await renderComponent({ id: 'code-block', searchable: true, query: 'key', highlightedLineNumbers: [1] })

    // should highlight 2, 3, 4
    await expect.poll(() => page.getByCSS('.line-is-match').all().length).toBe(3)
  })

  it('can be interacted with using default shortcuts', async () => {
    const id = 'code-block'
    await renderComponent({ id, searchable: true, query: 'key' })

    // Tests that scoped shortcuts don’t work when focus is not within the code block.
    await userEvent.keyboard('{F3}')
    await expect.element(page.getByCSS('.line-is-highlighted-match')).not.toBeInTheDocument()

    const codeBlock = page.getByTestId('k-code-block')

    codeBlock.element().focus()
    await userEvent.keyboard('{F3}')
    await expect.element(page.getByCSS('.line-is-highlighted-match .line-anchor')).toHaveAttribute('id', `${id}-L2`)

    await userEvent.keyboard('{F3}')
    await expect.element(page.getByCSS('.line-is-highlighted-match .line-anchor')).toHaveAttribute('id', `${id}-L3`)

    await userEvent.keyboard('{F3}')
    await expect.element(page.getByCSS('.line-is-highlighted-match .line-anchor')).toHaveAttribute('id', `${id}-L4`)

    await userEvent.keyboard('{F3}')
    await expect.element(page.getByCSS('.line-is-highlighted-match .line-anchor')).toHaveAttribute('id', `${id}-L2`)

    await userEvent.keyboard('{Shift>}{F3}{/Shift}')
    await expect.element(page.getByCSS('.line-is-highlighted-match .line-anchor')).toHaveAttribute('id', `${id}-L4`)

    // Switches to filter mode using shortcut.
    await expect.element(page.getByCSS('.filtered-code-block')).not.toBeInTheDocument()
    await userEvent.keyboard('{Alt>}f{/Alt}')
    await expect.element(page.getByCSS('.filtered-code-block')).toBeInTheDocument()
    await expect.poll(() => page.getByCSS('.matched-term').all().length).toBe(3)

    // Switches to regular expression mode using shortcut.
    await page.getByTestId('code-block-search-input').clear()
    await page.getByTestId('code-block-search-input').fill('key[12]')

    codeBlock.element().focus()
    await userEvent.keyboard('{Alt>}r{/Alt}')
    await expect.poll(() => page.getByCSS('.matched-term').all().length).toBe(2)
  })

  it('can hide line numbers', async () => {
    await renderComponent({ id: 'code-block', showLineNumbers: false })

    await expect.element(page.getByCSS('.line-number-rows')).not.toBeInTheDocument()
  })

  it('shows line number links', async () => {
    const id = 'code-block'
    await renderComponent({ id, searchable: true, query: 'key', showLineNumberLinks: true })

    page.getByTestId('k-code-block').element().focus()
    await userEvent.keyboard('{F3}')
    await expect.element(page.getByCSS('.line-is-highlighted-match .line-anchor')).toHaveAttribute('href', `#${id}-L2`)
  })

  it('has the `single-line` class when props.singleLine is true', async () => {
    await renderComponent({ id: 'code-block', singleLine: true })

    await expect.element(page.getByCSS('pre.highlighted-code-block')).toHaveClass('single-line')
  })

  it('initializes in regular expression mode with search correctly executed', async () => {
    const id = 'code-block'
    await renderComponent({
      id,
      initialRegExpMode: true,
      query: 'key[12]',
    })

    const expectedLineNumbersForRegExp = [2, 3]

    await expect.poll(() => page.getByCSS('.line-is-match').all().length).toBe(expectedLineNumbersForRegExp.length)
    for (const lineNumber of expectedLineNumbersForRegExp) {
      await expect.element(page.getByCSS(`.line-is-match .line-anchor#${id}-L${lineNumber}`)).toBeInTheDocument()
    }
  })

  it('initializes in filter mode with search correctly executed', async () => {
    await renderComponent({
      id: 'code-block',
      initialFilterMode: true,
      initialRegExpMode: true,
      query: 'key[12]',
    })

    const expectedMatchedTerms = ['key1', 'key2']
    const expectedNumberOfMatches = 2

    const matchedTerms = page.getByCSS('.matched-term')
    await expect.poll(() => matchedTerms.all().length).toBe(expectedNumberOfMatches)
    for (const matchedTerm of matchedTerms.all()) {
      expect(expectedMatchedTerms.includes(matchedTerm.element().textContent as string)).toBe(true)
    }
  })

  it('emits code-block-render event on mount with correct event data', async () => {
    const onCodeBlockRender = vi.fn()

    const props = {
      id: 'code-block',
      language: 'json',
      code,
      onCodeBlockRender,
    }

    await render(KCodeBlock, { props })

    await expect.poll(() => onCodeBlockRender.mock.calls.length).toBe(1)

    const eventData = onCodeBlockRender.mock.calls[0][0]

    expect(eventData).toMatchObject({
      code: props.code,
      language: props.language,
      query: '',
    })
    expect(eventData.preElement).toBeInstanceOf(HTMLElement)
    expect(eventData.codeElement).toBeInstanceOf(HTMLElement)
    expect(Array.isArray(eventData.matchingLineNumbers)).toBe(true)
  })
})
