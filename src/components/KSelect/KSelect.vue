<template>
  <div
    :style="widthStyle"
    class="k-select"
    :class="[$attrs.class]"
  >
    <KLabel
      v-if="label && !overlayLabel"
      :for="selectId"
      v-bind="labelAttributes"
      data-testid="k-select-label"
    >
      {{ label }}
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
        <div
          class="selected-item-label"
        >
          {{ selectedItem.label }}
        </div>
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
          :test-mode="!!testMode || undefined"
          :target="`[id='${selectInputId}']`"
          @opened="() => {
            filterStr = ''
            toggle()
            onPopoverOpen()
          }"
          @closed="() => {
            if (selectedItem && appearance === 'select') {
              filterStr = selectedItem.label
            }
            if (isToggled.value) {
              toggle()
            }
          }"
        >
          <div
            v-if="appearance === 'button'"
            :id="selectInputId"
            class="k-select-button"
            data-testid="k-select-input"
            style="position: relative;"
            role="listbox"
          >
            <KButton
              :id="selectTextId"
              :style="widthStyle"
              show-caret
              :is-rounded="false"
              v-bind="modifiedAttrs"
              appearance="btn-link"
              @keyup="evt => triggerFocus(evt, isToggled)"
            >
              {{ selectButtonText }}
            </KButton>
          </div>
          <div
            v-else
            :id="selectInputId"
            :class="{ 'k-select-input': appearance === 'select', 'no-filter': !filterIsEnabled }"
            data-testid="k-select-input"
            style="position: relative;"
            role="listbox"
            @click="evt => {
              if ($attrs.disabled !== undefined && String($attrs.disabled) !== 'false') {
                evt.stopPropagation()
              }
            }"
          >
            <KButton
              v-if="isClearVisible"
              :class="{ 'overlay-label-clear': overlayLabel }"
              class="clear-selection-icon cursor-pointer non-visual-button"
              @click="clearSelection"
              @keyup.enter="clearSelection"
            >
              <KIcon
                icon="clear"
                color="var(--grey-500)"
                size="18"
              />
            </KButton>
            <KIcon
              v-if="appearance === 'select'"
              icon="chevronDown"
              color="var(--grey-500)"
              size="18"
              :class="{ 'overlay-label-chevron': overlayLabel }"
            />
            <KInput
              :id="selectTextId"
              v-bind="modifiedAttrs"
              :model-value="filterStr"
              :label="label && overlayLabel ? label : undefined"
              :overlay-label="overlayLabel"
              :placeholder="selectedItem && appearance === 'select' && !filterIsEnabled ? selectedItem.label : placeholderText"
              autocomplete="off"
              autocapitalize="off"
              :class="{
                'cursor-default prevent-pointer-events': !filterIsEnabled,
                'input-placeholder-dark has-chevron': appearance === 'select',
                'has-clear': isClearVisible
              }"
              class="k-select-input"
              @keypress="onInputKeypress"
              @keyup="evt => triggerFocus(evt, isToggled)"
              @update:model-value="onQueryChange"
              @focus="onInputFocus"
              @blur="onInputBlur"
            />
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
            <ul
              v-else
              class="k-select-list ma-0 pa-0"
            >
              <KSelectItem
                v-for="item in filteredItems"
                :key="item.key"
                :item="item"
                @selected="handleItemSelect"
              >
                <template #content>
                  <slot
                    :item="item"
                    name="item-template"
                    class="select-item-label select-item-desc"
                  />
                </template>
              </KSelectItem>
              <KSelectItem
                v-if="!filteredItems.length && !$slots.empty"
                key="k-select-empty-state"
                :item="{ label: 'No results', value: 'no_results' }"
                class="k-select-empty-item"
              />
            </ul>
            <slot
              v-if="!loading && !filteredItems.length"
              name="empty"
            />
          </template>
        </KPop>
      </KToggle>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, PropType, nextTick } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'

const { getSizeFromString } = useUtilities()

const defaultKPopAttributes = {
  popoverClasses: 'k-select-popover mt-0',
  popoverTimeout: 0,
  placement: 'bottomStart',
  hideCaret: true,
}

export interface SelectItem {
  label: string
  value: string | number
  key?: string
  selected?: boolean
}

export interface SelectFilterFnParams {
  items: SelectItem[]
  query: string
}

