<template>
  <div
    :style="widthStyle"
    class="k-multiselect"
    :class="[$attrs.class]"
  >
    <KLabel
      v-if="label && !overlayLabel"
      :for="multiselectId"
      v-bind="labelAttributes"
      data-testid="k-multiselect-label"
    >
      {{ label }}
    </KLabel>
    <div
      :id="multiselectId"
      data-testid="k-multiselect-container"
    >
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
          :target="`[id='${multiselectInputId}']`"
          @opened="() => {
            filterStr = ''
            toggle()
            onPopoverOpen()
          }"
          @closed="() => {
            if (isToggled.value) {
              toggle()
            }
          }"
        >
          <div
            role="listbox"
            class="k-multiselect-trigger"
            data-testid="k-multiselect-trigger"
            @click="evt => {
              if ($attrs.disabled !== undefined && String($attrs.disabled) !== 'false') {
                evt.stopPropagation()
              }
            }"
          >
            <!-- v-if="isToggled.value && selectedItems.length" -->
            <div
              :id="multiselectSelectedItemsId"
              class="k-multiselect-selections"
            >
              <KBadge
                v-for="item in visibleSelectedItems"
                :key="`${item ? item.key : ''}-badge`"
                shape="rectangular"
                dismissable
                class="mr-1 mt-2"
              >
                {{ item ? item.label : '' }}
              </KBadge>
              <KBadge
                v-if="invisibleSelectedItems.length"
                shape="rectangular"
                class="mt-2"
              >
                +{{ invisibleSelectedItems.length }}
              </KBadge>
            </div>
            <div class="k-multiselect-icon">
              <KButton
                v-if="!loading && selectedItems.length && isToggled.value"
                :class="{ 'overlay-label-clear': overlayLabel }"
                class="non-visual-button pa-0 k-multiselect-clear-icon"
                @click="clearSelection"
                @keyup.enter="clearSelection"
              >
                <KIcon
                  icon="close"
                  color="var(--grey-500)"
                  size="12"
                />
              </KButton>
              <KIcon
                v-if="loading || !selectedItems.length"
                :icon="loading ? 'spinner' : 'chevronDown'"
                color="var(--grey-500)"
                size="18"
                :class="{
                  'overlay-label-icon': overlayLabel,
                  'in-selection-box': selectedItems.length
                }"
                class="k-multiselect-chevron-icon"
              />
            </div>
            <div :id="multiselectInputId">
              <KInput
                :id="multiselectTextId"
                v-bind="modifiedAttrs"
                :model-value="filterStr"
                :label="label && overlayLabel ? label : undefined"
                :overlay-label="overlayLabel"
                :placeholder="getPlaceholderText(isToggled.value)"
                autocomplete="off"
                autocapitalize="off"
                class="k-multiselect-input input-placeholder-dark mt-1"
                @keyup="evt => triggerFocus(evt, isToggled)"
                @update:model-value="onQueryChange"
                @focus="onInputFocus"
              />
            </div>
          </div>
          <template #content>
            <slot
              v-if="autosuggest && loading"
              name="loading"
            >
              <KIcon
                class="k-multiselect-loading"
                data-testid="k-multiselect-loading"
                icon="spinner"
              />
            </slot>
            <div
              v-else
              class="k-multiselect-list ma-0 pa-0"
            >
              <KMultiselectItem
                v-for="item in filteredItems"
                :key="item.key"
                :item="item"
                @selected="handleItemSelect"
              >
                <template #content>
                  <slot
                    :item="item"
                    name="item-template"
                    class="k-multiselect-item-label k-multiselect-item-desc"
                  />
                </template>
              </KMultiselectItem>
              <KMultiselectItem
                v-if="!filteredItems.length && !$slots.empty"
                key="k-multiselect-empty-state"
                :item="{ label: 'No results', value: 'no_results' }"
                class="k-multiselect-empty-item"
              />
            </div>
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
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'

const { getSizeFromString } = useUtilities()
const SELECTED_ITEMS_MAX_HEIGHT = 34

const defaultKPopAttributes = {
  popoverClasses: 'k-multiselect-popover mt-0',
  popoverTimeout: 0,
  placement: 'bottomStart',
  hideCaret: true,
}

export interface MultiselectItem {
  label: string
  value: string | number
  key?: string
  selected?: boolean
}

export interface MultiselectFilterFnParams {
  items: MultiselectItem[]
  query: string
}

