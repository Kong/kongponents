<template>
  <div
    class="k-select"
    :class="[$attrs.class]"
  >
    <KLabel
      v-if="label"
      ref="labelElement"
      v-bind="labelAttributes"
      data-testid="select-label"
      :for="$attrs.id ? String($attrs.id) : undefined"
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
        @close="() => onClose(toggle, isToggled.value)"
        @open="() => onOpen(toggle)"
        @popover-click="() => onPopoverClick(toggle)"
      >
        <div
          ref="selectWrapperElement"
          v-bind-once="{ id: selectWrapperId }"
          class="select-wrapper"
          data-testid="select-wrapper"
          role="listbox"
          @click="onSelectWrapperClick"
        >
          <KInput
            :key="inputKey"
            ref="inputElement"
            autocapitalize="off"
            autocomplete="off"
            class="select-input"
            :class="{ 'filtering-disabled': !enableFiltering, 'hide-model-value': hasCustomSelectedItem && (!enableFiltering || !isToggled.value), 'input-has-focus': inputFocused || isToggled.value }"
            data-testid="select-input"
            :disabled="isDisabled"
            :error="error"
            :model-value="filterQuery"
            :placeholder="selectedItem && !enableFiltering ? selectedItem.label : placeholderText"
            :readonly="isReadonly"
            v-bind="attrs.id ? { id: String(attrs.id), ...modifiedAttrs } : { ...modifiedAttrs }"
            @blur="onInputBlur"
            @click="onInputClick"
            @focus="onInputFocus"
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
                @click="clearSelection"
              >
                <CloseIcon decorative />
              </button>
              <ChevronDownIcon
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
              :class="{ 'clearable': clearable }"
            >
              <slot
                :item="selectedItem"
                name="selected-item-template"
              >
                <slot
                  :item="selectedItem"
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
                :items="filteredItems"
                @selected="handleItemSelect"
              >
                <template #content="{ item }">
                  <slot
                    class="select-item-label select-item-desc"
                    :item="item"
                    name="item-template"
                  />
                </template>
              </KSelectItems>
              <KSelectItem
                v-if="!filteredItems.length && !$slots.empty && !enableItemCreation"
                :item="{ label: 'No results', value: 'no_results', disabled: true }"
              />
              <KSelectItem
                v-if="!filteredItems.length && uniqueFilterQuery && !$slots.empty && enableItemCreation"
                key="select-add-item"
                class="select-add-item"
                data-testid="select-add-item"
                :item="{ label: `${filterQuery} (Add new value)`, value: 'add_item', disabled: !itemCreationValidator(filterQuery) }"
                @selected="handleAddItem"
              >
                <template #content>
                  <div class="select-item-description">
                    {{ filterQuery }}
                    <span class="select-item-new-indicator">(Add new value)</span>
                  </div>
                </template>
              </KSelectItem>
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

<script setup lang="ts">
import type { Ref, PropType } from 'vue'
import { ref, computed, watch, nextTick, useAttrs, useSlots, onUnmounted, onMounted } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import KInput from '@/components/KInput/KInput.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KSelectItems from '@/components/KSelect/KSelectItems.vue'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'
import type {
  PopPlacements,
  SelectItem,
  SelectFilterFunctionParams,
  SelectDropdownFooterTextPosition,
} from '@/types'
import { ChevronDownIcon, CloseIcon, ProgressIcon } from '@kong/icons'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'
import { sanitizeInput } from '@/utilities/sanitizeInput'
import useUniqueId from '@/composables/useUniqueId'
import { useEventListener } from '@vueuse/core'

defineOptions({
  inheritAttrs: false,
})

