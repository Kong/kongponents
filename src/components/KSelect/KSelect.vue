<template>
  <div
    class="k-select"
    :class="[$attrs.class]"
  >
    <KLabel
      v-if="label"
      data-testid="select-label"
      v-bind="labelAttributes"
      :for="selectInputId"
      :required="isRequired"
    >
      {{ strippedLabel }}

      <template
        v-if="hasLabelTooltip"
        #tooltip
      >
        <slot name="label-tooltip" />
      </template>
    </KLabel>

    <KToggle v-slot="{ toggle, isToggled }">
      <KPop
        ref="popperElement"
        v-bind="boundKPopAttributes"
        close-on-popover-click
        hide-close-icon
        :offset="KUI_SPACE_40"
        @close="() => onClose(toggle, isToggled.value)"
        @open="() => onOpen(toggle)"
        @popover-click="() => onPopoverClick(toggle)"
      >
        <div
          :id="selectWrapperId"
          ref="selectWrapperElement"
          class="select-wrapper"
          data-testid="select-wrapper"
          role="listbox"
          @click="onSelectWrapperClick"
        >
          <KInput
            :id="selectInputId"
            :key="inputKey"
            ref="inputElement"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            class="select-input"
            :class="{ 'filtering-disabled': !enableFiltering, 'hide-model-value': hasCustomSelectedItem && (!enableFiltering || !isToggled.value), 'input-has-focus': inputFocused || isToggled.value }"
            data-testid="select-input"
            :disabled="isDisabled"
            :error="error"
            :model-value="filterQuery"
            :placeholder="selectedItem && !enableFiltering ? selectedItem.label : placeholderText"
            :readonly="isReadonly"
            spellcheck="false"
            v-bind="modifiedAttrs"
            @blur="onInputBlur"
            @click="onInputClick"
            @focus="onInputFocus"
            @keydown.enter="onInputEnter"
            @keypress="onInputKeypress"
            @keyup="(evt: any) => triggerFocus(evt, isToggled)"
            @keyup.enter.stop
            @update:model-value="onQueryChange"
          >
            <template
              v-if="slots.before"
              #before
            >
              <slot name="before" />
            </template>
            <template #after>
              <button
                v-if="isClearVisible"
                aria-label="Clear"
                class="clear-selection-button"
                data-testid="clear-selection-icon"
                type="button"
                @click.stop="clearSelection"
              >
                <CloseIcon decorative />
              </button>
              <ChevronDownIcon
                v-if="!isReadonly"
                class="chevron-down-icon"
                :class="{ 'disabled': isDisabled }"
                decorative
              />
            </template>
            <template
              v-if="$slots['label-tooltip']"
              #label-tooltip
            >
              <slot name="label-tooltip" />
            </template>
          </KInput>
          <Transition name="kongponents-fade-transition">
            <div
              v-if="hasCustomSelectedItem && (!enableFiltering || !isToggled.value)"
              class="custom-selected-item-wrapper"
              :class="{ 'clearable': clearable, 'readonly': isReadonly }"
            >
              <slot
                :item="selectedItem!"
                name="selected-item-template"
              >
                <slot
                  :item="selectedItem!"
                  name="item-template"
                />
              </slot>
            </div>
          </Transition>
        </div>
        <template #content>
          <div :aria-live="enableFiltering ? 'polite' : 'off'">
            <div
              v-if="enableFiltering && loading"
              class="select-loading"
              data-propagate-clicks="false"
              data-testid="select-loading"
            >
              <slot name="loading">
                <ProgressIcon
                  class="loading-icon"
                  title="Loading"
                />
              </slot>
            </div>
            <div
              v-else
              class="select-items-container"
              data-propagate-clicks="false"
            >
              <KSelectItems
                ref="kSelectItems"
                :filter-string="filterQuery"
                :item-creation-enabled="enableItemCreation && uniqueFilterQuery"
                :item-creation-valid="itemCreationValidator(filterQuery)"
                :items="filteredItems"
                @add-item="handleAddItem"
                @selected="handleItemSelect"
              >
                <template #content="{ item }">
                  <slot
                    :item="item"
                    name="item-template"
                  />
                </template>
              </KSelectItems>
              <KSelectItem
                v-if="!filteredItems.length && !$slots.empty && !enableItemCreation"
                :item="{ label: 'No results', value: 'no_results', disabled: true }"
              />
              <div
                v-if="(dropdownFooterText || $slots['dropdown-footer-text']) && dropdownFooterTextPosition === 'static'"
                class="dropdown-footer dropdown-footer-static"
              >
                <slot name="dropdown-footer-text">
                  {{ dropdownFooterText }}
                </slot>
              </div>
            </div>
            <div
              v-if="!loading && !filteredItems.length && $slots.empty"
              class="select-empty"
              data-propagate-clicks="false"
            >
              <slot name="empty" />
            </div>
          </div>
          <div
            v-if="(dropdownFooterText || $slots['dropdown-footer-text']) && dropdownFooterTextPosition === 'sticky'"
            class="dropdown-footer dropdown-footer-sticky"
          >
            <slot name="dropdown-footer-text">
              {{ dropdownFooterText }}
            </slot>
          </div>
        </template>
      </KPop>
    </KToggle>
    <p
      v-if="help"
      class="help-text"
      :class="{ 'select-error': error }"
    >
      {{ help }}
    </p>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number, U extends boolean = false">