export default defineComponent({
  name: 'KMultiselect',
  components: {
    KButton,
    KIcon,
    KInput,
    KLabel,
    KPop,
    KMultiselectItem,
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
     * The width of the multiselect and popover's min-width
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
     * Items are JSON objects with required 'label' and 'value'
     * {
     *  label: 'Item 1',
     *  value: 'item1'
     * }
     */
    items: {
      type: Array as PropType<MultiselectItem[]>,
      required: false,
      default: () => [],
      // Items must have a label & value
      validator: (items: MultiselectItem[]) => !items.length || items.some(i => i.label !== undefined && i.value !== undefined),
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
      default: (params: MultiselectFilterFnParams) => params.items.filter((item: MultiselectItem) => item.label.toLowerCase().includes(params.query.toLowerCase())),
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
    const selectedItems = ref<MultiselectItem[]>([])
    const multiselectId = computed((): string => props.testMode ? 'test-multiselect-id-1234' : uuidv1())
    const multiselectInputId = computed((): string => props.testMode ? 'test-multiselect-input-id-1234' : uuidv1())
    const multiselectTextId = computed((): string => props.testMode ? 'test-multiselect-text-id-1234' : uuidv1())
    const multiselectSelectedItemsId = computed((): string => props.testMode ? 'test-multiselect-selected-id-1234' : uuidv1())
    const unfilteredItems: Ref<MultiselectItem[]> = ref([])
    const initialFocusTriggered: Ref<boolean> = ref(false)
    const popper = ref(null)
    // we need this so we can create a watcher for programmatic changes to the modelValue
    const value = computed({
      get(): string | number {
        return props.modelValue
      },
      set(newValue: string | number): void {
        const item = unfilteredItems.value.filter((item: MultiselectItem) => item.value === newValue)
        if (item.length) {
          handleItemSelect(item[0])
        } else if (!newValue) {
          clearSelection()
        }
      },
    })

    const widthValue = computed(() => {
      let w = ''
      if (!props.width) {
        w = '205'
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

    const visibleSelectedItems = ref<MultiselectItem[]>([])
    const invisibleSelectedItems = ref<MultiselectItem[]>([])
    const selectedItemsHeight = computed(() => {
      // use the if statement to make this computed reactive to changes to selectedItems
      if (selectedItems.value.length) {
        const elem = document.getElementById(multiselectSelectedItemsId.value)

        if (elem) {
          return elem.clientHeight
        }
      }

      return null
    })

    watch(selectedItems.value, () => {
      nextTick(() => {
        // make sure we don't grow past the max height of the selected items box
        if (selectedItemsHeight.value && selectedItemsHeight.value > SELECTED_ITEMS_MAX_HEIGHT) {
          const item = visibleSelectedItems.value.pop()
          if (item) {
            invisibleSelectedItems.value.push(item)
          }
        }
      })
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
        popoverClasses: `${defaultKPopAttributes.popoverClasses} ${props.kpopAttributes.popoverClasses} k-multiselect-pop`,
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
      return props.autosuggest ? unfilteredItems.value : props.filterFunc({ items: unfilteredItems.value, query: filterStr.value })
    })

    const getPlaceholderText = (isOpen?: boolean): string => {
      if (props.placeholder) {
        return props.placeholder
      } else if (attrs.placeholder) {
        return attrs.placeholder as string
      }
      // TODO: singular vs plural
      return selectedItems.value.length && !isOpen ? `${selectedItems.value.length} items selected` : 'Filter...'
    }

    const handleItemSelect = (item: MultiselectItem) => {
      const selectedItem = unfilteredItems.value.filter(anItem => anItem.key === item.key)[0]
      // if clicked item is already selected
      if (selectedItem.selected) {
        selectedItem.selected = false
        selectedItem.key = selectedItem?.key?.replace(/-selected/gi, '')
        selectedItems.value = selectedItems.value.filter(anItem => anItem.key !== item.key)
        // remove item from visibility arrays
        if (visibleSelectedItems.value.includes(item)) {
          visibleSelectedItems.value = visibleSelectedItems.value.filter(anItem => anItem.key !== item.key)
        } else if (invisibleSelectedItems.value.includes(item)) {
          invisibleSelectedItems.value = invisibleSelectedItems.value.filter(anItem => anItem.key !== item.key)
        }
        // if some items are hidden grab the first hidden one and add it into the visible array
        if (invisibleSelectedItems.value.length) {
          const item = invisibleSelectedItems.value.pop()
          if (item) {
            visibleSelectedItems.value.push(item)
          }
        }
      } else { // newly selected item
        selectedItem.selected = true
        selectedItem.key = selectedItem?.key?.includes('-selected') ? selectedItem.key : `${selectedItem.key}-selected`
        selectedItem.key += '-selected'
        selectedItems.value.push(selectedItem)
        visibleSelectedItems.value.push(selectedItem)
      }

      emit('selected', item)
      // this 'input' event must be emitted for v-model binding to work properly
      emit('input', item.value)
      emit('change', item)
      emit('update:modelValue', item.value)
    }

    const clearSelection = (): void => {
      unfilteredItems.value.forEach(anItem => {
        anItem.selected = false
        anItem.key = anItem?.key?.replace(/-selected/gi, '')
      })
      selectedItems.value = []
      filterStr.value = ''
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

      const inputElem = document.getElementById(multiselectTextId.value)
      if (!isToggled.value && inputElem) { // simulate click to trigger dropdown open
        inputElem.click()
      }
    }

    const onQueryChange = (query: string) => {
      filterStr.value = query
      emit('query-change', query)
    }

    const onInputFocus = (): void => {
      if (!initialFocusTriggered.value) {
        initialFocusTriggered.value = true
        emit('query-change', '')
      }
    }

    watch(value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const item = unfilteredItems.value.filter((item: MultiselectItem) => item.value === newVal)
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

      unfilteredItems.value = JSON.parse(JSON.stringify(props.items))
      for (let i = 0; i < unfilteredItems.value.length; i++) {
        // Ensure each item has a `selected` property
        if (unfilteredItems.value[i].selected === undefined) {
          unfilteredItems.value[i].selected = false
        }

        unfilteredItems.value[i].key = `${unfilteredItems.value[i].label?.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${i}` || `k-multiselect-item-label-${i}`
        if (unfilteredItems.value[i].value === props.modelValue || unfilteredItems.value[i].selected) {
          unfilteredItems.value[i].selected = true
          selectedItems.value.push(unfilteredItems.value[i])
          visibleSelectedItems.value.push(unfilteredItems.value[i])
          unfilteredItems.value[i].key += '-selected'
        }

        /* if (selectedItems.value?.value === unfilteredItems.value[i].value) {
          unfilteredItems.value[i].selected = true
        } */
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
      const inputElem = document.getElementById(multiselectInputId.value)

      if (inputElem) {
        inputWidth.value = inputElem.offsetWidth
      }
    }

    return {
      filterStr,
      selectedItems,
      invisibleSelectedItems,
      visibleSelectedItems,
      multiselectId,
      multiselectInputId,
      multiselectTextId,
      multiselectSelectedItemsId,
      unfilteredItems,
      modifiedAttrs,
      popper,
      boundKPopAttributes,
      selectedItemsHeight,
      widthValue,
      widthStyle,
      filteredItems,
      getPlaceholderText,
      handleItemSelect,
      clearSelection,
      triggerFocus,
      inputWidth,
      onQueryChange,
      onInputFocus,
      onPopoverOpen,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-multiselect {
  width: fit-content; // necessary for correct placement of popup

  .k-multiselect-selections {
    max-width: 100%;
    margin-left: 16px;
    margin-right: 26px;
    max-height: 68px;
    overflow: hidden;
  }

  .k-multiselect-icon {
    position: absolute;
    z-index: 1;
    right: 1px;
    top: 1px;

    .k-multiselect-chevron-icon {
      position: relative;
      top: 9px;
      right: 10px;
    }

    .k-multiselect-clear-icon {
      position: relative;
      top: 8px;
      right: 10px;
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-multiselect {
  .k-multiselect-trigger {
    display: inline-block;
    position: relative;
    box-shadow: inset 0 0 0 1px var(--KInputBorder, var(--grey-300)) !important;

    &:hover {
      box-shadow: inset 0 0 0 1px var(--KInputHover, var(--blue-200)) !important;
    }

    &:focus {
      box-shadow: inset 0 0 0 1px var(--KInputFocus, var(--blue-400)) !important;
    }

    .k-multiselect-input {
      position: relative;
      display: inline-block;
      width: 100%;

      &.prevent-pointer-events {
        pointer-events: none;
      }

      &.input-placeholder-dark::placeholder {
        color: var(--KInputColor, var(--black-70, rgba(0, 0, 0, 0.7))) !important;
      }

      input.k-input {
        height: 100%;
        width: 99%;
        margin: 1px;
        padding-right: 30px;
        box-shadow: none !important;

        &:hover,
        &:focus {
          box-shadow: none !important;
        }
      }
    }

    &.k-input {
      width: 100%;  // need this so input takes the k-input-wrapper's width which uses this.width prop
    }
  }

  .k-multiselect-popover {
    box-sizing: border-box;
    width: 100%;
    margin-top: 2px !important;
    overflow: auto !important; // Allow setting a maxHeight on the popover dropdown

    &[x-placement^="top"] {
      margin-top: 0 !important;
      margin-bottom: 2px !important;
    }

    &.k-multiselect-pop {
      --KPopPaddingY: var(--spacing-xs);
      --KPopPaddingX: var(--spacing-xs);
      border: 1px solid var(--black-10);
    }

    .k-multiselect-empty-item button,
    .k-multiselect-empty-item button:focus,
    .k-multiselect-empty-item button:hover {
      font-style: italic;
      color: var(--grey-400);
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

    .k-multiselect-loading {
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