const { getSizeFromString, stripRequiredLabel } = useUtilities()

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  kpopAttributes: {
    type: Object,
    default: () => ({
      popoverClasses: '',
    }),
  },
  dropdownMaxHeight: {
    type: String,
    default: '300',
  },
  label: {
    type: String,
    default: '',
  },
  labelAttributes: {
    type: Object,
    default: () => ({}),
  },
  /**
   * The width of the select and popover's min-width
   */
  width: {
    type: String,
    default: '100%',
  },
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * Items are JSON objects with required 'label' and 'value'
   * {
   *  label: 'Item 1',
   *  value: 'item1'
   * }
   */
  items: {
    type: Array as PropType<SelectItem[]>,
    required: false,
    default: () => [],
    // Items must have a label & value
    validator: (items: SelectItem[]) => !items.length || items.every(i => i.label !== undefined && i.value !== undefined),
  },
  /**
   * Control whether the input supports filtering.
   */
  enableFiltering: {
    type: Boolean,
    default: false,
  },
  /**
   * Override default filter functionality of case-insensitive search on label
   */
  filterFunction: {
    type: Function as PropType<(params: SelectFilterFunctionParams) => SelectItem[] | boolean>,
    default: (params: SelectFilterFunctionParams) => params?.items?.filter((item: SelectItem) => item.label?.toLowerCase().includes(params.query?.toLowerCase())),
  },
  /**
   * Loading state in autosuggest
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * A flag for clearing selection
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * Dropdown footer text
   */
  dropdownFooterText: {
    type: String,
    default: '',
  },
  /**
   * Dropdown footer text position
   * Accepted values: 'sticky' and 'static'
   */
  dropdownFooterTextPosition: {
    type: String as PropType<SelectDropdownFooterTextPosition>,
    default: 'sticky',
  },
  /**
   * If true and item-template is passed, will display item-template content inside selected-slot-template
   */
  reuseItemTemplate: {
    type: Boolean,
    default: false,
  },
  /**
   * Allow creating new items
   */
  enableItemCreation: {
    type: Boolean,
    default: false,
  },
  /**
   * Validator function for item creation.
   */
  itemCreationValidator: {
    type: Function,
    default: () => true,
  },
  error: {
    type: Boolean,
    default: false,
  },
  help: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'selected', item: SelectItem): void
  (e: 'input', value: string | number | null): void
  (e: 'change', item: SelectItem | null): void
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'query-change', query: string): void
  (e: 'item-added', value: SelectItem): void
  (e: 'item-removed', value: SelectItem): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const isDropdownOpen = ref<boolean>(false)

const resizeObserver = ref<ResizeObserverHelper>()

const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.info || slots['label-tooltip']))
const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const isDisabled = computed((): boolean => attrs.disabled !== undefined && String(attrs.disabled) !== 'false')
const isReadonly = computed((): boolean => attrs.readonly !== undefined && String(attrs.readonly) !== 'false')

const defaultKPopAttributes = {
  popoverClasses: `select-popover ${props.dropdownFooterText || slots['dropdown-footer-text'] ? `has-${props.dropdownFooterTextPosition}-dropdown-footer` : ''}`,
  popoverTimeout: 0,
  placement: 'bottom-start' as PopPlacements,
  hideCaret: true,
}

const inputKey = ref<number>(0)
const inputElement = ref<InstanceType<typeof KInput> | null>(null)
const labelElement = ref<InstanceType<typeof KLabel> | null>(null)

const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))

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

const selectWrapperId = useUniqueId() // unique id for the KPop target
const selectedItem = ref<SelectItem | null>(null)
const selectItems = ref<SelectItem[]>([])
const inputFocused = ref<boolean>(false)

const popperElement = ref<HTMLElement>()
const selectWrapperElement = ref<HTMLDivElement>() // div element that wraps the input

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): string | number {
    return props.modelValue
  },
  set(newValue: string | number): void {
    const item = selectItems.value?.filter((item: SelectItem) => item.value === newValue)
    if (item?.length) {
      handleItemSelect(item[0])
    } else if (!newValue) {
      clearSelection()
    }
  },
})

const elementWidth = computed((): string => getSizeFromString(props.width || '100%'))
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
    ...props.kpopAttributes,
    popoverClasses: `${defaultKPopAttributes.popoverClasses} ${props.kpopAttributes.popoverClasses}`,
    width: String(actualElementWidth.value),
    maxWidth: String(actualElementWidth.value),
    disabled: isDisabled.value || isReadonly.value,
  }
})

// Calculate the `.popover-content` max-height
const popoverContentMaxHeight = computed((): string => getSizeFromString(props.dropdownMaxHeight))

// TypeScript complains if I bind the original object
const boundKPopAttributes = computed(() => ({ ...createKPopAttributes.value }))

const placeholderText = computed((): string => props.placeholder || attrs.placeholder as string || 'Select...')

const isClearVisible = computed((): boolean => !isDisabled.value && (props.clearable && !!selectedItem.value))