import type { Ref } from 'vue'
import { ref, computed, watch, nextTick, useAttrs, onMounted, useId, useTemplateRef, onBeforeUnmount } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import KInput from '@/components/KInput/KInput.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle/KToggle.vue'
import KSelectItems from '@/components/KSelect/KSelectItems.vue'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'
import type {
  SelectItem,
  SelectFilterFunctionParams,
  SelectProps,
  SelectEmits,
  SelectSlots,
  PopoverAttributes,
} from '@/types'
import { ChevronDownIcon, CloseIcon, ProgressIcon } from '@kong/icons'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'
import { sanitizeInput } from '@/utilities/sanitizeInput'
import { useEventListener } from '@vueuse/core'
import { getUniqueStringId } from '@/utilities'
import { normalizeSize } from '@/utilities/css'
import { KUI_SPACE_40 } from '@kong/design-tokens'

type Value = U extends true ? T | string : T
type Item = SelectItem<Value>

defineOptions({
  inheritAttrs: false,
})

const { stripRequiredLabel } = useUtilities()

const {
  modelValue = '',
  kpopAttributes = {},
  dropdownMaxHeight = '300px',
  label = '',
  labelAttributes = {},
  width = '100%',
  placeholder = '',
  items = [],
  enableFiltering,
  filterFunction = (params: SelectFilterFunctionParams<Value>) => params.items?.filter((item: Item) => item.label?.toLowerCase().includes(params.query?.toLowerCase())),
  loading,
  clearable,
  dropdownFooterText = '',
  dropdownFooterTextPosition = 'sticky',
  reuseItemTemplate,
  enableItemCreation,
  itemCreationValidator = () => true,
  error,
  help = '',
} = defineProps<SelectProps<T, U>>()

const emit = defineEmits<SelectEmits<Value>>()

const attrs = useAttrs()
const slots = defineSlots<SelectSlots<Value>>()

const defaultId = useId()
const selectInputId = computed((): string => attrs.id ? String(attrs.id) : defaultId)

const isDropdownOpen = ref<boolean>(false)

const resizeObserver = ref<ResizeObserverHelper>()

const hasLabelTooltip = computed((): boolean => !!(labelAttributes?.info || slots['label-tooltip']))
const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const isDisabled = computed((): boolean => attrs.disabled !== undefined && String(attrs.disabled) !== 'false')
const isReadonly = computed((): boolean => attrs.readonly !== undefined && String(attrs.readonly) !== 'false')

