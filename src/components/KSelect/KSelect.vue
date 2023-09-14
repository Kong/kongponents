<template>
  <div
    class="k-select"
    :class="[$attrs.class]"
    :style="widthStyle"
  >
    <KLabel
      v-if="label && !overlayLabel"
      v-bind="labelAttributes"
      data-testid="k-select-label"
      :for="selectId"
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
    <div
      :id="selectId"
      data-testid="k-select-selected-item"
    >
      <div
        v-if="selectedItem && appearance === 'dropdown'"
        class="k-select-item-selection"
        :class="{ 'overlay-label-item-selection': overlayLabel }"
      >
        <slot
          :item="selectedItem"
          name="selected-item-template"
        >
          <div
            class="k-select-selected-item-label"
          >
            {{ selectedItem.label }}
          </div>
        </slot>
        <button
          class="clear-selection-icon"
          @click="clearSelection"
          @keyup.enter="clearSelection"
        >
          <KIcon
            color="currentColor"
            icon="clear"
          />
        </button>
      </div>
      <KToggle v-slot="{ toggle, isToggled }">
        <KPop
          ref="popper"
          v-bind="boundKPopAttributes"
          :on-popover-click="() => {
            toggle()
            return isToggled.value
          }"
          :position-fixed="positionFixed"
          :target="`[id='${selectInputId}']`"
          :test-mode="!!testMode || undefined"
          @closed="() => {
            if (selectedItem && appearance === 'select') {
              filterStr = selectedItem.label
            }
            if (isToggled.value) {
              toggle()
            }
          }"
          @opened="() => {
            filterStr = ''
            toggle()
            onPopoverOpen()
          }"
        >
          <div
            v-if="appearance === 'button'"
            :id="selectInputId"
            class="k-select-button"
            data-testid="k-select-input"
            role="listbox"
            style="position: relative;"
          >
            <KButton
              :id="selectTextId"
              v-bind="modifiedAttrs"
              appearance="btn-link"
              :is-rounded="false"
              show-caret
              :style="widthStyle"
              @keyup="(evt: any) => triggerFocus(evt, isToggled)"
            >
              <slot
                :item="selectedItem"
                name="selected-item-template"
              >
                {{ selectButtonText }}
              </slot>
            </KButton>
          </div>
          <div
            v-else
            :id="selectInputId"
            class="select-input-container"
            :class="{
              'k-select-input': appearance === 'select',
              'no-filter': !filterIsEnabled,
              'is-readonly': ($attrs.readonly !== undefined && String($attrs.readonly) !== 'false'),
              'disabled': ($attrs.disabled !== undefined && String($attrs.disabled) !== 'false'),
              'is-open': isToggled.value
            }"
            data-testid="k-select-input"
            role="listbox"
            style="position: relative;"
            @click="(evt: any) => {
              if ($attrs.disabled !== undefined && String($attrs.disabled) !== 'false') {
                evt.stopPropagation()
              }
            }"
          >
            <KButton
              v-if="isClearVisible"
              class="clear-selection-icon"
              @click="clearSelection"
              @keyup.enter="clearSelection"
            >
              <KIcon
                :color="KUI_COLOR_TEXT_NEUTRAL"
                icon="clear"
                :size="KUI_ICON_SIZE_30"
              />
            </KButton>
            <KIcon
              v-if="appearance === 'select'"
              :class="{ 'overlay-label-chevron': overlayLabel }"
              :color="KUI_COLOR_TEXT_NEUTRAL"
              icon="chevronDown"
              :size="KUI_ICON_SIZE_30"
            />
            <KInput
              :id="selectTextId"
              v-bind="modifiedAttrs"
              autocapitalize="off"
              autocomplete="off"
              class="k-select-input"
              :class="{
                'no-filter': !filterIsEnabled,
                'input-placeholder-dark has-chevron': appearance === 'select',
                'input-placeholder-transparent': hasCustomSelectedItem && (!filterIsEnabled || !isToggled.value),
                'has-clear': isClearVisible,
                'is-readonly': ($attrs.readonly !== undefined && String($attrs.readonly) !== 'false'),
                'disabled': ($attrs.disabled !== undefined && String($attrs.disabled) !== 'false')
              }"
              :label="label && overlayLabel ? strippedLabel : undefined"
              :model-value="filterStr"
              :overlay-label="overlayLabel"
              :placeholder="selectedItem && appearance === 'select' && !filterIsEnabled ? selectedItem.label : placeholderText"
              @blur="onInputBlur"
              @focus="onInputFocus"
              @keypress="onInputKeypress"
              @keyup="(evt: any) => triggerFocus(evt, isToggled)"
              @update:model-value="onQueryChange"
            />
            <transition name="fade">
              <div
                v-if="hasCustomSelectedItem && (!filterIsEnabled || !isToggled.value)"
                class="custom-selected-item"
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
            </transition>
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
              class="k-select-list"
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
                key="k-select-empty-state"
                class="k-select-empty-item"
                :item="{ label: 'No results', value: 'no_results' }"
              />
              <KSelectItem
                v-if="!filteredItems.length && uniqueFilterStr && !$slots.empty && enableItemCreation"
                key="k-select-new-item"
                class="k-select-new-item"
                data-testid="k-select-add-item"
                :item="{ label: `${filterStr} (Add new value)`, value: 'add_item' }"
                @selected="handleAddItem"
              >
                <template #content>
                  <div class="select-item-description">
                    {{ filterStr }}
                    <span class="select-item-new-indicator">(Add new value)</span>
                  </div>
                </template>
              </KSelectItem>
            </div>
            <slot
              v-if="!loading && !filteredItems.length"
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
  </div>
