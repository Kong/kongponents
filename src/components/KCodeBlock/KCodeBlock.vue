<template>
  <div
    :id="id"
    ref="codeBlock"
    class="k-code-block"
    :class="[`theme-${theme}`]"
    data-testid="k-code-block"
  >
    <div
      v-if="showCodeBlockActions"
      class="code-block-actions"
    >
      <KInput
        v-model="searchQuery"
        aria-label="Search"
        class="code-block-search-input"
        data-testid="code-block-search-input"
        :error="regExpError !== null"
        :error-message="regExpError !== null ? regExpError.message : undefined"
        placeholder="Search..."
        @input="handleSearch"
      >
        <template #before>
          <Transition
            mode="out-in"
            name="kongponents-fade-transition"
          >
            <CloseIcon
              v-if="searchQuery"
              aria-label="Clear query"
              class="clear-query-button"
              data-testid="clear-query-button"
              role="button"
              tabindex="0"
              title="Clear query"
              @click="clearQuery"
              @keydown.enter="clearQuery"
              @keydown.space="clearQuery"
            />
            <SearchIcon
              v-else
              class="code-block-search-icon"
            />
          </Transition>
        </template>
      </KInput>

      <Transition name="kongponents-fade-transition">
        <div
          v-if="isProcessing || searchQuery"
          class="code-block-search-results-container"
        >
          <Transition name="kongponents-fade-transition">
            <ProgressIcon
              v-if="isProcessing"
              class="code-block-processing-icon"
              :color="getIconColor"
              data-testid="code-block-processing-icon"
              :size="KUI_ICON_SIZE_30"
            />
          </Transition>

          <p
            v-if="searchQuery"
            class="code-block-search-results"
          >
            <template v-if="matchingLineNumbers.length === 0">
              No results
            </template>

            <template v-else-if="typeof currentLineIndex === 'number' && !isShowingFilteredCode">
              {{ currentLineIndex + 1 }} of {{ matchingLineNumbers.length }}
            </template>

            <template v-else>
              {{ matchingLineNumbers.length }} {{ matchingLineNumbers.length === 1 ? 'result' : 'results' }}
            </template>
          </p>
        </div>
      </Transition>

      <div class="code-block-search-actions">
        <CodeBlockIconButton
          :active="isRegExpMode"
          :aria-label="`Use regular expression (${ALT_SHORTCUT_LABEL}+R)`"
          class="regexp-mode-button"
          data-testid="regexp-mode-button"
          :theme="theme"
          :title="`Use regular expression (${ALT_SHORTCUT_LABEL}+R)`"
          @click="toggleRegExpMode"
        >
          <RegexIcon />
        </CodeBlockIconButton>

        <CodeBlockIconButton
          :active="isFilterMode"
          :aria-label="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
          class="action-button filter-mode-button"
          data-testid="filter-mode-button"
          :theme="theme"
          :title="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
          @click="toggleFilterMode"
        >
          <FilterIcon />
        </CodeBlockIconButton>

        <CodeBlockIconButton
          aria-label="Previous match (Shift+F3)"
          class="previous-match-button"
          data-testid="previous-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          :theme="theme"
          title="Previous match (Shift+F3)"
          @click="jumpToPreviousMatch"
        >
          <ArrowUpIcon />
        </CodeBlockIconButton>

        <CodeBlockIconButton
          aria-label="Next match (F3)"
          class="next-match-button"
          data-testid="next-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          :theme="theme"
          title="Next match (F3)"
          @click="jumpToNextMatch"
        >
          <ArrowDownIcon />
        </CodeBlockIconButton>
      </div>
    </div>

    <div class="code-block-content">
      <!-- eslint-disable vue/no-v-html -->
      <pre
        v-if="isShowingFilteredCode"
        class="filtered-code-block"
        data-testid="filtered-code-block"
      >
        <span
          v-if="!singleLine"
          class="line-number-rows"
        >
          <span
            v-for="line in matchingLineNumbers"
            :key="line"
            class="line"
          >
            <a
              :id="`${linePrefix}-L${line}`"
              class="line-anchor"
              :href="showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
            >{{ line }}</a>
          </span>
        </span>
        <code v-html="filteredCode" />
      </pre>

      <pre
        v-else
        class="highlighted-code-block"
        :class="{
          'single-line': singleLine,
          'show-copy-button': showCopyButton
        }"
        data-testid="highlighted-code-block"
      >
        <span
          v-if="!singleLine"
          class="line-number-rows"
        >
          <span
            v-for="line in totalLines"
            :key="line"
            class="line"
            :class="{
              'line-is-match': matchingLineNumbers.includes(line),
              'line-is-highlighted-match': currentLineIndex !== null && line === matchingLineNumbers[currentLineIndex],
            }"
          >
            <a
              :id="`${linePrefix}-L${line}`"
              class="line-anchor"
              :class="{ 'hide-links': !showLineNumberLinks }"
              :href="showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
            >{{ line }}</a>
          </span>
        </span>
        <code v-html="finalCode" />
      </pre>
      <!-- eslint-enable vue/no-v-html -->

      <div
        v-if="showCopyButton || slots['secondary-actions']"
        class="code-block-secondary-actions"
      >
        <CodeBlockIconButton
          v-if="showCopyButton"
          :aria-label="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
          class="code-block-copy-button"
          :copy-tooltip="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
          data-testid="code-block-copy-button"
          :theme="theme"
          @click="copyCode"
        >
          <CopyIcon />
        </CodeBlockIconButton>

        <slot name="secondary-actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import KInput from '@/components/KInput/KInput.vue'
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'
import { debounce } from '@/utilities/debounce'
import type { Command } from '@/utilities/ShortcutManager'
import { ShortcutManager } from '@/utilities/ShortcutManager'
import type { CodeBlockEventData, CommandKeywords, Theme } from '@/types'
import useUtilities from '@/composables/useUtilities'
import { CopyIcon, SearchIcon, ProgressIcon, CloseIcon, RegexIcon, FilterIcon, ArrowUpIcon, ArrowDownIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_NEUTRAL_STRONG, KUI_ICON_SIZE_30 } from '@kong/design-tokens'
import CodeBlockIconButton from './CodeBlockIconButton.vue'