const defaultKPopAttributes: PopoverAttributes = {
  popoverClasses: `k-select-popover select-popover ${dropdownFooterText || slots['dropdown-footer-text'] ? `has-${dropdownFooterTextPosition}-dropdown-footer` : ''}`,
  popoverTimeout: 0,
  placement: 'bottom-start',
  hideCaret: true,
}

const inputKey = ref<number>(0)
const inputRef = useTemplateRef('inputElement')

const strippedLabel = computed((): string => stripRequiredLabel(label, isRequired.value))

// sometimes (e.g. when selecting an item) we don't want to emit the query change event
const skipQueryChangeEmit = ref<boolean>(false)
const filterQuery = ref<string>('')

// whether or not filter string matches an existing item's label
const uniqueFilterQuery = computed((): boolean => {
  if (!filterQuery.value) {
    return false
  }

  if (selectItems.value?.filter((item: SelectItem) => item.label === filterQuery.value)?.length) {
    return false
  }

  return true
})

const selectWrapperId = useId() // unique id for the KPop target
const selectedItem = ref(null) as Ref<Item | null>
const selectItems = ref([]) as Ref<Item[]>
const inputFocused = ref<boolean>(false)

const popperRef = useTemplateRef('popperElement')
const selectWrapperRef = useTemplateRef('selectWrapperElement') // div element that wraps the input

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): Value | '' | null {
    return modelValue
  },
  set(newValue: Value | null): void {
    const item = selectItems.value?.filter((item: Item) => item.value === newValue)
    if (item?.length) {
      handleItemSelect(item[0]!)
    } else if (!newValue) {
      clearSelection()
    }
  },
})

const elementWidth = computed((): string => normalizeSize(width || '100%'))
const actualElementWidth = ref<string>('') // the pixel value of the element width for KPop container

const modifiedAttrs = computed(() => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})

const createKPopAttributes = computed(() => {
  return {
    ...defaultKPopAttributes,
    ...kpopAttributes,
    popoverClasses: `${defaultKPopAttributes.popoverClasses} ${kpopAttributes?.popoverClasses ?? ''}`,
    width: String(actualElementWidth.value),
    maxWidth: String(actualElementWidth.value),
    disabled: isDisabled.value || isReadonly.value,
  }
})

// Calculate the `.popover-content` max-height
const popoverContentMaxHeight = computed((): string => normalizeSize(dropdownMaxHeight))

// TypeScript complains if I bind the original object
const boundKPopAttributes = computed(() => ({ ...createKPopAttributes.value }))

const placeholderText = computed((): string => placeholder || attrs.placeholder as string || 'Select...')

const isClearVisible = computed((): boolean => !isDisabled.value && (clearable && !!selectedItem.value))

const hasCustomSelectedItem = computed((): boolean => !!(selectedItem.value &&
  (slots['selected-item-template'] || (reuseItemTemplate && slots['item-template']))))

const filteredItems = computed((): Item[] => {
  let allItems: Item[] = []

  // if filtering is not enabled or filter function returns true
  if (!enableFiltering || !filterQuery.value) {
    allItems = selectItems.value
  } else {
    const filtered = filterFunction({ query: filterQuery.value, items: selectItems.value })
    allItems = filtered === true ? selectItems.value : filtered as Item[]
  }

  // Group items by group in alphabetical order, ungrouped items first
  const ungroupedItems = allItems.filter(item => !item.group)
  const groupedItems = allItems.filter(item => item.group).sort((a, b) => a.group!.toLowerCase().localeCompare(b.group!.toLowerCase()))

  return [...ungroupedItems, ...groupedItems]
})

const onInputKeypress = (event: KeyboardEvent) => {
  // If filters are not enabled, ignore any keypresses
  if (!enableFiltering) {
    event.preventDefault()
    return false
  }
}

