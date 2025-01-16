<template>
  <div
    :id="id"
    ref="codeBlock"
    class="k-code-block"
    :class="[`theme-${theme}`]"
    data-testid="k-code-block"
    tabindex="-1"
    @blur="currentLineIndex = null"
  >
    <div
      v-if="showCodeBlockActions"
      class="code-block-actions"
    >
      <KInput
        v-model="searchQuery"
        aria-label="Search"
        autocomplete="off"
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
            <button
              v-if="searchQuery"
              aria-label="Clear query"
              class="clear-query-button"
              data-testid="clear-query-button"
              title="Clear query"
              type="button"
              @click="clearQuery"
            >
              <CloseIcon decorative />
            </button>
            <SearchIcon
              v-else
              class="code-block-search-icon"
              decorative
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
              title="Loading"
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
        <KCodeBlockIconButton
          :active="isRegExpMode"
          :aria-label="`Use regular expression (${ALT_SHORTCUT_LABEL}+R)`"
          :aria-pressed="isRegExpMode"
          class="regexp-mode-button"
          data-testid="regexp-mode-button"
          :theme="theme"
          :title="`Use regular expression (${ALT_SHORTCUT_LABEL}+R)`"
          @click="toggleRegExpMode"
        >
          <RegexIcon decorative />
        </KCodeBlockIconButton>

        <KCodeBlockIconButton
          :active="isFilterMode"
          :aria-label="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
          :aria-pressed="isFilterMode"
          class="action-button filter-mode-button"
          data-testid="filter-mode-button"
          :theme="theme"
          :title="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
          @click="toggleFilterMode"
        >
          <FilterIcon decorative />
        </KCodeBlockIconButton>

        <KCodeBlockIconButton
          aria-label="Previous match (Shift+F3)"
          class="previous-match-button"
          data-testid="previous-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          :theme="theme"
          title="Previous match (Shift+F3)"
          @click="jumpToPreviousMatch"
        >
          <ArrowUpIcon decorative />
        </KCodeBlockIconButton>

        <KCodeBlockIconButton
          aria-label="Next match (F3)"
          class="next-match-button"
          data-testid="next-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          :theme="theme"
          title="Next match (F3)"
          @click="jumpToNextMatch"
        >
          <ArrowDownIcon decorative />
        </KCodeBlockIconButton>
      </div>
    </div>

    <div
      ref="codeBlockContent"
      class="code-block-content"
    >
      <!--
        This was moved up before the lines because 1Password's (yes, 1Password!) heuristics will cause a delay because
        it will walk through all line number elements one by one to calculate layout metrics, this will cause the
        browser to schedule layout recalculations after each element is processed.
        Though we are using virtual scrolling now, this still helps with the overall performance.
      -->
      <div
        v-if="showCopyButton || slots['secondary-actions']"
        class="secondary-actions-wrapper"
      >
        <div class="code-block-secondary-actions">
          <KCodeBlockIconButton
            v-if="showCopyButton"
            :aria-label="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
            class="code-block-copy-button"
            :copy-tooltip="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
            data-testid="code-block-copy-button"
            :theme="theme"
            @click="copyCode"
          >
            <CopyIcon decorative />
          </KCodeBlockIconButton>

          <slot name="secondary-actions" />
        </div>
      </div>

      <!--
        Instead of using <pre> directly, the <component is="pre"> here acts as a workaround for
        a potential bug of Vue itself. Because the <Virtualizer> fails to render its scoped slots
        when it's wrapped inside a <pre> element.
      -->
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component
        is="pre"
        v-if="isShowingFilteredCode || hasRenderedFilteredCode"
        v-show="isShowingFilteredCode"
        class="filtered-code-block"
        data-testid="filtered-code-block"
      >
        <Virtualizer
          v-if="!singleLine"
          v-slot="{ item: line }"
          v-bind="getVirtualizerProps(true)"
        >
          <a
            :id="getLineId(line)"
            class="line-anchor"
            :href="showLineNumberLinks ? `#${getLineId(line)}` : undefined"
          >{{ line }}</a>
        </Virtualizer>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <code v-html="filteredCode" />
      </component>

      <!-- eslint-disable-next-line vue/require-component-is -->
      <component
        is="pre"
        v-if="!isShowingFilteredCode || hasRenderedCode"
        v-show="!isShowingFilteredCode"
        class="highlighted-code-block"
        :class="{
          'single-line': singleLine
        }"
        data-testid="highlighted-code-block"
      >
        <Virtualizer
          v-if="!singleLine"
          ref="codeBlockLineNumbers"
          v-slot="{ item: line }"
          v-bind="getVirtualizerProps(false)"
        >
          <a
            :id="getLineId(line)"
            class="line-anchor"
            :class="{ 'hide-links': !showLineNumberLinks }"
            :href="showLineNumberLinks ? `#${getLineId(line)}` : undefined"
          >{{ line }}</a>
        </Virtualizer>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <code v-html="finalCode" />
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, nextTick, normalizeClass, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { Virtualizer } from 'virtua/vue'
import { debounce } from 'lodash-es'
import KInput from '@/components/KInput/KInput.vue'
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'
import type { Command } from '@/utilities/ShortcutManager'
import { ShortcutManager } from '@/utilities/ShortcutManager'
import {
  buildLineOffsets,
  escapeHTMLIfNeeded,
  getMatchingLineNumbers,
  highlightMatchingChars,
  LINE_NUMBER_EXPRESSION_REGEX,
  normalizeHighlightedLines,
} from '@/utilities/codeBlockHelpers'
import type { CodeBlockEventData, CommandKeywords, Theme } from '@/types'
import useUtilities from '@/composables/useUtilities'
import { CopyIcon, SearchIcon, ProgressIcon, CloseIcon, RegexIcon, FilterIcon, ArrowUpIcon, ArrowDownIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_NEUTRAL_STRONG, KUI_ICON_SIZE_30, KUI_LINE_HEIGHT_30 } from '@kong/design-tokens'
import KCodeBlockIconButton from './KCodeBlockIconButton.vue'