const { getSizeFromString } = useUtilities()

const IS_MAYBE_MAC = window?.navigator?.platform?.toLowerCase().includes('mac')
const ALT_SHORTCUT_LABEL = IS_MAYBE_MAC ? 'Options' : 'Alt'

// Debounces the search handler which ensures that we don’t trigger several searches while the user is still typing.
const debouncedHandleSearchInputValue = debounce(handleSearchInputValue, 150)

const props = defineProps({
  /**
   * ID value used for form elements like the search input and its label.
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * The code that will be rendered as a text node inside of a `<pre><code></code></pre>` fragment.
   */
  code: {
    type: String,
    required: true,
  },

  /**
   * The syntax language of `props.code` (e.g. `'json'`).
   */
  language: {
    type: String,
    required: true,
  },

  /**
   * Whether filter mode is initially active. **Default: `false`**.
   */
  initialFilterMode: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Whether regular expression mode is initially active. **Default: `false`**.
   */
  initialRegExpMode: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Shows an actions bar with a search input and related action buttons. **Default: `false`**.
   */
  searchable: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Allows controlling the processing state from outside the component. This allows a parent component to show the processing icon when it’s, for example, currently syntax highlighting the code. **Default: `false`**.
   */
  processing: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Used as the initial value of the search input. Can be used to initialize a code block with a query which was read from client storage. **Default: `''`**.
   */
  query: {
    type: String,
    required: false,
    default: '',
  },

  /**
   * Controls whether to show a copy button. It copies the original code (i.e. the value of `props.code`) to the clipboard. **Default: `true`**.
   */
  showCopyButton: {
    type: Boolean,
    required: false,
    default: true,
  },

  /**
   * Controls whether to add links to the current line number. **Default: `false`**.
   */
  showLineNumberLinks: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Controls the color scheme of the component. **Default: `light`**.
   */
  theme: {
    type: String as PropType<Theme>,
    required: false,
    default: 'light',
  },

  /**
   * Displays the code on a single line. **Default: `false`**.
   */
  singleLine: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * The max-height of the code block. **Default: `none`**.
   */
  maxHeight: {
    type: String,
    required: false,
    default: 'none',
  },
})