const onInputEnter = (e: KeyboardEvent): void => {
  if (enableItemCreation) {
    handleAddItem()
  }

  e.preventDefault()
}

const handleAddItem = (): void => {
  if (!enableItemCreation || !filterQuery.value || !uniqueFilterQuery.value || !itemCreationValidator(filterQuery.value)) {
    // do nothing if not enabled or no label or label already exists
    return
  }

  const pos = (selectItems.value?.length || 0) + 1
  const item: SelectItem<string> = {
    label: sanitizeInput(filterQuery.value),
    value: getUniqueStringId(),
    key: `${sanitizeInput(filterQuery.value).replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${pos}`,
    custom: true,
  }

  emit('item-added', item)

  handleItemSelect(item as Item, true)
  filterQuery.value = ''
}

const handleItemSelect = (item: Item, isNew?: boolean) => {
  if (isNew) {
    // if it's a new item, we need to add it to the list
    selectItems.value?.push(item)
  }

  selectItems.value?.forEach((anItem, i) => {
    if (anItem.key === item.key) {
      // select the item
      anItem.selected = true
      selectedItem.value = anItem
    } else if (anItem.selected) {
      // deselect previously selected item
      anItem.selected = false
      if (anItem.custom) {
        selectItems.value?.splice(i, 1)
        emit('item-removed', anItem as SelectItem<string>)
      }
    } else {
      anItem.selected = false
    }
  })

  skipQueryChangeEmit.value = true
  filterQuery.value = item.label
}

const clearSelection = (): void => {
  selectItems.value?.forEach((anItem, i) => {
    anItem.selected = false
    if (anItem.custom) {
      selectItems.value?.splice(i, 1)
      emit('item-removed', anItem as SelectItem<string>)
    }
  })
  selectedItem.value = null
  filterQuery.value = ''
  // this 'input' event must be emitted for v-model binding to work properly
  emit('input', null)
  emit('change', null)
  emit('update:modelValue', null)
}

const selectItemsRef = useTemplateRef('kSelectItems')

const triggerFocus = (evt: any, isToggled: Ref<boolean>): void => {
  // Ignore `esc` key
  if (evt.keyCode === 27) {
    isToggled.value = false
    return
  }

  const inputElem = selectWrapperRef.value?.children[0] as HTMLInputElement
  if (!isToggled.value && inputElem) { // simulate click to trigger dropdown open
    inputElem.click()
  }

  if ((evt.key === 'ArrowDown' || evt.key === 'ArrowUp') && isToggled.value) {
    selectItemsRef.value?.setFocus(evt.key === 'ArrowDown' ? 'down' : 'up')
  }
}

const onQueryChange = (query: string) => {
  if (filterQuery.value !== query) {
    filterQuery.value = query
  }
}

const onInputFocus = (): void => {
  inputFocused.value = true
}

const onInputBlur = (): void => {
  inputFocused.value = false
}

const onInputClick = (): void => {
  // If filtering is not enabled, the internal KInput activates the keyboard on mobile when clicked even though it's not needed.
  // This will blur the input and prevent the keyboard from activating on mobile.
  if (!enableFiltering) {
    inputRef.value?.$el?.querySelector('input')?.blur()
  }
}

const onSelectWrapperClick = (event: Event): void => {
  /**
   * The component is designed so that most of the time it propagates click events
   * so that popover component handles them properly (for example closing the dropdown when clicking outside of it or selecting an item).
   * However some container or wrapper clicks should not propagate to the popover component.
   * In cases like that we can't use always pointer-events: none; because it will disabled pointer event on children elements.
   * Instead we can give that element data-propagate-clicks="false" data property and it will be handled here.
   */
  if (isDisabled.value || (event?.target as HTMLElement)?.dataset.propagateClicks === 'false') {
    event.stopPropagation()
  }
}

