# CodeBlock

**KCodeBlock** is a code block component with built-in search and filter functionalities.

Searching highlights matching lines within the code while filtering shows only matching line (i.e. like the Unix grep command does).

Searching and filtering can happen by exact matches (the default) and by matching regular expressions. The search-related UI controls can also be interacted with [using keyboard shortcuts](#default-shortcuts).

::: danger EXPERIMENTAL COMPONENT
`KCodeBlock` is an experimental component. The component’s design and overall look and feel may change until it is in stable status.
:::

<ClientOnly>
  <KCodeBlock
    id="code-block-default"
    :code="code"
    language="json"
    is-searchable
  />
</ClientOnly>

```html
<KCodeBlock
  id="code-block-default"
  :code="code"
  language="json"
  is-searchable
/>
```

## Props

### id

* **Type**: `string`
* **Required**: yes

An ID used to identify form elements like the search input and its label.

**Note**: If you use multiple instances of `KCodeBlock` in a document, you need to provide unique ID values.

### code

* **Type**: `string`
* **Required**: yes

The code that will be rendered as a text node inside of a `<pre><code></code></pre>` fragment.

No additional formatting of the code takes places. It will be used as-is.

### language

* **Type**: `string`
* **Required**: yes

The syntax language of `props.code` (e.g. `'json'`).

### isSearchable

* **Type**: `boolean`
* **Required**: no
* **Default**: `false`

Shows an actions bar with a search input and related action buttons.

<ClientOnly>
  <KCodeBlock
    id="code-block-is-searchable"
    :code="code"
    language="json"
    is-searchable
  />
</ClientOnly>

```html
<KCodeBlock
  id="code-block-is-searchable"
  :code="code"
  language="json"
  is-searchable
/>
```

### isProcessing

* **Type**: `boolean`
* **Required**: no
* **Default**: `false`

Allows controlling the processing state from outside the component. This allows a parent component to show the processing icon when it’s, for example, currently syntax highlighting the code.

<ClientOnly>
  <KCodeBlock
    id="code-block-is-processing"
    :code="code"
    language="json"
    is-searchable
    is-processing
  />
</ClientOnly>

```html
<KCodeBlock
  id="code-block-is-processing"
  :code="code"
  language="json"
  is-processing
/>
```

### query

* **Type**: `string`
* **Required**: no
* **Default**: `''`

Used as the initial value of the search input. Can be used to initialize a code block with a query which was read from client storage.

<ClientOnly>
  <KCodeBlock
    id="code-block-query"
    :code="code"
    language="json"
    is-searchable
    query="no"
  />
</ClientOnly>

```html
<KCodeBlock
  id="code-block-query"
  :code="code"
  language="json"
  is-searchable
  query="no"
/>
```

### showCopyButton

* **Type**: `boolean`
* **Required**: no
* **Default**: `true`

Controls whether to show a copy button which copies the original code (i.e. the value of `props.code`) to the clipboard.

<ClientOnly>
  <KCodeBlock
    id="code-block-show-copy-button"
    :code="code"
    language="json"
    :show-copy-button="false"
  />
</ClientOnly>

```html
<KCodeBlock
  id="code-block-show-copy-button"
  :code="code"
  language="json"
  :show-copy-button="false"
/>
```

### showLineNumberLinks

* **Type**: `boolean`
* **Required**: no
* **Default**: `false`

Controls whether to add links to the current line number.

You might need to turn this off for sites that already constantly use the fragment identifier in the URL like vue router’s hash-based navigation mode where all URL paths follow a first `/#/` segment.

<ClientOnly>
  <KCodeBlock
    id="code-block-show-line-number-links"
    :code="code"
    language="json"
    :show-line-number-links="true"
    style="--KCodeBlockMaxHeight: 200px"
  />
</ClientOnly>

```html
<KCodeBlock
  id="code-block-show-line-number-links"
  :code="code"
  language="json"
  :show-line-number-links="true"
/>
```

### theme

* **Type**: `string`
* **Required**: no
* **Default**: `light`

Sets the display theme of the component.

**Note**: [Additional theming options](#theming) are available via CSS variables.

<ClientOnly>
  <KCodeBlock
    id="code-block-dark-theme"
    :code="code"
    language="json"
    theme="dark"
    is-searchable
  />
</ClientOnly>

```html
<KCodeBlock
  id="code-block-dark-theme"
  :code="code"
  language="json"
  theme="dark"
  is-searchable
/>
```

## Events

### code-block-render

- **Type**: [`CodeBlockEventData`](#codeblockeventdata)
- **Trigger**: Fired when the code block is rendered or re-rendered. This happens when:
  - the component’s `mounted` life cycle hook is fired
  - the filter mode is turned off
  - `props.code` changes

This event can be used as the trigger for applying syntax highlighting (e.g. via Prism’s `highlightElement` function, see [Syntax highlighting](#syntax-highlighting) for an integration example).

```javascript
function highlight({ preElement, codeElement, language, code }) {
  if (!preElement.classList.contains(`language-${language}`)) {
    preElement.classList.add(`language-${language}`)
  }

  codeElement.innerHTML = code

  Prism.highlightElement(codeElement)
}
```

### matching-lines-change

- **Type**: [`CodeBlockEventData`](#codeblockeventdata)
- **Trigger**: Fired when the lines matching a query change.

### query-change

- **Type**: `string`
- **Trigger**: Fired when the component’s internal query state is updated. This happens when the user finished typing (with a delay of a few hundred milliseconds to avoid repeatedly triggering computations while the user is still typing).

## Theming


| Variable                          | Default                   | Purpose                       |
|:--------------------------------- |:------------------------- |:----------------------------- |
| `--KCodeBlockBorderRadius`        | `5px`                     | Code block border radius      |
| `--KCodeBlockFocusColor`          | `var(--blue-500)`         | General focus color           |
| `--KCodeBlockMatchHighlightColor` | `var(--blue-500)`         | Current match highlight color |
| `--KCodeBlockColor`               | `var(--black-85)`         | Code block text color         |
| `--KCodeBlockBackgroundColor`     | `var(--grey-100)`         | Code block background color   |
| `--KCodeBlockFontSize`            | `var(--type-xs)`          | Code block font size          |
| `--KCodeBlockFontFamilyMono`      | `var(--font-family-mono)` | Code block font family        |
| `--KCodeBlockTabSize`             | `2`                       | Tab size for code blocks      |

## Default shortcuts

This component has a few shortcuts for interacting with its search and filter features. All of them are scoped to the code block. When invoking them while focus is placed outside of a code block, their associated actions won’t trigger.

| Shortcut                             | Description             |
|:------------------------------------ |:----------------------- |
| <kbd>Alt+F</kbd> or <kbd>Alt+G</kbd> | Toggles filter mode     |
| <kbd>Alt+R</kbd>                     | Toggles RegExp mode     |
| <kbd>Alt+C</kbd>                     | Copies the code         |
| <kbd>F3</kbd>                        | Jumps to next match     |
| <kbd>Shift+F3</kbd>                  | Jumps to previous match |

## Types

### `CodeBlockEventData`

```typescript
type CodeBlockEventData = {
  preElement: HTMLElement
  codeElement: HTMLElement
  code: string
  language: string
  query: string
  matchingLineNumbers: number[]
}
```

## Syntax highlighting

The `KCodeBlock` component does not have syntax highlighting built in; however, your project can provide its own implementation.

### PrismJS

Below is an integration example for the popular syntax highlighting library [PrismJS](https://prismjs.com/).

It makes use of the [`code-block-render` event](#code-block-render) to apply syntax highlighting.

```html
<template>
  <KCodeBlock
    id="code-block"
    :code="code"
    language="json"
    :is-processing="isProcessing"
    is-searchable
    @code-block-render="highlight"
    @matching-lines-change="highlightLines"
  />
</template>

<script setup>
import { ref } from 'vue'
import { KCodeBlock } from '@kong/kongponents/KCodeBlock.vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-json.min.js'

import 'prismjs/themes/prism.min.css'

Prism.manual = true

const code = `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types"
  ]
}`

const isProcessing = ref(false)

/**
 * Applies PrismJS syntax highlighting.
 *
 * **Note**: Use higher-level functions like `Prism.highlightElement` for highlighting.
 * Lower-level functions like `Prism.highlight` don’t run any of the hooks
 * that are used to make plugins work.
 */
function highlight({ preElement, codeElement, language, code }) {
  isProcessing.value = true

  if (!Prism.languages[language]) {
    console.warn(`Prism: the language “${language}” isn’t enabled.`)
  }

  if (!preElement.classList.contains(`language-${language}`)) {
    // Adds the language-* class which tells Prism which language to highlight for.
    preElement.classList.add(`language-${language}`)
  }

  // Ensures Prism operates on the raw code and not on an already highlighted DOM fragment.
  codeElement.innerHTML = code

  Prism.highlightElement(codeElement)

  isProcessing.value = false
}
</script>
```

<script lang="ts" setup>
const code = `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types"
  ]
}`
</script>