</template>

<script lang="ts">
import type { Ref, PropType } from 'vue'
import { ref, computed, watch, nextTick, useAttrs, useSlots } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KLabel from '@/components/KLabel/KLabel.vue'
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
import {
  SelectAppearanceArray,
} from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_30 } from '@kong/design-tokens'

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const { getSizeFromString, stripRequiredLabel } = useUtilities()

const defaultKPopAttributes = {
  popoverClasses: 'k-select-popover',
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
  overlayLabel: {
    type: Boolean,
    default: false,
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
    default: '',
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
    default: 'dropdown',
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
    default: null,
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
   * Test mode - for testing only, strips out generated ids
   */
  testMode: {
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

const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.help || props.labelAttributes?.info || slots['label-tooltip']))
const filterStr = ref('')
// whether or not filter string matches an existing item's label
const uniqueFilterStr = computed((): boolean => {
  if (!filterStr.value) {
    return false
  }

  if (selectItems.value?.filter((item: SelectItem) => item.label === filterStr.value)?.length) {
    return false
  }

  return true
})
const selectedItem = ref<SelectItem|null>(null)
const selectId = computed((): string => props.testMode ? 'test-select-id-1234' : uuidv4())
const selectInputId = computed((): string => props.testMode ? 'test-select-input-id-1234' : uuidv4())
const selectTextId = computed((): string => props.testMode ? 'test-select-text-id-1234' : uuidv4())
const selectItems: Ref<SelectItem[]> = ref([])
const initialFocusTriggered: Ref<boolean> = ref(false)
const inputFocused: Ref<boolean> = ref(false)
const popper = ref(null)

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

const filterIsEnabled = computed((): boolean => {
  if (props.autosuggest) {
    return true
  }

  if (props.enableFiltering !== null) {
    // filtering not allowed for `button` appearance
    return props.appearance === 'button' ? false : props.enableFiltering
  }

  if (props.appearance === 'dropdown') {
    return true
  }

  return false
})

const widthValue = computed(() => {
  let w = ''
  if (!props.width) {
    w = '205'
    if (props.appearance === 'button') {
      w = '230'
    }
  } else {
    w = props.width
  }

  return getSizeFromString(w)
})

const widthStyle = computed(() => {
  return {
    width: widthValue.value,
  }
})

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
    popoverClasses: `${defaultKPopAttributes.popoverClasses} ${props.kpopAttributes.popoverClasses} k-select-pop-${props.appearance}`,
    width: String(inputWidth.value),
    maxWidth: String(inputWidth.value),
    disabled: (attrs.disabled !== undefined && String(attrs.disabled) !== 'false') || (attrs.readonly !== undefined && String(attrs.readonly) !== 'false'),
  }
})