const onPopoverClick = (toggle: () => void) => {
  toggle()
}

const onClose = (toggle: () => void, isToggled: boolean) => {
  isDropdownOpen.value = false

  if (selectedItem.value) {
    skipQueryChangeEmit.value = true
    filterQuery.value = selectedItem.value.label
  } else {
    filterQuery.value = ''
  }

  if (isToggled) {
    toggle()
  }
}

const onOpen = (toggle: () => void) => {
  isDropdownOpen.value = true

  if (enableFiltering) {
    filterQuery.value = ''
  }

  toggle()
}

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const item = selectItems.value?.filter((item: SelectItem) => item.value === newVal)

    if (item?.length) {
      handleItemSelect(item[0]!)
    } else if (!newVal) {
      clearSelection()
    }
  }
})

watch(() => items, (newValue, oldValue) => {
  // Only trigger the watcher if items actually change
  if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
    return
  }

  selectItems.value = JSON.parse(JSON.stringify(items))

  // drop selected item value to find the selected item in the new list
  // unless items is empty
  if (selectItems.value?.length) {
    selectedItem.value = null
  }

  for (let i = 0; i < selectItems.value?.length; i++) {
    // Ensure each item has a selected property
    if (selectItems.value[i]!.selected === undefined) {
      selectItems.value[i]!.selected = false
    }

    // ensure each item has a unique key property
    let selectItemKey = `${selectItems.value[i]!.label?.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${i}`
    if (selectItemKey.includes('undefined')) {
      selectItemKey = `select-item-label-${i}`
    }

    selectItems.value[i]!.key = selectItemKey
    if (selectItems.value[i]!.value === modelValue || selectItems.value[i]!.selected) {
      selectItems.value[i]!.selected = true
      selectedItem.value = selectItems.value[i]!

      if (!inputFocused.value) {
        skipQueryChangeEmit.value = true
        filterQuery.value = selectedItem.value.label
      }
    }

    if (selectedItem.value?.value === selectItems.value[i]!.value) {
      selectItems.value[i]!.selected = true
    }
  }

  // Trigger an update to the popper element to cause the popover to redraw
  // This prevents the popover from displaying "detached" from the KSelect
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (popperRef.value && typeof popperRef.value.updatePopper === 'function') {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popperRef.value.updatePopper()
    })
  }
}, { deep: true, immediate: true })

watch(filterQuery, (query: string) => {
  // skip emitting query change when the query is the selected item's label
  if (skipQueryChangeEmit.value && query) {
    return
  }

  emit('query-change', query)
  skipQueryChangeEmit.value = false
})

watch(selectedItem, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    emit('selected', newVal)
    // this 'input' event must be emitted for v-model binding to work properly
    emit('input', newVal.value)
    emit('change', newVal)
    emit('update:modelValue', newVal.value)
  }
}, { deep: true })

onMounted(() => {
  if (selectWrapperRef.value) {
    resizeObserver.value = ResizeObserverHelper.create(() => {
      actualElementWidth.value = `${selectWrapperRef.value?.offsetWidth}px`
    })

    resizeObserver.value.observe(selectWrapperRef.value as HTMLDivElement)
  }

  useEventListener(document, 'keydown', (event: any) => {
    // When enableFiltering is false, the KInput doesn't have focus so we need to handle arrow key events here
    if (!enableFiltering && document.activeElement?.tagName === 'BODY' && !inputFocused.value && isDropdownOpen.value) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()

        selectItemsRef.value?.setFocus(event.key === 'ArrowDown' ? 'down' : 'up')
      }
    }
  })
})

onBeforeUnmount(() => {
  if (selectWrapperRef.value) {
    resizeObserver.value?.unobserve(selectWrapperRef.value)
  }
})
</script>

<style lang="scss" scoped>
/* Component variables */