const emit = defineEmits<{
  /**
   * Fired when the code block is rendered or re-rendered.
   *
   * This happens initially when mounting the component. It also happens when turning *off* filter mode (this renders a line-filtered sub set of the code and can’t be syntax highlighted after the fact). It also happens when the code changes (i.e. `props.code` is updated).
   */
  (event: 'code-block-render', data: CodeBlockEventData): void

  /**
   * Fired when the matching line numbers are updated in response to a search.
   */
  (event: 'matching-lines-change', data: CodeBlockEventData): void

  /**
   * Fired when the search query is updated.
   */
  (event: 'query-change', data: string): void

  /**
   * Fired when the filter mode is toggled.
   */
  (event: 'filter-mode-change', data: boolean): void

  /**
   * Fired when the regular expression mode is toggled.
   */
  (event: 'reg-exp-mode-change', data: boolean): void
}>()

const slots = useSlots()

const query = ref<string>(props.query)
const isProcessingInternally = ref<boolean>(false)
const isRegExpMode = ref<boolean>(props.initialRegExpMode)
const isFilterMode = ref<boolean>(props.initialFilterMode)
const regExpError = ref<Error | null>(null)
const codeBlock = ref<HTMLElement | null>(null)
const searchQuery = ref<string>(props.query)
const numberOfMatches = ref<number>(0)
const matchingLineNumbers = ref<number[]>([])
const currentLineIndex = ref<null | number>(null)

const totalLines = computed((): number[] => Array.from({ length: props.code.split('\n').length }, (_, index) => index + 1))
const maxLineNumberWidth = computed((): string => totalLines.value[totalLines.value.length - 1].toString().length + 'ch')
const linePrefix = computed((): string => props.id.toLowerCase().replace(/\s+/g, '-'))
const isProcessing = computed((): boolean => props.processing || isProcessingInternally.value)
const isShowingFilteredCode = computed((): boolean => isFilterMode.value && filteredCode.value !== '')
const filteredCode = computed((): string => {
  if (searchQuery.value === '') {
    return ''
  }

  return props.code
    .split('\n')
    .filter((_line, index) => matchingLineNumbers.value.includes(index + 1))
    .map((line) => {
      try {
        const regExp = new RegExp(searchQuery.value, 'gi')
        return line.replace(regExp, (match) => `<span class="matched-term">${match}</span>`)
      } catch {
        return line
      }
    })
    .join('\n')
})
const showCodeBlockActions = computed((): boolean => !props.singleLine && props.searchable)

