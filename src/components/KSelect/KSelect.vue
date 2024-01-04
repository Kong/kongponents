<template>
  <div
    class="k-select"
    :class="[$attrs.class]"
  >
    <KToggle v-slot="{ toggle, isToggled }">
      <KPop
        ref="popperElement"
        v-bind="boundKPopAttributes"
        :on-popover-click="() => {
          toggle()
          return isToggled.value
        }"
        :position-fixed="positionFixed"
        target=".select-wrapper"
        @closed="() => {
          if (selectedItem) {
            filterQuery = selectedItem.label
          }
          if (isToggled.value) {
            toggle()
          }
        }"
        @opened="() => {
          if (enableFiltering) {
            filterQuery = ''
          }
          toggle()
        }"
      >
        <div
          ref="selectWrapperElement"
          class="select-wrapper"
          data-testid="select-wrapper"
          role="listbox"
          @click="onSelectWrapperClick"
        >
          <KInput
            :id="selectId"
            v-bind="modifiedAttrs"
            autocapitalize="off"
            autocomplete="off"
            class="select-input"
            :class="{ 'filtering-disabled': !enableFiltering,
                      'hide-model-value': hasCustomSelectedItem
            }"
            data-testid="select-input"
            :disabled="isDisabled"
            :error="error"
            :help="help"
            :label="label ? strippedLabel : undefined"
            :label-attributes="labelAttributes"
            :model-value="filterQuery"
            :placeholder="selectedItem && !enableFiltering ? selectedItem.label : placeholderText"
            :readonly="isReadonly"
            @blur="onInputBlur"
            @focus="onInputFocus"
            @keypress="onInputKeypress"
            @keyup="(evt: any) => triggerFocus(evt, isToggled)"
            @update:model-value="onQueryChange"
          >
            <template #after>
              <CloseIcon
                v-if="isClearVisible"
                data-testid="clear-selection-icon"
                role="button"
                tabindex="0"
                @click="clearSelection"
              />
              <ChevronDownIcon
                class="chevron-down-icon"
                :class="{ 'disabled': isDisabled }"
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
          <div
            v-if="enableFiltering && loading"
            class="select-loading"
            data-propagate-clicks="false"
            data-testid="select-loading"
          >
            <slot name="loading">
              <ProgressIcon class="loading-icon" />
            </slot>
          </div>
          <div
            v-else
            class="select-items-container"
            data-propagate-clicks="false"
          >
            <KSelectItems
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
              :item="{ label: `${filterQuery} (Add new value)`, value: 'add_item' }"
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
              v-if="hasDropdownFooter && dropdownFooterTextPosition === 'static'"
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
          <div
            v-if="hasDropdownFooter && dropdownFooterTextPosition === 'sticky'"
            class="dropdown-footer dropdown-footer-sticky"
          >
            <slot name="dropdown-footer-text">
              {{ dropdownFooterText }}
            </slot>
          </div>
        </template>
      </KPop>
    </KToggle>
  </div>
</template>