$kSelectInputPaddingX: var(--kui-space-50, $kui-space-50); // corresponds to mixin, search for variable name in mixins
$kSelectInputPaddingY: var(--kui-space-40, $kui-space-40); // corresponds to mixin
$kSelectInputIconSize: var(--kui-icon-size-40, $kui-icon-size-40); // corresponds to value in KInput.vue
$kSelectInputSlotSpacing: var(--kui-space-40, $kui-space-40); // corresponds to value in KInput.vue
$kSelectInputHelpTextHeight: calc(var(--kui-line-height-20, $kui-line-height-20)); // corresponds to mixin

/* Component styles */

.k-select {
  display: flex;
  flex-direction: column;
  width: v-bind('elementWidth');

  .select-wrapper {
    position: relative;
    width: 100%;
  }

  .select-input {
    &.filtering-disabled {
      :deep(input:not([disabled])) {
        caret-color: transparent !important;
        cursor: pointer;

        &::selection {
          background-color: transparent;
        }
      }
    }

    &.hide-model-value {
      :deep(input) {
        color: transparent !important;

        &::placeholder {
          color: transparent !important;
        }

        &::selection {
          background-color: transparent;
        }
      }
    }

    &.input-has-focus {
      :deep(input:not([readonly]):not([disabled])) {
        @include inputFocus;
      }
    }
  }

  .chevron-down-icon {
    &.disabled {
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
    }
  }

  .custom-selected-item-wrapper {
    @include selectItemDefaults;

    box-sizing: border-box;
    inset: 0;
    margin-left: $kSelectInputPaddingX;
    // accommodate for the caret
    max-width: calc(v-bind('actualElementWidth') - $kSelectInputPaddingX - $kSelectInputIconSize - ($kSelectInputSlotSpacing * 2));
    overflow: hidden;
    padding: var(--kui-space-0, $kui-space-0); // override mixin
    pointer-events: none;
    position: absolute;
    white-space: nowrap;

    &.readonly {
      // accommodate for **no** caret
      max-width: calc(v-bind('actualElementWidth') - $kSelectInputPaddingX - ($kSelectInputSlotSpacing * 2));
    }

    :deep(#{$kongponentsKongIconSelector}) {
      // make sure the icon doesn't shrink when text is too long
      flex-shrink: 0;
      height: $kSelectInputIconSize !important;
      width: $kSelectInputIconSize !important;
    }

    &.clearable {
      // accommodate for the clear icon and caret
      max-width: calc(v-bind('actualElementWidth') - ($kSelectInputPaddingX * 2) - ($kSelectInputIconSize * 2) - $kSelectInputSlotSpacing);
    }
  }

  .select-loading,
  .select-empty {
    @include selectItemDefaults;

    .loading-icon {
      margin: var(--kui-space-0, $kui-space-0) var(--kui-space-auto, $kui-space-auto);
    }
  }

  .dropdown-footer {
    align-items: center;
    background-color: var(--kui-color-background, $kui-color-background);
    border-bottom-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    border-bottom-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    bottom: 0;
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    display: flex;
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    gap: var(--kui-space-30, $kui-space-30);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    padding: var(--kui-space-50, $kui-space-50);
    pointer-events: none;
    position: sticky;

    &-static {
      position: static;
    }
  }

  .help-text {
    @include inputHelpText;

    // reset default margin from browser
    margin: 0;
    margin-top: var(--kui-space-40, $kui-space-40) !important; // need important to override some overrides of default p margin in other components

    &.select-error {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }
  }

  .clear-selection-button {
    @include defaultButtonReset;
  }
}
</style>

<style lang="scss">
.k-select-popover.select-popover {
  .select-items-container {
    max-height: v-bind('popoverContentMaxHeight');
    overflow-y: auto;
  }

  &.popover .popover-container {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-0, $kui-space-0);

    &.has-sticky-dropdown-footer, &.has-static-dropdown-footer {
      padding-bottom: var(--kui-space-0, $kui-space-0);
    }
  }
}
</style>
