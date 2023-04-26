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
    </KLabel>
    <div
      :id="selectId"
      data-testid="k-select-selected-item"
    >
      <div
        v-if="selectedItem && appearance === 'dropdown'"
        class="k-select-item-selection px-3 py-1"
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
          class="clear-selection-icon cursor-pointer non-visual-button"
          @click="clearSelection"
          @keyup.enter="clearSelection"
        >
          <KIcon
            color="var(--blue-200)"
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
              class="clear-selection-icon cursor-pointer non-visual-button"
              :class="{ 'overlay-label-clear': overlayLabel }"
              @click="clearSelection"
              @keyup.enter="clearSelection"
            >
              <KIcon
                color="var(--grey-500)"
                icon="clear"
                size="18"
              />
            </KButton>
            <KIcon
              v-if="appearance === 'select'"
              :class="{ 'overlay-label-chevron': overlayLabel }"
              color="var(--grey-500)"
              icon="chevronDown"
              size="18"
            />
            <KInput
              :id="selectTextId"
              v-bind="modifiedAttrs"
              autocapitalize="off"
              autocomplete="off"
              class="k-select-input"
              :class="{
                'cursor-default prevent-pointer-events': !filterIsEnabled,
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
                class="d-inline-flex w-100 custom-selected-item"
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
              class="k-select-list ma-0 pa-0"
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
                v-if="!filteredItems.length && !$slots.empty"
                key="k-select-empty-state"
                class="k-select-empty-item"
                :item="{ label: 'No results', value: 'no_results' }"
              />
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
import { ref, Ref, computed, watch, PropType, nextTick, useAttrs, useSlots } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KSelectItems from '@/components/KSelect/KSelectItems.vue'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'
import { PopPlacements } from '@/types'

export default {
  inheritAttrs: false,
}

export interface SelectItem {
  label: string
  value: string | number
  key?: string
  selected?: boolean
  disabled?: boolean
  group?: string
}

export interface SelectFilterFnParams {
  items: SelectItem[]
  query: string
}

export type DropdownFooterTextPosition = 'sticky' | 'static'

</script>

<script setup lang="ts">
const { getSizeFromString, stripRequiredLabel } = useUtilities()

const defaultKPopAttributes = {
  popoverClasses: 'k-select-popover mt-0',
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
    type: String,
    default: 'dropdown',
    validator: (value: string) => ['dropdown', 'select', 'button'].includes(value),
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
    type: String as PropType<DropdownFooterTextPosition>,
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
})

const emit = defineEmits(['selected', 'input', 'change', 'update:modelValue', 'query-change'])

const attrs = useAttrs()
const slots = useSlots()