// Calculate the `.k-popover-content` max-height
const popoverContentMaxHeight = computed((): string => getSizeFromString(props.dropdownMaxHeight))

// TypeScript complains if I bind the original object
const boundKPopAttributes = computed(() => ({ ...createKPopAttributes.value }))

const filteredItems = computed(() => {
  // For autosuggest, items don't need to be filtered internally
  return props.autosuggest ? selectItems.value : props.filterFunc({ items: selectItems.value, query: filterStr.value })
})

const placeholderText = computed((): string => {
  if (props.placeholder) {
    return props.placeholder
  } else if (attrs.placeholder) {
    return attrs.placeholder as string
  }
  if (props.appearance === 'button' || !filterIsEnabled.value) {
    return 'Select an item'
  }
  return 'Filter...'
})

const selectButtonText = computed((): string => {
  if (props.buttonText && selectedItem.value) {
    return props.buttonText
  } else if (selectedItem.value) {
    return selectedItem.value.label
  }
  return placeholderText.value
})

const isClearVisible = computed((): boolean => props.appearance === 'select' && props.clearable && !!selectedItem.value)

const hasCustomSelectedItem = computed((): boolean => !!(selectedItem.value && props.appearance === 'select' &&
  (slots['selected-item-template'] || (props.reuseItemTemplate && slots['item-template']))))

const onInputKeypress = (event: Event) => {
  // If filters are not enabled, ignore any keypresses
  if (!filterIsEnabled.value) {
    event.preventDefault()
    return false
  }
}

const handleAddItem = (): void => {
  if (!props.enableItemCreation || !filterStr.value || !uniqueFilterStr.value) {
    // do nothing if not enabled or no label or label already exists
    return
  }

  const pos = (selectItems.value?.length || 0) + 1
  const item: SelectItem = {
    label: filterStr.value + '',
    value: props.testMode ? `test-multiselect-added-item-${pos}` : uuidv4(),
    key: `${filterStr.value.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${pos}`,
    custom: true,
  }

  emit('item:added', item)

  handleItemSelect(item, true)
  filterStr.value = ''
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
  filterStr.value = props.appearance === 'dropdown' ? '' : item.label
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
  if (props.appearance === 'select') {
    filterStr.value = ''
  }
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

  const inputElem = document.getElementById(selectTextId.value)
  if (!isToggled.value && inputElem) { // simulate click to trigger dropdown open
    inputElem.click()
  }
}

const onQueryChange = (query: string) => {
  filterStr.value = query
  emit('query-change', query)
}

const onInputFocus = (): void => {
  inputFocused.value = true
  if (!initialFocusTriggered.value) {
    initialFocusTriggered.value = true
    emit('query-change', '')
  }
}

const onInputBlur = (): void => {
  inputFocused.value = false
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

      if (props.appearance === 'select' && !inputFocused.value) {
        filterStr.value = selectedItem.value.label
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
  if (popper.value && typeof popper.value.updatePopper === 'function') {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popper.value.updatePopper()
    })
  }
}, { deep: true, immediate: true })

const inputWidth = ref(0)