export default defineComponent({
  name: 'KSelect',
  components: {
    KButton,
    KIcon,
    KInput,
    KLabel,
    KPop,
    KSelectItem,
    KToggle,
  },
  inheritAttrs: false,
  props: {
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
      validator: (items: SelectItem[]) => !items.length || items.some(i => i.label !== undefined && i.value !== undefined),
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
      default: (params: SelectFilterFnParams) => params.items.filter((item: SelectItem) => item.label.toLowerCase().includes(params.query.toLowerCase())),
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
     * A flag for clearing selection when appearance is 'select'
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
  },
  emits: ['selected', 'input', 'change', 'update:modelValue', 'query-change'],
  setup(props, { attrs, emit }) {
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
        maxHeight: String(props.dropdownMaxHeight),
        disabled: (attrs.disabled !== undefined && String(attrs.disabled) !== 'false') || (attrs.readonly !== undefined && String(attrs.readonly) !== 'false'),
      }
    })

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

    return {
      filterStr,
      selectedItem,
      selectId,
      selectInputId,
      selectTextId,
      selectItems,
      modifiedAttrs,
      popper,
      boundKPopAttributes,
      widthValue,
      widthStyle,
      filteredItems,
      placeholderText,
      selectButtonText,
      isClearVisible,
      handleItemSelect,
      clearSelection,
      triggerFocus,
      inputWidth,
      filterIsEnabled,
      onInputKeypress,
      onQueryChange,
      onInputFocus,
      onInputBlur,
      onPopoverOpen,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-select {
  width: fit-content; // necessary for correct placement of popup
  .k-select-item-selection {
    background-color: var(--blue-100);
    color: var(--blue-500);
    font-weight: 400;
    display: flex;
    border-radius: 4px;
    margin-bottom: 6px;

    &.overlay-label-item-selection {
      position: relative;
      top: 15px;
    }

    .selected-item-label {
      align-self: center;
      font-size: 14px;
      line-height: 16px;
    }

    .clear-selection-icon {
      margin-left: auto;
      margin-top: auto;
      margin-bottom: auto;
      padding: 0;
      height: 24px;
    }
  }

  .k-select-trigger:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: var(--spacing-xs, spacing(xs));
    vertical-align: middle;
    content: "";
    border-top: 0.325em solid;
    border-right: 0.325em solid transparent;
    border-left: 0.325em solid transparent;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-select {
  .k-select-item-selection {
    .clear-selection-icon {
      .kong-icon {
        margin-left: auto;
      }
    }
  }

  .k-button .caret {
    margin-left: auto;
  }

  .k-select-input {
    position: relative;
    display: inline-block;
    width: 100%;

    &.cursor-default {
      cursor: default;
    }

    &.prevent-pointer-events {
      pointer-events: none;
    }

    &.input-placeholder-dark::placeholder {
      color: var(--KInputColor, var(--black-70, rgba(0, 0, 0, 0.7))) !important;
    }

    .k-input.has-chevron {
      padding-right: 40px;
    }

    .k-input.has-clear {
      padding-right: 60px;
    }

    &input.k-input {
      padding: var(--spacing-xs);
      height: 100%;
    }

    .kong-icon {
      position: absolute;
      top: 60%;
      right: 16px;
      transform: translateY(-50%);
      z-index: 9;

      &.overlay-label-chevron {
        top: 70%;
      }
    }

    .clear-selection-icon {
      position: absolute;
      top: 13px;
      right: 30px;
      z-index: 9;
      padding: 0;
      &.overlay-label-clear {
        top: 36px;
      }
      .kong-icon-clear {
        position: static;
        display: block;
        transform: none;
      }
    }
  }

  div.k-select-input.no-filter {
    cursor: pointer !important;
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
    width: 100%;
    margin-top: 2px !important;
    overflow: auto !important; // Allow setting a maxHeight on the popover dropdown

    &[x-placement^="top"] {
      margin-top: 0 !important;
      margin-bottom: 2px !important;
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
      font-style: italic;
      color: var(--grey-400);
    }

    ul {
      margin: 0;
      padding: 0;
    }

    a {
      flex: 1;
      color: var(--black-70);

      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
      }
    }

    .k-select-loading {
      display: block;
      text-align: center;
      position: relative;
      top: 0;
      right: 0;
      height: 24px;
    }
  }
}
</style>