const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const filterStr = ref('')
const selectedItem = ref<SelectItem|null>(null)
const selectId = computed((): string => props.testMode ? 'test-select-id-1234' : uuidv1())
const selectInputId = computed((): string => props.testMode ? 'test-select-input-id-1234' : uuidv1())
const selectTextId = computed((): string => props.testMode ? 'test-select-text-id-1234' : uuidv1())
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
    const item = selectItems.value.filter((item: SelectItem) => item.value === newValue)
    if (item.length) {
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

const hasCustomSelectedItem = computed((): boolean => !!(selectedItem.value && props.appearance === 'select' && (slots['selected-item-template'] || (props.reuseItemTemplate && slots['item-template']))))

const onInputKeypress = (event: Event) => {
  // If filters are not enabled, ignore any keypresses
  if (!filterIsEnabled.value) {
    event.preventDefault()
    return false
  }
}

const handleItemSelect = (item: SelectItem) => {
  selectItems.value.forEach(anItem => {
    if (anItem.key === item.key) {
      anItem.selected = true
      anItem.key = anItem?.key?.includes('-selected') ? anItem.key : `${anItem.key}-selected`
      anItem.key += '-selected'
      selectedItem.value = anItem
    } else if (anItem.selected) {
      anItem.selected = false
      anItem.key = anItem?.key?.replace(/-selected/gi, '')
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
  selectItems.value.forEach(anItem => {
    anItem.selected = false
    anItem.key = anItem?.key?.replace(/-selected/gi, '')
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
    const item = selectItems.value.filter((item: SelectItem) => item.value === newVal)
    if (item.length) {
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
  for (let i = 0; i < selectItems.value.length; i++) {
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
@import '@/styles/variables';
@import '@/styles/functions';

.k-select {
  width: fit-content; // necessary for correct placement of popup
  .k-select-item-selection {
    background-color: var(--blue-100);
    border-radius: 4px;
    color: var(--blue-500);
    display: flex;
    font-weight: 400;
    margin-bottom: 6px;

    &.overlay-label-item-selection {
      position: relative;
      top: -8px;
    }

    .clear-selection-icon {
      height: 24px;
      margin-bottom: auto;
      margin-left: auto;
      margin-top: auto;
      padding: 0;
    }
  }

  .k-select-trigger:after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid;
    content: "";
    display: inline-block;
    height: 0;
    margin-left: var(--spacing-xs, spacing(xs));
    vertical-align: middle;
    width: 0;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';
@import '@/styles/functions';

@mixin boxShadow($color, $whiteShadowSpred: 2px, $colorShadowSpread: 4px) {
  box-shadow: 0 0 0 $whiteShadowSpred var(--white, color(white)), 0 0 0 $colorShadowSpread $color;
}

// allows setting a maxHeight on the popover dropdown
@mixin kSelectPopoverMaxHeight {
  max-height: v-bind('popoverContentMaxHeight');
  overflow-y: auto;
}

.k-select {
  .k-select-selected-item-label {
    align-self: center;
    font-size: 14px;
    line-height: 16px;
  }

  .k-select-item-selection {
    .clear-selection-icon {
      .kong-icon {
        margin-left: auto;
      }
    }
  }

  .k-button.btn-link {
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-lg, spacing(lg));
    text-decoration: none;

    &:focus {
      @include boxShadow(var(--KButtonOutlineBorder, var(--blue-500, color(blue-500))), 0, 2px);
    }

    .caret {
      margin-left: auto;
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
      margin-right: 10px;
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
          color: var(--KInputColor, var(--black-70, rgba(0, 0, 0, 0.7))) !important;
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

    .k-input.has-chevron {
      padding-right: 40px;
    }

    .k-input.has-clear {
      padding-right: 60px;
    }

    &input.k-input {
      height: 100%;
      padding: var(--spacing-xs);
    }

    .kong-icon {
      display: inline-flex;
    }

    .clear-selection-icon {
      padding: 0;
      position: absolute;
      right: 30px;
      top: 13px;
      z-index: 9;
      &.overlay-label-clear {
        top: 36px;
      }
      .kong-icon-clear {
        display: block;
        position: static;
        transform: none;
      }
    }

    .custom-selected-item {
      padding: 10px var(--spacing-md, spacing(md));
      pointer-events: none;
      position: absolute;
    }
  }

  div.k-select-input.select-input-container {
    align-items: center;
    border: 1px solid var(--grey-300);
    border-radius: 3px;
    cursor: pointer !important;
    display: flex;
    flex: 0 0 40%;
    flex-direction: row-reverse;
    transition: all 0.1s ease;

    .k-input-wrapper  {
      border-radius: 3px;
    }

    input.k-input {
      box-shadow: none !important;
    }

    &:hover {
      border-color: var(--KInputHover, var(--blue-200));

      .text-on-input label {
        color: var(--KInputHover, var(--blue-500));
      }
    }

    &.is-open {
      border-color: var(--KInputFocus, var(--blue-400));

      .text-on-input label {
        color: var(--KInputHover, var(--blue-500));
      }
    }
  }

  .k-select-button .has-caret .kong-icon {
    margin-left: auto;
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
    margin-top: 2px !important;
    width: 100%;

    &[x-placement^="top"] {
      margin-bottom: 2px !important;
      margin-top: 0 !important;
    }

    &.k-select-pop-button {
      --KPopPaddingY: var(--spacing-xs);
      --KPopPaddingX: var(--spacing-xs);
      border: 1px solid var(--grey-300);
    }

    &.k-select-pop-dropdown {
      --KPopPaddingY: var(--spacing-xs);
      --KPopPaddingX: var(--spacing-xs);
      border: 1px solid var(--grey-300);
    }

    &.k-select-pop-select {
      --KPopPaddingY: var(--spacing-xs);
      --KPopPaddingX: var(--spacing-xs);
      border: 1px solid var(--black-10);
    }

    .k-select-empty-item button,
    .k-select-empty-item button:focus,
    .k-select-empty-item button:hover {
      color: var(--grey-500);
      font-style: italic;
    }

    ul {
      margin: 0;
      padding: 0;
    }

    a {
      color: var(--black-70);
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
      background-color: color(white);
      border-top: 1px solid var(--grey-200);
      color: color(grey-500);
      padding: var(--spacing-xs);
      padding-bottom: 0;
    }
  }
}
</style>