const onPopoverOpen = () => {
  const inputElem = document.getElementById(selectInputId.value)

  if (inputElem) {
    inputWidth.value = inputElem.offsetWidth
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tmp-variables';
@import '@/styles/mixins';

.k-select {
  width: fit-content; // necessary for correct placement of popup

  .k-select-item-selection {
    background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    color: var(--kui-color-text-primary, $kui-color-text-primary);
    display: flex;
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    margin-bottom: var(--kui-space-30, $kui-space-30);
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-50, $kui-space-50) !important;

    &.overlay-label-item-selection {
      position: relative;
      top: -8px;
    }

    .clear-selection-icon {
      @include non-visual-button;
      color: $tmp-color-blue-200;
      cursor: pointer !important;
      height: 24px;
      margin-bottom: var(--kui-space-auto, $kui-space-auto);
      margin-left: var(--kui-space-auto, $kui-space-auto);
      margin-top: var(--kui-space-auto, $kui-space-auto);
      padding: var(--kui-space-0, $kui-space-0);
    }
  }

  .k-select-trigger:after {
    border-left: var(--kui-border-width-30, $kui-border-width-30) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    border-right: var(--kui-border-width-30, $kui-border-width-30) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    border-top: var(--kui-border-width-30, $kui-border-width-30) solid;
    content: "";
    display: inline-block;
    height: 0;
    margin-left: var(--kui-space-40, $kui-space-40);
    vertical-align: middle;
    width: 0;
  }
}
</style>

<style lang="scss">
@import '@/styles/tmp-variables';
@import '@/styles/mixins';

$chevronDownIconMargin: var(--kui-space-40, $kui-space-40);
$iconSize: var(--kui-icon-size-30, $kui-icon-size-30);

@mixin boxShadow($color, $whiteShadowSpred: 2px, $colorShadowSpread: 4px) {
  box-shadow: 0 0 0 $whiteShadowSpred var(--kui-color-background, $kui-color-background), 0 0 0 $colorShadowSpread $color;
}

// allows setting a maxHeight on the popover dropdown
@mixin kSelectPopoverMaxHeight {
  max-height: v-bind('popoverContentMaxHeight');
  overflow-y: auto;
}

.k-select {
  .k-select-selected-item-label {
    align-self: center;
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
  }

  .k-select-item-selection {
    .clear-selection-icon {
      .kong-icon {
        margin-left: var(--kui-space-auto, $kui-space-auto);
      }
    }
  }

  .k-button.btn-link {
    padding: var(--kui-space-50, $kui-space-50) var(--kui-space-80, $kui-space-80);
    text-decoration: none;

    &:focus {
      @include boxShadow(var(--kui-color-background-primary, $kui-color-background-primary), 0, 2px);
    }

    .caret {
      margin-left: var(--kui-space-auto, $kui-space-auto);
    }
  }

  .k-select-input {
    @include input-default;
    box-shadow: none !important;
    display: inline-block;
    position: relative;
    width: 100%;

    &.is-readonly {
      @include input-readonly;
      box-shadow: none !important;

      &.select-input-container {
        input.k-input.form-control:not([type="checkbox"]):not([type="radio"]):not([type="file"]):read-only {
          box-shadow: none !important;
        }
      }
    }

      &.select-input-container.disabled {
      @include input-disabled;
      box-shadow: none !important;
      cursor: not-allowed !important;

      &.select-input-container {
        input.k-input.form-control:not([type="checkbox"]):not([type="radio"]):not([type="file"]):disabled {
          box-shadow: none !important;
        }
      }
    }

    .kong-icon-chevronDown {
      margin-right: $chevronDownIconMargin;
    }

    &.cursor-default {
      cursor: default;
    }

    &.prevent-pointer-events {
      pointer-events: none;
    }

    &.input-placeholder-dark {
      input {
        &::placeholder {
          color: var(--kui-color-text, $kui-color-text) !important;
        }
      }
    }

    &.input-placeholder-transparent {
      input {
        color: transparent !important;

        &::placeholder {
          color: transparent !important;
        }
      }
    }

    .k-input.no-filter {
      cursor: default !important;
      pointer-events: none !important;
    }

    .k-input.has-chevron {
      padding-right: var(--kui-space-100, $kui-space-100);
    }

    .k-input.has-clear {
      padding-right: var(--kui-space-120, $kui-space-120);
    }

    &input.k-input {
      height: 100%;
      padding: var(--kui-space-40, $kui-space-40);
    }

    .kong-icon {
      display: inline-flex;
    }

    .clear-selection-icon {
      @include non-visual-button;
      padding: var(--kui-space-0, $kui-space-0);
      position: absolute;
      right: 24px;
      z-index: 9;

      .kong-icon-clear {
        display: block;
        position: static;
        transform: none;
      }
    }

    .custom-selected-item {
      display: inline-flex;
      padding: var(--kui-space-40, $kui-space-40) var(--kui-space-50, $kui-space-50);
      pointer-events: none;
      position: absolute;
      // offset chevron icon width and margin
      right: 24px;
      width: calc(100% - $iconSize - $chevronDownIconMargin);
    }
  }

  div.k-select-input.select-input-container {
    align-items: center;
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
    border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
    cursor: pointer !important;
    display: flex;
    flex: 0 0 40%;
    flex-direction: row-reverse;
    transition: all $tmp-animation-timing-2 ease;

    .k-input-wrapper  {
      border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
    }

    input.k-input {
      box-shadow: none !important;
    }

    &:hover {
      border-color: var(--kui-color-border-primary-weaker, $kui-color-border-primary-weaker);

      .text-on-input label {
        color: var(--kui-color-text-primary, $kui-color-text-primary);
      }
    }

    &.is-open {
      border-color: var(--kui-color-border-primary-weak, $kui-color-border-primary-weak);

      .text-on-input label {
        color:var(--kui-color-text-primary, $kui-color-text-primary);
      }
    }
  }

  .k-select-button .has-caret .kong-icon {
    margin-left: var(--kui-space-auto, $kui-space-auto);
  }

  .k-select-button {
    .k-button.btn-link:hover,
    &.k-button.btn-link:hover {
      text-decoration: none;
    }
  }

  &.k-input {
    width: 100%;  // need this so input takes the k-input-wrapper's width which uses this.width prop
  }

  .k-select-popover {
    box-sizing: border-box;
    margin-top: var(--kui-space-10, $kui-space-10) !important;
    width: 100%;

    &[x-placement^="top"] {
      margin-bottom: var(--kui-space-10, $kui-space-10) !important;
      margin-top: var(--kui-space-0, $kui-space-0) !important;
    }

    &.k-select-pop-button {
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
      padding: var(--kui-space-40, $kui-space-40) var(--kui-space-40, $kui-space-40);
    }

    &.k-select-pop-dropdown {
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
      padding: var(--kui-space-40, $kui-space-40) var(--kui-space-40, $kui-space-40);
    }

    &.k-select-pop-select {
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
      padding: var(--kui-space-40, #{$kui-space-40}) var(--kui-space-40, $kui-space-40);
    }

    .k-select-empty-item button,
    .k-select-empty-item button:focus,
    .k-select-empty-item button:hover {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      font-style: italic;
    }

    .k-select-new-item {
      word-break: break-word;

      .select-item-new-indicator {
        font-style: italic;
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      }
    }

    ul {
      margin: var(--kui-space-0, $kui-space-0);
      padding: var(--kui-space-0, $kui-space-0);
    }

    a {
      color: var(--kui-color-text, $kui-color-text);
      flex: 1;

      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
      }
    }

    .k-select-loading {
      display: block;
      height: 24px;
      position: relative;
      right: 0;
      text-align: center;
      top: 0;
    }

    .k-popover-content {
      @include kSelectPopoverMaxHeight;

      .k-select-list {
        margin: var(--kui-space-0, $kui-space-0) !important;
        padding: var(--kui-space-0, $kui-space-0) !important;
      }

      // when dropdown footer text position is sticky
      &:has(.k-select-dropdown-footer-text.k-select-dropdown-footer-sticky) {
        max-height: none;

        .k-select-list {
          @include kSelectPopoverMaxHeight;
        }
      }

      // Firefox workaround
      // since :has() selector isn't supported in Firefox be default
      .k-select-list ~ .k-select-dropdown-footer-sticky {
        bottom: 0;
        position: sticky;
      }
    }

    .k-select-dropdown-footer-text {
      background-color: var(--kui-color-background, $kui-color-background);
      border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      padding: var(--kui-space-40, $kui-space-40);
      padding-bottom: var(--kui-space-0, $kui-space-0);
    }
  }
}
</style>
