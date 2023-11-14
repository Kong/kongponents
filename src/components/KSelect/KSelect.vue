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
            :disabled="isDisabled"
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
            <template
              v-if="isClearVisible"
              #before
            >
              <CloseIcon
                role="button"
                tabindex="0"
                @click="clearSelection"
              />
            </template>
            <template #after>
              <ChevronDownIcon />
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
          <slot
            v-if="autosuggest && loading"
            name="loading"
          >
            <KIcon
              class="k-select-loading"
              data-testid="k-select-loading"
              icon="spinner"
            />
          </slot>
          <div
            v-else
            class="select-items-container"
            data-propagate-clicks="false"
          >
            <KSelectItems
              :items="selectItems"
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
              v-if="!selectItems.length && !$slots.empty && !enableItemCreation"
              key="k-select-empty-state"
              class="k-select-empty-item"
              :item="{ label: 'No results', value: 'no_results' }"
            />
            <KSelectItem
              v-if="!selectItems.length && uniqueFilterQuery && !$slots.empty && enableItemCreation"
              key="k-select-new-item"
              class="k-select-new-item"
              data-testid="k-select-add-item"
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
          </div>
          <slot
            v-if="!loading && !selectItems.length"
            name="empty"
          />
          <div
            v-if="$slots['dropdown-footer-text'] || dropdownFooterText"
            class="k-select-dropdown-footer-text"
            :class="`k-select-dropdown-footer-${dropdownFooterTextPosition}`"
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
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KSelectItems from '@/components/KSelect/KSelectItems.vue'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'
import type {
  PopPlacements,
  SelectItem,
  SelectFilterFnParams,
  SelectDropdownFooterTextPosition,
  SelectAppearance,
} from '@/types'
import { SelectAppearanceArray } from '@/types'
import { ChevronDownIcon, CloseIcon } from '@kong/icons'
import { is } from 'cypress/types/bluebird'

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const { getSizeFromString, stripRequiredLabel } = useUtilities()

const defaultKPopAttributes = {
  popoverClasses: 'select-popover',
  popoverTimeout: 0,
  placement: 'bottomStart' as PopPlacements,
  hideCaret: true,
}

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
   * The display style, can be either dropdown, select, or button
   */
  appearance: {
    type: String as PropType<SelectAppearance>,
    default: 'select',
    validator: (value: SelectAppearance) => SelectAppearanceArray.includes(value),
  },
  /**
   * Override the text displayed on the button if `appearance` is `button` after an item
   * has been selected. By default display the selected item's label
   */
  buttonText: {
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
   * Override default filter functionality of case-insensitive search on label
   */
  filterFunc: {
    type: Function,
    default: (params: SelectFilterFnParams) => params.items.filter((item: SelectItem) => item.label?.toLowerCase().includes(params.query?.toLowerCase())),
  },
  /**
   * Control whether the input for `select` and `dropdown` appearances supports filtering.
   */
  enableFiltering: {
    type: Boolean,
    default: false,
  },
  /**
   * A flag for autosuggest mode
   */
  autosuggest: {
    type: Boolean,
    default: false,
  },
  /**
   * Loading state in autosuggest
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * A flag for clearing selection when appearance is `select`
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
   * Only applies when appearance prop is `select`.
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
})

const emit = defineEmits<{
  (e: 'selected', item: SelectItem): void
  (e: 'input', value: string | number | null): void
  (e: 'change', item: SelectItem | null): void
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'query-change', value: string): void
  (e: 'item:added', value: SelectItem): void
  (e: 'item:removed', value: SelectItem): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const resizeObserver = ref<ResizeObserver>()

const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const isDisabled = computed((): boolean => attrs.disabled !== undefined && String(attrs.disabled) !== 'false')
const isReadonly = computed((): boolean => attrs.readonly !== undefined && String(attrs.readonly) !== 'false')

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

const isClearVisible = computed((): boolean => props.clearable && !!selectedItem.value)

const hasCustomSelectedItem = computed((): boolean => !!(selectedItem.value &&
  (slots['selected-item-template'] || (props.reuseItemTemplate && slots['item-template']))))

const onInputKeypress = (event: Event) => {
  // If filters are not enabled, ignore any keypresses
  if (!props.enableFiltering) {
    event.preventDefault()
    return false
  }
}

// TODO: mess

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

  emit('item:added', item)

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
        emit('item:removed', anItem)
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
      emit('item:removed', anItem)
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

  const inputElem = document.getElementById(selectId.value)
  if (!isToggled.value && inputElem) { // simulate click to trigger dropdown open
    inputElem.click()
  }
}

const onQueryChange = (query: string) => {
  if (filterQuery.value !== query) {
    filterQuery.value = query
    emit('query-change', query)
  }
}

const onInputFocus = (): void => {
  inputFocused.value = true

  emit('query-change', '')
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

    selectItems.value[i].key = `${selectItems.value[i].label?.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${i}` || `k-select-item-label-${i}`
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
  if (popperElement.value && typeof popper.value.updatePopper === 'function') {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popperElement.value.updatePopper()
    })
  }
}, { deep: true, immediate: true })

// TODO: /mess

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
$kSelectInputPaddingY: var(--kui-space-40, $kui-space-40); // corresponds to mixin, search for variable name in mixins
$kSelectInputIconSize: var(--kui-icon-size-40, $kui-icon-size-40); // corresponds to value in KInput.vue
$kSelectInputSlotSpacing: var(--kui-space-40, $kui-space-40); // corresponds to value in KInput.vue

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

  .custom-selected-item-wrapper {
    @include inputText;
    @include selectItemDefaults;

    inset: 0;
    margin-left: $kSelectInputPaddingX;
    max-width: calc(v-bind('actualElementWidth') - $kSelectInputPaddingX - $kSelectInputIconSize - $kSelectInputSlotSpacing);
    overflow: hidden;
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
      margin-left: calc($kSelectInputPaddingX + $kSelectInputIconSize + $kSelectInputSlotSpacing);
      max-width: calc(v-bind('actualElementWidth') - $kSelectInputPaddingX - $kSelectInputIconSize - $kSelectInputSlotSpacing - $kSelectInputPaddingX - $kSelectInputIconSize - $kSelectInputSlotSpacing);
    }
  }

  :deep(.k-popover-content) {
    max-height: v-bind('popoverContentMaxHeight');
    overflow-y: auto;
  }
}
</style>