const hasCustomSelectedItem = computed((): boolean => !!(selectedItem.value &&
  (slots['selected-item-template'] || (props.reuseItemTemplate && slots['item-template']))))

const filteredItems = computed((): SelectItem[] => {
  let allItems: SelectItem[] = []

  // if filtering is not enabled or filter function returns true
  if (!props.enableFiltering || props.filterFunction({ query: filterQuery.value, items: selectItems.value }) === true) {
    allItems = selectItems.value
  } else {
    allItems = props.filterFunction({ query: filterQuery.value, items: selectItems.value }) as SelectItem[]
  }

  // Group items by group in alphabetical order, ungrouped items first
  const ungroupedItems = allItems.filter(item => !item.group)
  const groupedItems = allItems.filter(item => item.group).sort((a, b) => a.group!.toLowerCase().localeCompare(b.group!.toLowerCase()))

  return [...ungroupedItems, ...groupedItems]
})

const onInputKeypress = (event: Event) => {
  // If filters are not enabled, ignore any keypresses
  if (!props.enableFiltering) {
    event.preventDefault()
    return false
  }
}

const handleAddItem = (): void => {
  if (!props.enableItemCreation || !filterQuery.value || !uniqueFilterQuery.value || !props.itemCreationValidator(filterQuery.value)) {
    // do nothing if not enabled or no label or label already exists
    return
  }

  const pos = (selectItems.value?.length || 0) + 1
  const item: SelectItem = {
    label: sanitizeInput(filterQuery.value),
    value: useUniqueId(),
    key: `${sanitizeInput(filterQuery.value).replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${pos}`,
    custom: true,
  }

  emit('item-added', item)

  handleItemSelect(item, true)
  filterQuery.value = ''
}

const handleItemSelect = (item: SelectItem, isNew?: boolean) => {
  if (isNew) {
    // if it's a new item, we need to add it to the list
    selectItems.value?.push(item)
  }

  selectItems.value?.forEach((anItem, i) => {
    if (anItem.key === item.key) {
      // select the item
      anItem.selected = true
      anItem.key = anItem?.key?.includes('-selected') ? anItem.key : `${anItem.key}-selected`
      selectedItem.value = anItem
    } else if (anItem.selected) {
      // deselect previously selected item
      anItem.selected = false
      anItem.key = anItem?.key?.replace(/-selected/gi, '')
      if (anItem.custom) {
        selectItems.value?.splice(i, 1)
        emit('item-removed', anItem)
      }
    } else {
      anItem.selected = false
    }
  })

  filterQuery.value = item.label
}

const clearSelection = (): void => {
  selectItems.value?.forEach((anItem, i) => {
    anItem.selected = false
    anItem.key = anItem?.key?.replace(/-selected/gi, '')
    if (anItem.custom) {
      selectItems.value?.splice(i, 1)
      emit('item-removed', anItem)
    }
  })
  selectedItem.value = null
  filterQuery.value = ''
  // this 'input' event must be emitted for v-model binding to work properly
  emit('input', null)
  emit('change', null)
  emit('update:modelValue', null)
}

const kSelectItems = ref<InstanceType<typeof KSelectItems> | null>(null)

const triggerFocus = (evt: any, isToggled: Ref<boolean>): void => {
  // Ignore `esc` key
  if (evt.keyCode === 27) {
    isToggled.value = false
    return
  }

  const inputElem = selectWrapperElement.value?.children[0] as HTMLInputElement
  if (!isToggled.value && inputElem) { // simulate click to trigger dropdown open
    inputElem.click()
  }

  if ((evt.code === 'ArrowDown' || evt.code === 'ArrowUp') && isToggled.value) {
    kSelectItems.value?.setFocus()
  }
}

const onQueryChange = (query: string) => {
  if (filterQuery.value !== query) {
    filterQuery.value = query
  }
}

const onInputFocus = (): void => {
  inputFocused.value = true

  emit('query-change', filterQuery.value)
}

const onInputBlur = (): void => {
  inputFocused.value = false
}

const onInputClick = (): void => {
  // If filtering is not enabled, the internal KInput activates the keyboard on mobile when clicked even though it's not needed.
  // This will blur the input and prevent the keyboard from activating on mobile.
  if (!props.enableFiltering) {
    inputElement.value?.$el?.querySelector('input')?.blur()
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
    filterQuery.value = selectedItem.value.label
  }

  if (isToggled) {
    toggle()
  }
}