// This is in the case where a user is trying to render
// HTML code, and it would render the actual tags inside
// of the code block.
const escapeUnsafeCharacters = (unescapedCodeString: string): string => {
  return unescapedCodeString.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

const finalCode = computed(() => props.singleLine ? escapeUnsafeCharacters(props.code).replaceAll('\n', '') : escapeUnsafeCharacters(props.code))

const maxHeightValue = computed(() => getSizeFromString(props.maxHeight))

watch(() => props.code, async function() {
  // Waits one Vue tick in which the code block is re-rendered. Only then does it make sense to emit the corresponding event. Otherwise, consuming components applying syntax highlighting would have to do this because if syntax highlighting is applied before re-rendering is done, re-rendering will effectively undo the syntax highlighting.
  await nextTick()

  // Changing the code causes the code block to be re-rendered.
  emitCodeBlockRenderEvent()
  updateMatchingLineNumbers()
})

watch(() => isRegExpMode.value, function() {
  // Updates the matching line numbers because the matches can be different for the same query between normal and regexp mode.
  updateMatchingLineNumbers()
})

watch(() => isShowingFilteredCode.value, async function() {
  // Moves the focus to the code block so that code block-scoped shortcuts still work. That’s necessary because toggling filter mode changes which pre element is rendered. In doing so, the currently focused element is removed from the DOM and in response, the browser moves the focus to document.body.
  if (document?.activeElement?.tagName === 'PRE') {
    codeBlock.value?.focus({ preventScroll: true })
  }

  if (!isShowingFilteredCode.value) {
  // Waits one Vue tick in which the code block is re-rendered. Only then does it make sense to emit the corresponding event. Otherwise, consuming components applying syntax highlighting would have to do this because if syntax highlighting is applied before re-rendering is done, re-rendering will effectively undo the syntax highlighting.
    await nextTick()

    // Turning off filter mode causes the full code block to be re-rendered.
    emitCodeBlockRenderEvent()
    updateMatchingLineNumbers()
  }
})

/**
 * Maps shortcuts to their associated command keywords.
 */
const keyMap: Record<string, CommandKeywords> = {
  'alt+c': 'copyCode',
  'alt+f': 'toggleFilterMode',
  'alt+g': 'toggleFilterMode',
  'alt+r': 'toggleRegExpMode',
  f3: 'jumpToNextMatch',
  'shift+f3': 'jumpToPreviousMatch',
  enter: 'jumpToNextMatch',
  'shift+enter': 'jumpToPreviousMatch',
}

/**
 * Maps command keywords to their associated commands.
 */
const commands: Record<CommandKeywords, Command> = {
  toggleFilterMode: {
    trigger: toggleFilterMode,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    shouldPreventDefaultAction: true,
  },

  toggleRegExpMode: {
    trigger: toggleRegExpMode,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    shouldPreventDefaultAction: true,
  },

  jumpToNextMatch: {
    trigger: jumpToNextMatch,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    isDisabled: () => matchingLineNumbers.value.length === 0 || isFilterMode.value,
    shouldPreventDefaultAction: true,
  },

  jumpToPreviousMatch: {
    trigger: jumpToPreviousMatch,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    isDisabled: () => matchingLineNumbers.value.length === 0 || isFilterMode.value,
    shouldPreventDefaultAction: true,
  },

  copyCode: {
    trigger: copyCode,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    shouldPreventDefaultAction: true,
  },
}

const shortcutManager = new ShortcutManager(keyMap, commands)

onMounted(function() {
  shortcutManager.registerListener()

  emitCodeBlockRenderEvent()
  updateMatchingLineNumbers()
})

onBeforeUnmount(function() {
  shortcutManager.unRegisterListener()
})

function emitCodeBlockRenderEvent(): void {
  const preElement = codeBlock.value?.querySelector('.highlighted-code-block')
  const codeElement = preElement?.querySelector('code')

  if (preElement instanceof HTMLElement && codeElement instanceof HTMLElement) {
    emit('code-block-render', getEventData(preElement, codeElement))
  }
}

function emitMatchingLinesChangeEvent(): void {
  const preElement = codeBlock.value?.querySelector('.highlighted-code-block')
  const codeElement = preElement?.querySelector('code')

  if (preElement instanceof HTMLElement && codeElement instanceof HTMLElement) {
    emit('matching-lines-change', getEventData(preElement, codeElement))
  }
}

function getEventData(preElement: HTMLElement, codeElement: HTMLElement): CodeBlockEventData {
  return {
    preElement,
    codeElement,
    code: props.code,
    language: props.language,
    query: query.value,
    matchingLineNumbers: matchingLineNumbers.value,
  }
}

function handleSearch(): void {
  // Ensures that no wasted debouncing takes place when the search input value being emitted is the same as the previous query. This also avoids unnecessarily showing the processing icon.
  if (searchQuery.value !== query.value) {
    isProcessingInternally.value = true
    debouncedHandleSearchInputValue()
  }
}

function handleSearchInputValue(): void {
  emit('query-change', searchQuery.value)
  updateMatchingLineNumbers()
}

function updateMatchingLineNumbers(): void {
  isProcessingInternally.value = true
  regExpError.value = null

  let totalMatchingLineNumbers: number[] = []

  if (searchQuery.value.length > 0) {
    try {
      totalMatchingLineNumbers = getMatchingLineNumbers(props.code.toLowerCase(), searchQuery.value.toLowerCase(), isRegExpMode.value)
    } catch (error) {
      if (error instanceof Error) {
        regExpError.value = error
      } else {
        throw error
      }
    }
  }

  currentLineIndex.value = null
  numberOfMatches.value = totalMatchingLineNumbers.length
  matchingLineNumbers.value = Array.from(new Set(totalMatchingLineNumbers))

  emitMatchingLinesChangeEvent()

  isProcessingInternally.value = false
}

function getMatchingLineNumbers(code: string, query: string, isRegExpMode: boolean): number[] {
  if (isRegExpMode) {
    return getMatchingLineNumbersByRegExp(code, query)
  } else {
    return getMatchingLineNumbersByExactMatch(code, query)
  }
}

function getMatchingLineNumbersByExactMatch(code: string, query: string): number[] {
  const totalMatchingLineNumbers: number[] = []
  let startPos = 0

  while (startPos < code.length) {
    const pos = code.indexOf(query, startPos)

    if (pos === -1) {
      break
    }

    const lineNumber = code.substring(0, pos).split('\n').length
    totalMatchingLineNumbers.push(lineNumber)

    startPos = pos + 1
  }

  return totalMatchingLineNumbers
}

function getMatchingLineNumbersByRegExp(code: string, query: string): number[] {
  const matches = code.matchAll(new RegExp(query, 'g'))
  const totalMatchingLineNumbers: number[] = []

  for (const match of Array.from(matches)) {
    if (match.index !== undefined) {
      const lineNumber = code.substring(0, match.index).split('\n').length
      totalMatchingLineNumbers.push(lineNumber)
    }
  }

  return totalMatchingLineNumbers
}

function clearQuery(): void {
  searchQuery.value = ''

  handleSearchInputValue()
}

function toggleRegExpMode(): void {
  isRegExpMode.value = !isRegExpMode.value
  emit('reg-exp-mode-change', isRegExpMode.value)

  // Resets regexp error when toggling off regexp mode.
  if (!isRegExpMode.value) {
    regExpError.value = null
  }
}

function toggleFilterMode(): void {
  isFilterMode.value = !isFilterMode.value
  emit('filter-mode-change', isFilterMode.value)
}

function jumpToNextMatch(): void {
  jumpToMatch(1)
}

function jumpToPreviousMatch(): void {
  jumpToMatch(-1)
}

function jumpToMatch(direction: number): void {
  if (matchingLineNumbers.value.length === 0 || !(codeBlock.value instanceof HTMLElement)) {
    return
  }

  if (typeof currentLineIndex.value === 'number') {
    currentLineIndex.value = ((currentLineIndex.value + direction) + matchingLineNumbers.value.length) % matchingLineNumbers.value.length
  } else {
    currentLineIndex.value = 0
  }
  const lineNumber = matchingLineNumbers.value[currentLineIndex.value]

  if (!lineNumber) {
    return
  }

  const line = codeBlock.value.querySelector(`#${linePrefix.value}-L${lineNumber}`)
  if (line instanceof HTMLElement) {
    if (typeof line.scrollIntoView === 'function') {
      line.scrollIntoView({ block: 'center' })
    }
  }
}

async function copyCode(event: Event): Promise<void> {
  const button = (event.target as Element).closest('button') as HTMLButtonElement

  const hasCopiedCodeSuccessfully = await copyTextToClipboard(props.code)
  if (hasCopiedCodeSuccessfully) {
    button.setAttribute('data-tooltip-text', 'Copied code!')

    window.setTimeout(function() {
      button.removeAttribute('data-tooltip-text')
    }, 1500)
  }
}

const getIconColor = computed(() => props.theme === 'light' ? KUI_COLOR_TEXT_NEUTRAL_STRONG : KUI_COLOR_TEXT_INVERSE)
</script>

<style lang="scss" scoped>
/* Component mixins */

@mixin kCodeBlockTypography {
  font-family: var(--kui-font-family-code, $kui-font-family-code);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  line-height: var(--kui-line-height-30, $kui-line-height-30);
}

/* Component styles */

.k-code-block {
  // light theme (treated as default)
  background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
  border-radius: var(--kui-border-radius-40, $kui-border-radius-40);

  .code-block-actions {
    border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    justify-content: space-between;
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40);

    .code-block-search-input {
      max-width: 500px;

      :deep(input) {
        background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
        box-shadow: none !important;
      }
    }

    .code-block-search-results-container {
      margin-left: var(--kui-space-auto, $kui-space-auto);

      .code-block-search-results {
        color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-20, $kui-font-size-20);
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
        line-height: var(--kui-line-height-20, $kui-line-height-20);
        white-space: nowrap;
      }
    }
  }

  .code-block-actions,
  .code-block-search-results-container,
  .code-block-search-actions {
    align-items: center;
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
  }

  .code-block-content {
    max-height: v-bind('maxHeightValue');
    overflow-y: auto;
    padding: var(--kui-space-40, $kui-space-40);
    position: relative;

    pre {
      display: grid;
      gap: var(--kui-space-60, $kui-space-60);
      grid-template-columns: v-bind('maxLineNumberWidth') 1fr; // first column for line numbers, second column for code
      margin: var(--kui-space-0, $kui-space-0);

      .line-number-rows {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        user-select: none;

        .line {
          @include kCodeBlockTypography;

          display: inline-flex;
          justify-content: flex-end;

          .line-anchor {
            color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);

            &.hide-links {
              text-decoration: none;
            }
          }

          &.line-is-match {
            .line-anchor {
              z-index: 1;
            }

            &::before {
              background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
              content: '\A0';
              left: 0;
              pointer-events: none;
              position: absolute;
              right: 0;
              transition: border $kongponentsTransitionDurTimingFunc;
              width: 100%;
            }

            &.line-is-highlighted-match {
              &::before {
                border-left: var(--kui-border-width-30, $kui-border-width-30) solid #6c7489; // TODO: token needed kui-color-border-neutral
              }
            }
          }
        }
      }

      code {
        @include kCodeBlockTypography;

        color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
        display: block;
        min-width: 0;
        overflow-x: auto;
        z-index: 1;
      }

      &.single-line {
        grid-template-columns: auto;
        padding-right: var(--kui-space-100, $kui-space-100);
      }
    }

    .code-block-secondary-actions {
      display: flex;
      gap: var(--kui-space-40, $kui-space-40);
      margin-right: var(--kui-space-40, $kui-space-40);
      margin-top: var(--kui-space-40, $kui-space-40);
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
    }
  }

  &.theme-dark {
    background-color: var(--kui-color-background-inverse, $kui-color-background-inverse);

    .code-block-actions {
      border-bottom-color: #2e3350; // TODO: token needed kui-color-border-inverse

      .code-block-search-input {
        :deep(input) {
          color: var(--kui-color-text-inverse, $kui-color-text-inverse);
        }

        .clear-query-button,
        .code-block-search-icon {
          color: var(--kui-color-text-neutral-weaker, $kui-color-text-neutral-weaker) !important;
        }

        .clear-query-button[role="button"] {
          &:hover, &:focus, &:focus-visible {
            color: var(--kui-color-text-inverse, $kui-color-text-inverse) !important;
          }
        }
      }

      .code-block-search-results {
        color: var(--kui-color-text-inverse, $kui-color-text-inverse);
      }
    }

    .code-block-content {
      pre {
        .line-number-rows {
          .line {
            .line-anchor {
              color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
            }

            &.line-is-match {
              &::before {
                background-color: #262a49; // TODO: token needed ???
              }

              &.line-is-highlighted-match {
                &::before {
                  border-left-color: var(--kui-color-border-primary-weak, $kui-color-border-primary-weak);
                }
              }
            }
          }
        }

        code {
          color: var(--kui-color-text-neutral-weaker, $kui-color-text-neutral-weaker);
        }
      }
    }
  }
}
</style>

<style lang="scss">
// needs to be unscoped, applies to both light and dark themes
.k-code-block {
  pre.filtered-code-block {
    code {
      .matched-term {
        color: var(--kui-color-text-decorative-aqua, $kui-color-text-decorative-aqua);
      }
    }
  }
}
</style>