const { getSizeFromString } = useUtilities()

const IS_MAYBE_MAC = typeof navigator !== 'undefined' &&
  ('userAgentData' in navigator && navigator.userAgentData === 'macOS' ||
    navigator.platform.toLowerCase().includes('mac'))
const ALT_SHORTCUT_LABEL = IS_MAYBE_MAC ? 'Option' : 'Alt'

// Debounces the search handler which ensures that we don’t trigger several searches while the user is still typing.
// Use Lodash’s debounce function as it supports leading and trailing options.
// Adding `leading: true` to the options ensures that the search is triggered immediately when the user types the first character,
// making the search feel more responsive.
const debouncedHandleSearchInputValue = debounce(handleSearchInputValue, 150, { leading: true, trailing: true })

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
   * The line numbers for the lines to highlight by default. **Default: `[]`**.
   */
  highlightedLineNumbers: {
    type: [String, Array] as PropType<string | (number | [number, number])[]>,
    default: () => [],
    validator: (value: string | (number | [number, number])[]): boolean => {
      if (typeof value === 'string') {
        return LINE_NUMBER_EXPRESSION_REGEX.test(value)
      }

      if (Array.isArray(value)) {
        return value.every((line) => {
          if (Array.isArray(line)) {
            return line.length === 2 && line.every((number) => typeof number === 'number')
          }

          return typeof line === 'number'
        })
      }

      return false
    },
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

const slots = defineSlots<{
  /**
   * Additional actions to be displayed in the code block.
   */
  'secondary-actions': void
}>()

const query = ref<string>(props.query)
const isProcessingInternally = ref<boolean>(false)
const isRegExpMode = ref<boolean>(props.initialRegExpMode)
const isFilterMode = ref<boolean>(props.initialFilterMode)
const regExpError = ref<Error | null>(null)
const searchQuery = ref<string>(props.query)
const numberOfMatches = ref<number>(0)
const matchingLineNumbers = ref<number[]>([])
const currentLineIndex = ref<null | number>(null)

const codeBlock = useTemplateRef('codeBlock')
const codeBlockContent = useTemplateRef('codeBlockContent')
const codeBlockLineNumbers = useTemplateRef('codeBlockLineNumbers')

// If either original code or filtered code is ever rendered, keep them in the DOM
// to avoid re-rendering them when switching between filtered and original code.
// This makes the transition between the two states smoother.
const hasRenderedCode = ref<boolean>(false)
const hasRenderedFilteredCode = ref<boolean>(false)

// For checking if a line is highlighted in constant time.
const matchingLineSet = computed(() => new Set(matchingLineNumbers.value))
const totalLines = computed((): number[] => Array.from({ length: props.code?.split('\n').length }, (_, index) => index + 1))
const maxLineNumberWidth = computed((): string => totalLines.value[totalLines.value.length - 1].toString().length + 'ch')
const isProcessing = computed((): boolean => props.processing || isProcessingInternally.value)
const isShowingFilteredCode = computed((): boolean => isFilterMode.value && filteredCode.value !== '')

const linePrefix = computed((): string => props.id.toLowerCase().replace(/\s+/g, '-'))
function getLineId(line: number): string {
  return `${linePrefix.value}-L${line}`
}

// Cache the line offsets to avoid recalculating them on every search.
const lineOffsets = computed(() => buildLineOffsets(props.code))

const filteredCode = computed((): string => {
  if (searchQuery.value === '' || matchingLineNumbers.value.length === 0) {
    return ''
  }

  const filtered = props.code?.split('\n')
    .filter((_, index) => matchingLineSet.value.has(index + 1))
    .join('\n')

  return highlightMatchingChars(filtered, searchQuery.value, isRegExpMode.value)
})
const showCodeBlockActions = computed((): boolean => !props.singleLine && props.searchable)

// The final code to be rendered in the code block, needs to be escaped so that
// we can safely render it as `v-html`.
const finalCode = computed(() =>
  props.singleLine
    ? escapeHTMLIfNeeded(props.code).replaceAll('\n', '')
    : escapeHTMLIfNeeded(props.code),
)

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

watch(() => props.highlightedLineNumbers, function() {
  setDefaultMatchingLineNumbers()
}, { immediate: true, deep: true })

watch(() => isShowingFilteredCode.value, function(value) {
  // Moves the focus to the code block so that code block-scoped shortcuts still work. That’s necessary because toggling filter mode changes which pre element is rendered. In doing so, the currently focused element is removed from the DOM and in response, the browser moves the focus to document.body.
  if (document?.activeElement?.tagName === 'PRE') {
    codeBlock.value?.focus({ preventScroll: true })
  }

  // Records that the filtered code has been rendered at least once.
  hasRenderedFilteredCode.value = hasRenderedFilteredCode.value || value
  hasRenderedCode.value = hasRenderedCode.value || !value

  if (codeBlockContent.value) {
    codeBlockContent.value.scrollTop = 0
  }
}, { immediate: true })

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

  if (!props.query && props.highlightedLineNumbers.length) {
    setDefaultMatchingLineNumbers()
  } else {
    updateMatchingLineNumbers()
  }
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

async function handleSearchInputValue(): Promise<void> {
  // As we have a debounced version of this function and we are accessing searchQuery.value inside it,
  // we need to ensure the leading callback can access the latest value by waiting for an extra tick.
  await nextTick()
  emit('query-change', searchQuery.value)
  updateMatchingLineNumbers()
}

function setDefaultMatchingLineNumbers(): void {
  isProcessingInternally.value = true
  regExpError.value = null

  matchingLineNumbers.value = normalizeHighlightedLines(props.highlightedLineNumbers, totalLines.value.length)
  numberOfMatches.value = matchingLineNumbers.value.length

  emitMatchingLinesChangeEvent()

  isProcessingInternally.value = false
}

function updateMatchingLineNumbers(): void {
  isProcessingInternally.value = true
  regExpError.value = null

  let totalMatchingLineNumbers: number[] = []

  if (searchQuery.value.length > 0) {
    try {
      totalMatchingLineNumbers = getMatchingLineNumbers(
        props.code.toLowerCase(),
        searchQuery.value.toLowerCase(),
        isRegExpMode.value,
        lineOffsets.value,
      )
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

  const line = codeBlock.value.querySelector<HTMLElement>(`#${getLineId(lineNumber)}`)
  if (line) {
    if ('scrollIntoViewIfNeeded' in line && typeof line.scrollIntoViewIfNeeded === 'function') {
      line.scrollIntoViewIfNeeded(true)
    } else {
      line.scrollIntoView({ block: 'nearest' })
    }
  } else {
    if (codeBlockLineNumbers.value) {
      codeBlockLineNumbers.value.scrollToIndex(lineNumber - 1, { align: 'center' })
    }
  }
}

async function copyCode(event: Event): Promise<void> {
  const button = (event.target as Element).closest('button') as HTMLButtonElement

  const hasCopiedCodeSuccessfully = await copyTextToClipboard(props.code)

  if (hasCopiedCodeSuccessfully) {
    button?.setAttribute('data-tooltip-text', 'Copied code!')

    window?.setTimeout(function() {
      button?.removeAttribute('data-tooltip-text')
    }, 1500)
  }
}

const getIconColor = computed(() => props.theme === 'light' ? KUI_COLOR_TEXT_NEUTRAL_STRONG : KUI_COLOR_TEXT_INVERSE)

type VirtualizerProps = InstanceType<typeof Virtualizer>['$props']

// props definition see https://github.com/inokawa/virtua/blob/7539c2a0aa279f4c2be6eb6c268344e22404df11/src/vue/Virtualizer.tsx#L84-L141
function getVirtualizerProps(filtered: boolean): VirtualizerProps {
  return {
    // These props essentially renders a structure like this:
    //
    // <span class="line-number-rows">
    //  <span class="line">...line number anchor...</span>
    // </span>
    as: 'span',
    class: 'line-number-rows',
    data: filtered ? matchingLineNumbers.value : totalLines.value,
    item: 'span',
    itemProps: ({ item: line }) => ({
      class: normalizeClass({
        line: true,
        'line-is-match': filtered ? false : matchingLineSet.value.has(line),
        'line-is-highlighted-match': filtered ? false : currentLineIndex.value !== null && line === matchingLineNumbers.value[currentLineIndex.value],
      }),
    }),

    // slightly increase the number of items to render to avoid blank items when scrolling fast
    overscan: 8,

    // provide a fixed item height so that Virtualizer can skip estimation
    itemSize: parseInt(KUI_LINE_HEIGHT_30, 10),

    // the scrollable container isn't the parentElement so we need to manually provide it
    scrollRef: codeBlockContent.value ?? undefined,

    // to override the default `position: relative; width: 100%`.
    style: {
      position: 'absolute',
      width: 'auto',
    },
  }
}
</script>

<style lang="scss" scoped>
/* Component variables */

// background color for the matching line (search or filter) in dark theme
$kCodeBlockDarkLineMatchBackgroundColor: rgba(255, 255, 255, 0.12); // we don't have a token for this

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

    @media (min-width: $kui-breakpoint-laptop) {
      .secondary-actions-wrapper {
        opacity: 0;
        transition: opacity $kongponentsTransitionDurTimingFunc, border $kongponentsTransitionDurTimingFunc;
      }

      .secondary-actions-wrapper:focus-within,
      &:hover .secondary-actions-wrapper {
        opacity: 1;
      }
    }

    .secondary-actions-wrapper {
      height: 100%;
      position: sticky;
      right: 0px;
      top: 0px;
      z-index: 2;

      .code-block-secondary-actions {
        display: flex;
        gap: var(--kui-space-40, $kui-space-40);
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    pre {
      display: grid;
      margin: var(--kui-space-0, $kui-space-0);
      min-height: 32px; // ensures that scroll bar doesn't show up when there's only one line of content (not to confuse with single line mode)
      position: relative;

      &:not(.single-line) {
        display: flex;
        padding-left: calc(v-bind('maxLineNumberWidth') + var(--kui-space-60, $kui-space-60));
      }

      .line-number-rows {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
        left: calc(var(--kui-space-40, $kui-space-40) * -1);
        position: absolute;
        /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
        right: calc(var(--kui-space-40, $kui-space-40) * -1);
        top: 0;
        user-select: none;

        // Lines are rendered by Virtualizer now
        :deep(.line) {
          @include codeTypography;
          display: flex;
          padding-left: var(--kui-space-40, $kui-space-40);

          .line-anchor {
            color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
            text-align: right;
            width: v-bind('maxLineNumberWidth');

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
              transition: border $kongponentsTransitionDurTimingFunc;
              width: 100%;
            }

            &.line-is-highlighted-match {
              &::before {
                border-left: var(--kui-border-width-30, $kui-border-width-30) solid var(--kui-color-border-primary, $kui-color-border-primary);
              }
            }
          }
        }
      }

      code {
        @include codeTypography;

        color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
        display: block;
        min-width: 0;
        overflow-x: auto;
        z-index: 1;
      }

      &.single-line {
        padding-right: var(--kui-space-100, $kui-space-100);

        code {
          line-height: var(--kui-line-height-60, $kui-line-height-60);
        }
      }
    }
  }

  &.theme-dark {
    background-color: var(--kui-color-background-inverse, $kui-color-background-inverse);
    // This improves scrollbar styles in dark mode
    color-scheme: dark;

    .code-block-actions {
      border-bottom-color: var(--kui-color-border-inverse, $kui-color-border-inverse);

      .code-block-search-input {
        :deep(input) {
          color: var(--kui-color-text-inverse, $kui-color-text-inverse);

          &::placeholder {
            color: var(--kui-color-text-neutral-weaker, $kui-color-text-neutral-weaker);
          }
        }

        .clear-query-button,
        .code-block-search-icon {
          color: var(--kui-color-text-neutral-weaker, $kui-color-text-neutral-weaker) !important;
        }

        // Sadly we need this to beat the specificity set by KInput for now
        .clear-query-button:not([disabled]) {
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
          :deep(.line) {
            .line-anchor {
              color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
            }

            &.line-is-match {
              &::before {
                background-color: $kCodeBlockDarkLineMatchBackgroundColor;
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

  .matched-term {
    background-color: transparent;
  }
}
</style>