const onOpen = (toggle: () => void) => {
  isDropdownOpen.value = true

  if (props.enableFiltering) {
    filterQuery.value = ''
  }

  toggle()
}

const setLabelAttributes = () => {
  /**
   * Temporary fix for the issue where we can't use v-bind-once to pass id to a custom element (KInput)
   * TODO: remove this once useId is released in Vue 3.5
   */
  if (!attrs.id) {
    const inputElementId = inputElement.value?.$el?.querySelector('input')?.id

    if (inputElementId) {
      labelElement.value?.$el?.setAttribute('for', inputElementId)
    }
  }
}

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const item = selectItems.value?.filter((item: SelectItem) => item.value === newVal)

    if (item?.length) {
      handleItemSelect(item[0])
    } else if (!newVal) {
      clearSelection()
    }
  }
})

watch(() => props.items, (newValue, oldValue) => {
  // Only trigger the watcher if items actually change
  if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
    return
  }

  selectItems.value = JSON.parse(JSON.stringify(props.items))

  // drop selected item value to find the selected item in the new list
  // unless items is empty
  if (selectItems.value?.length) {
    selectedItem.value = null
  }

  for (let i = 0; i < selectItems.value?.length; i++) {
    // Ensure each item has a `selected` property
    if (selectItems.value[i].selected === undefined) {
      selectItems.value[i].selected = false
    }

    let selectItemKey = `${selectItems.value[i].label?.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${i}`
    if (selectItemKey.includes('undefined')) {
      selectItemKey = `select-item-label-${i}`
    }

    selectItems.value[i].key = selectItemKey
    if (selectItems.value[i].value === props.modelValue || selectItems.value[i].selected) {
      selectItems.value[i].selected = true
      selectedItem.value = selectItems.value[i]
      selectItems.value[i].key += '-selected'

      if (!inputFocused.value) {
        filterQuery.value = selectedItem.value.label
      }
    }

    if (selectedItem.value?.value === selectItems.value[i].value) {
      selectItems.value[i].selected = true
    }
  }

  // Trigger an update to the popper element to cause the popover to redraw
  // This prevents the popover from displaying "detached" from the KSelect
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (popperElement.value && typeof popperElement.value.updatePopper === 'function') {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popperElement.value.updatePopper()
    })
  }
}, { deep: true, immediate: true })

watch(filterQuery, (q: string) => {
  emit('query-change', q)
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

watch(() => attrs.id, async () => {
  inputKey.value++
  await nextTick()
  setLabelAttributes()
}, { immediate: true })

onMounted(() => {
  if (selectWrapperElement.value) {
    resizeObserver.value = ResizeObserverHelper.create(() => {
      actualElementWidth.value = `${selectWrapperElement.value?.offsetWidth}px`
    })

    resizeObserver.value.observe(selectWrapperElement.value as HTMLDivElement)
  }

  setLabelAttributes()

  useEventListener(document, 'keydown', (event: any) => {
    // When enableFiltering is false, the KInput doesn't have focus so we need to handle arrow key events here
    if (!props.enableFiltering && document.activeElement?.tagName === 'BODY' && !inputFocused.value && isDropdownOpen.value) {
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        event.preventDefault()
        kSelectItems.value?.setFocus()
      }
    }
  })
})

onUnmounted(() => {
  if (selectWrapperElement.value) {
    resizeObserver.value?.unobserve(selectWrapperElement.value)
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

/* Component mixins */

@mixin kSelectPopoverMaxHeight {
  max-height: v-bind('popoverContentMaxHeight');
  overflow-y: auto;
}

/* Component styles */

.k-select {
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
      }
    }

    &.hide-model-value {
      :deep(input) {
        color: transparent !important;

        &::placeholder {
          color: transparent !important;
        }
      }
    }

    &.input-has-focus {
      :deep(input) {
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

  .select-popover {
    .select-items-container {
      @include kSelectPopoverMaxHeight;
    }
  }

  :deep(.select-popover.popover .popover-container) {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-0, $kui-space-0);

    &.has-sticky-dropdown-footer, &.has-static-dropdown-footer {
      padding-bottom: var(--kui-space-0, $kui-space-0);
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