<script lang="ts">
import type { Ref, PropType } from 'vue'
import { ref, computed, watch, nextTick, useAttrs, useSlots, onBeforeUnmount, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
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

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
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
   * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
   */
  positionFixed: {
    type: Boolean,
    default: true,
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
    type: Function,
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

const resizeObserver = ref<ResizeObserver>()

const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const isDisabled = computed((): boolean => attrs.disabled !== undefined && String(attrs.disabled) !== 'false')
const isReadonly = computed((): boolean => attrs.readonly !== undefined && String(attrs.readonly) !== 'false')
const hasDropdownFooter = computed((): boolean => !!(slots['dropdown-footer-text'] || props.dropdownFooterText))

const defaultKPopAttributes = {
  popoverClasses: `select-popover ${hasDropdownFooter.value ? `has-${props.dropdownFooterTextPosition}-dropdown-footer` : ''} ${props.help ? 'has-help-text' : ''}`,
  popoverTimeout: 0,
  placement: 'bottomStart' as PopPlacements,
  hideCaret: true,
}

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

const selectedItem = ref<SelectItem | null>(null)
const selectId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
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

// Calculate the `.k-popover-content` max-height
const popoverContentMaxHeight = computed((): string => getSizeFromString(props.dropdownMaxHeight))

// TypeScript complains if I bind the original object
const boundKPopAttributes = computed(() => ({ ...createKPopAttributes.value }))

const placeholderText = computed((): string => props.placeholder || attrs.placeholder as string || 'Filter...')

const isClearVisible = computed((): boolean => !isDisabled.value && (props.clearable && !!selectedItem.value))

const hasCustomSelectedItem = computed((): boolean => !!(selectedItem.value &&
  (slots['selected-item-template'] || (props.reuseItemTemplate && slots['item-template']))))

const filteredItems = computed(() => {
  return props.enableFiltering && props.filterFunction({ query: filterQuery.value, items: selectItems.value }) !== true ? props.filterFunction({ query: filterQuery.value, items: selectItems.value }) : selectItems.value
})

const onInputKeypress = (event: Event) => {
  // If filters are not enabled, ignore any keypresses
  if (!props.enableFiltering) {
    event.preventDefault()
    return false
  }
}

const handleAddItem = (): void => {
  if (!props.enableItemCreation || !filterQuery.value || !uniqueFilterQuery.value) {
    // do nothing if not enabled or no label or label already exists
    return
  }

  const pos = (selectItems.value?.length || 0) + 1
  const item: SelectItem = {
    label: filterQuery.value + '',
    value: uuidv4(),
    key: `${filterQuery.value.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${pos}`,
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
      anItem.selected = true
      anItem.key = anItem?.key?.includes('-selected') ? anItem.key : `${anItem.key}-selected`
      selectedItem.value = anItem
    } else if (anItem.selected) {
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
  emit('selected', item)
  // this 'input' event must be emitted for v-model binding to work properly
  emit('input', item.value)
  emit('change', item)
  emit('update:modelValue', item.value)
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

const triggerFocus = (evt: any, isToggled: Ref<boolean>):void => {
  // Ignore `esc` key
  if (evt.keyCode === 27) {
    isToggled.value = false
    return
  }

  const inputElem = selectWrapperElement.value?.children[0] as HTMLInputElement
  if (!isToggled.value && inputElem) { // simulate click to trigger dropdown open
    inputElem.click()
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

const onSelectWrapperClick = (event: Event): void => {
  if (isDisabled.value || (event?.target as HTMLElement)?.dataset.propagateClicks === 'false') {
    event.stopPropagation()
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
  selectedItem.value = null
  for (let i = 0; i < selectItems.value?.length; i++) {
    // Ensure each item has a `selected` property
    if (selectItems.value[i].selected === undefined) {
      selectItems.value[i].selected = false
    }

    selectItems.value[i].key = `${selectItems.value[i].label?.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${i}` || `select-item-label-${i}`
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

onMounted(() => {
  if (selectWrapperElement.value) {
    resizeObserver.value = new ResizeObserver(entries => {
      // TODO: use resizeObserverHelper(entries, () => { actualElementWidth.value = `${selectWrapperElement.value?.offsetWidth}px` })
      // Wrapper 'window.requestAnimationFrame' is needed for disabling "ResizeObserver loop limit exceeded" error in DD
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return
        }

        // Callback on resize
        actualElementWidth.value = `${selectWrapperElement.value?.offsetWidth}px`
      })
    })

    resizeObserver.value.observe(selectWrapperElement.value as HTMLDivElement)
  }
})

onBeforeUnmount(() => {
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
  }

  .select-input {
    &.filtering-disabled {
      :deep(input) {
        caret-color: transparent;
        cursor: pointer;
      }
    }

    &.hide-model-value {
      :deep(input) {
        color: transparent;
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

    inset: 0;
    margin-left: $kSelectInputPaddingX;
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
      // accommodate for the clear icon
      max-width: calc(v-bind('actualElementWidth') - ($kSelectInputPaddingX * 2) - ($kSelectInputIconSize * 2) - ($kSelectInputSlotSpacing * 2));
    }
  }

  .select-popover {
    .select-items-container {
      @include kSelectPopoverMaxHeight;
    }
  }

  :deep(.select-popover.k-popover) {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-0, $kui-space-0);

    &.has-sticky-dropdown-footer, &.has-static-dropdown-footer {
      padding-bottom: var(--kui-space-0, $kui-space-0);
    }

    &.has-help-text {
      margin-top: calc(-1 * $kSelectInputHelpTextHeight);
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
}
</style>
