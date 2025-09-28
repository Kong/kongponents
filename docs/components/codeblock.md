# CodeBlock

KCodeBlock is a code block component with built-in search and filter functionalities.

Searching highlights matching lines within the code while filtering shows only matching line (i.e. like the Unix grep command does).

Searching and filtering can happen by exact matches (the default) and by matching regular expressions. The search-related UI controls can also be interacted with [using keyboard shortcuts](#default-shortcuts).

<KCodeBlock
  id="code-block-default"
  :code="code"
  language="json"
  searchable
/>

```html
<KCodeBlock
  id="code-block-default"
  :code="code"
  language="json"
  searchable
/>
```

## Props

### id

An ID used to identify form elements like the search input and its label. This prop is required.

**Note**: If you use multiple instances of KCodeBlock in a document, you need to provide unique ID values.

### code

The code that will be rendered as a text node inside of a `<pre><code></code></pre>` element. This prop is required.

No additional formatting of the code takes places. It will be used as-is.

### language

The syntax language of `props.code` (e.g. `'json'`). This prop is also required.

### initialFilterMode

Boolean to control whether the filter mode is initially active. Can be used together with the [`filter-mode-change` event](#filter-mode-change) to persist a code block’s filter mode setting. Defaults to `false`.

### initialRegExpMode

Boolean to control whether the regular expression mode is initially active. Can be used together with the [`reg-exp-mode-change` event](#reg-exp-mode-change) to persist a code block’s regular expression mode setting. Defaults to `false`.

<KCodeBlock
  id="code-block-initial-reg-exp-mode"
  :code="code"
  language="json"
  query="(true|false)"
  initial-filter-mode
  initial-reg-exp-mode
  searchable
/>

```html
<KCodeBlock
  id="code-block-initial-reg-exp-mode"
  :code="code"
  language="json"
  query="(true|false)"
  initial-filter-mode
  initial-reg-exp-mode
  searchable
/>
```

### searchable

Boolean to control whether to show or hide the search bar and related action buttons. Defaults to `false`.

<KCodeBlock
  id="code-block-searchable"
  :code="code"
  language="json"
  searchable
/>

```html
<KCodeBlock
  id="code-block-searchable"
  :code="code"
  language="json"
  searchable
/>
```

### highlightedLineNumbers

An string or array specifying the line numbers to initially highlight in the code block.

- String: Use a comma-separated list of line numbers or ranges, e.g., `"2,4,6"` or `"2,4,6-12"`. This syntax is commonly supported in Markdown code block extensions.
- Array: Provide an array of line numbers or ranges, e.g., `[2, 4, 6]` or `[2, 4, [6, 12]]`.

If search is enabled, matching results will be highlighted in place of the provided line numbers, and all highlighted lines will be cleared once the search query is cleared.

<KCodeBlock
  id="code-block-highlight"
  :code="code"
  language="json"
  highlighted-line-numbers="2,4,6-12"
/>

```html
<KCodeBlock
  id="code-block-highlight"
  :code="code"
  language="json"
  highlighted-line-numbers="2,4,6-12"
/>
```

### singleLine

Whether the code passed into the component should be displayed on a single line. Defaults to `false`.

::: tip NOTE
Please keep the following in mind when using `singleLine`:

- Line numbers will not be displayed
- Code will not be searchable
- Multi-line code snippets will have `\n` stripped out to allow displaying the code on a single line. Code copied by clicking the copy button will contain any `\n` in the original code.
:::

<KCodeBlock
  id="code-block-single-line"
  :code="cert"
  single-line
  language="plaintext"
/>

```html
<KCodeBlock
  id="code-block-single-line"
  :code="cert"
  single-line
  language="plaintext"
/>
```

### processing

Allows controlling the processing state from outside the component. This allows a parent component to show the processing icon when it’s, for example, currently syntax highlighting the code.

<KCodeBlock
  id="code-block-processing"
  :code="code"
  language="json"
  searchable
  processing
/>

```html
<KCodeBlock
  id="code-block-processing"
  :code="code"
  language="json"
  processing
/>
```

### maxHeight

The `max-height` of the code block. Default value is `none`.

<KCodeBlock
  id="code-block-max-height"
  :code="code"
  language="json"
  max-height="200"
/>

```html
<KCodeBlock
  id="code-block-max-height"
  :code="code"
  language="json"
  max-height="200"
/>
```

### query

Used as the initial value of the search input. Can be used to initialize a code block with a query which was read from client storage.

<KCodeBlock
  id="code-block-query"
  :code="code"
  language="json"
  searchable
  query="no"
  max-height="200"
/>

```html
<KCodeBlock
  id="code-block-query"
  :code="code"
  language="json"
  searchable
  query="no"
  max-height="200"
/>
```

### showCopyButton

Controls whether to show a copy button which copies the original code (the value of `props.code`) to the clipboard. Defaults to `true`.

<KCodeBlock
  id="code-block-show-copy-button"
  :code="code"
  language="json"
  :show-copy-button="false"
/>

```html
<KCodeBlock
  id="code-block-show-copy-button"
  :code="code"
  language="json"
  :show-copy-button="false"
/>
```

### showLineNumbers

Controls whether to show line numbers. Defaults to `true`.

<KCodeBlock
  id="code-block-show-line-numbers"
  :code="code"
  language="json"
  :show-line-numbers="false"
/>

```html
<KCodeBlock
  id="code-block-show-line-numbers"
  :code="code"
  language="json"
  :show-line-numbers="false"
/>
```

### showLineNumberLinks

Controls whether to add links to the current line number. Defaults to `false`.

You might need to turn this off for sites that already constantly use the fragment identifier in the URL like vue router’s hash-based navigation mode where all URL paths follow a first `/#/` segment.

<KCodeBlock
  id="code-block-show-line-number-links"
  :code="code"
  language="json"
  :show-line-number-links="true"
  max-height="200px"
/>

```html
<KCodeBlock
  id="code-block-show-line-number-links"
  :code="code"
  language="json"
  :show-line-number-links="true"
/>
```

### theme

Sets the display theme of the component. Accepted values are:

- `light` (default)
- `dark`

<KCodeBlock
  id="code-block-dark-theme"
  :code="code"
  language="json"
  theme="dark"
  searchable
/>

```html
<KCodeBlock
  id="code-block-dark-theme"
  :code="code"
  language="json"
  theme="dark"
  searchable
/>
```

## Slots

### secondary-actions

Allows adding elements after the location of the copy button. See example in [KCodeBlockIconButton component docs section](#kcodeblockiconbutton).

## KCodeBlockIconButton

KCodeBlockIconButton is a helper component for adding KCodeBlock-style icon buttons. It works just like a regular button with a few props expanding it's functionality.

### Props

#### theme

Pass the value matching the [`theme` prop](#theme) value passed to KCodeBlock component so that the button style matches the theme. **Note:** it's also a good idea to combine this prop with appropriate accessibility attributes such as `aria-pressed`.

#### active

Use this prop for buttons that can have two states: _active_ and _inactive_ (e.g. filter mode button). This will apply appropriate state styling to the button. Defaults to `true`.

#### copyTooltip

If the button action is copying some content to the clipboard, you can pass test through this prop that will be displayed as tooltip on the button. Once the button is clicked, the tooltip text will change to "Copied!" for a few seconds before changing back to the original value you passed.

### Slots

#### default

Slot for button content.

<KCodeBlock
  id="code-block-slots-secondary-actions"
  :code="code"
  language="json"
>
  <template #secondary-actions>
    <KCodeBlockIconButton copy-tooltip="Copy as k8s">
      <CopyIcon />
      as k8s
    </KCodeBlockIconButton>
  </template>
</KCodeBlock>

```html
<KCodeBlock
  id="code-block-slots-secondary-actions"
  :code="code"
  language="json"
>
  <template #secondary-actions>
    <KCodeBlockIconButton copy-tooltip="Copy as k8s">
      <CopyIcon />
      as k8s
    </KCodeBlockIconButton>
  </template>
</KCodeBlock>
```

## Events

### code-block-render

Fired when the code block is rendered or re-rendered. This happens when:

- the component’s `mounted` life cycle hook is fired
- the filter mode is turned off
- `props.code` changes

Event payload is object instance of type `CodeBlockEventData`.

```ts
interface CodeBlockEventData {
  preElement: HTMLElement
  codeElement: HTMLElement
  code: string
  language: string
  query: string
  matchingLineNumbers: number[]
}
```

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

### filter-mode-change

Fired when the toggles the filter mode.

### matching-lines-change

Fired when the lines matching a query change. Event payload is object instance of type `CodeBlockEventData`.

### query-change

Fired when the component’s internal query state is updated. This happens when the user finished typing (with a delay of a few hundred milliseconds to avoid repeatedly triggering computations while the user is still typing).

### reg-exp-mode-change

Fired when the toggles the regular expression mode.

## Default shortcuts

This component has a few shortcuts for interacting with its search and filter features. All of them are scoped to the code block. When invoking them while focus is placed outside of a code block, their associated actions won’t trigger.

| Shortcut                                      | Description             |
| :-------------------------------------------- | :---------------------- |
| <kbd>Alt+F</kbd> or <kbd>Alt+G</kbd>          | Toggles filter mode     |
| <kbd>Alt+R</kbd>                              | Toggles RegExp mode     |
| <kbd>Alt+C</kbd>                              | Copies the code         |
| <kbd>F3</kbd> or <kbd>Enter</kbd>             | Jumps to next match     |
| <kbd>Shift+F3</kbd> or <kbd>Shift+Enter</kbd> | Jumps to previous match |

## Syntax highlighting

The `KCodeBlock` component does not have syntax highlighting built in; however, your project can provide its own implementation, making use of the [`code-block-render` event](#code-block-render) to apply syntax highlighting.

### PrismJS

Below is an integration example for the popular syntax highlighting library [PrismJS](https://prismjs.com/).

```html
<template>
  <KCodeBlock
    id="code-block"
    :code="code"
    language="json"
    :processing="processing"
    searchable
    @code-block-render="highlight"
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

const processing = ref(false)

/**
 * Applies PrismJS syntax highlighting.
 *
 * **Note**: Use higher-level functions like `Prism.highlightElement` for highlighting.
 * Lower-level functions like `Prism.highlight` don’t run any of the hooks
 * that are used to make plugins work.
 */
function highlight({ preElement, codeElement, language, code }) {
  processing.value = true

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

  processing.value = false
}
</script>
```

### Shiki

Below is an integration example for [Shiki](http://shiki.style/), a beautiful and powerful syntax highlighter.

```html
<template>
  <KCodeBlock
    id="code-block"
    :code="code"
    language="json"
    theme="dark"
    @code-block-render="highlight"
  />
</template>

<script setup>
import { ref } from 'vue'
import { KCodeBlock } from '@kong/kongponents/KCodeBlock.vue'
import { codeToHtml } from 'shiki'

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

async function highlight({ codeElement, language, code }) {
  codeElement.innerHTML = await codeToHtml(code, {
    lang: language,
    theme: 'vitesse-dark'
    // `inline` allows to generate <span> and <br> elements without wrapper.
    // Foreground and background colors are not applied for easier embedding. 
    structure: 'inline'
  })
}
</script>
```

<script setup lang="ts">
import { CopyIcon } from '@kong/icons'

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
    "./types",
    "./particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ]
}`

const cert = `-----BEGIN CERTIFICATE-----
MIIDlDCCAn6gAwIBAgIBATALBgkqhkiG9w0BAQ0wNDEyMAkGA1UEBhMCVVMwJQYD
VQQDHh4AawBvAG4AbgBlAGMAdAAtAGQAZQBmAGEAdQBsAHQwHhcNMjMwMTAzMTg1
NDQxWhcNMzMwMTAzMTg1NDQxWjA0MTIwCQYDVQQGEwJVUzAlBgNVBAMeHgBrAG8A
bgBuAGUAYwB0AC0AZABlAGYAYQB1AGwAdDCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAJ1dzsZKtwFniWQaxIEqrs2EH95fWQ4Jie+79jJL1unRJJu5oDnR
5ontJZhPFSDdGZ1ZXhjQXIzaUk3BoFn7Zel7X25hzUdlKHoOTPf/KA7+isdvS89j
nGoC5vHtXQmgzNFRdCjeKDOmfa/Arff7+41SNTT+DNitZun+V3diePoatotOT3tv
puNqc5EjHLEGOdBwxSkO7qCvzsqOcFyBshT8AzFKU8aapErlILOIJKJIYHoAkS/A
cUfm/MNNMzPBBI3p1jZKXnWCwXMWUi8jZvsALYwn8E65GE07jW2O+n9hWzC43yTu
DYW0U8vcoTsdPmsZByIFDfERaxavQiEuhf0CAwEAAaOBtDCBsTASBgNVHRMBAf8E
CDAGAQH/AgEDMAsGA1UdDwQEAwIABjAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYB
BQUHAwIwFwYJKwYBBAGCNxQCBAoMCGNlcnRUeXBlMCMGCSsGAQQBgjcVAgQWBBQB
AQEBAQEBAQEBAQEBAQEBAQEBATAcBgkrBgEEAYI3FQcEDzANBgUpAQEBAQIBCgIB
FDATBgkrBgEEAYI3FQEEBgIEABQACjALBgkqhkiG9w0BAQ0DggEBABGVFc6DTlx7
SuKgT3OhQS94VyECnJjyk2eR6/MaZYvgw0Iz8nOyg7xTtj7DKl/uyHdJWwYn5R70
+YGF7GGbkk6rkRuHEVT+dhyYwO9fKzBZkLNnzdp900VSmTubx4j6WN0+gmQS0dLW
uyBQdUiKvE/ZTjWHUAIYb3244VRRHBRLs3s40f2mJjBZ3Zm6XUxGtsnYudWOh4cv
nYKRWqogwSBtKPYAe115DLDULxe86Cu5neYTt5/kU7VjnLxhOhguWTIrGMSV0Jle
Rl1IG8evLu2zWxN3wb451/Kf5lRFLUjfjuLD8tHMlpwVIxoHct9GuKV4W14cf2Q/
cWMCwpGsAAE=
-----END CERTIFICATE-----`
</script>
