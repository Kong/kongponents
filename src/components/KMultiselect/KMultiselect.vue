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
            return
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
              sortItems()
            }
          }"
        >
          <div
            role="listbox"
            :style="widthStyle"
            class="k-multiselect-trigger"
            data-testid="k-multiselect-trigger"
            @click="evt => {
              if ($attrs.disabled !== undefined && String($attrs.disabled) !== 'false') {
                evt.stopPropagation()
              }
            }"
          >
            <div
              v-if="isToggled.value && selectedItems.length"
              :id="multiselectSelectedItemsId"
              :key="key"
              :style="widthStyle"
              class="k-multiselect-selections"
              @click.stop
            >
              <KBadge
                v-for="item, idx in visibleSelectedItems"
                :key="`${item ? item.key : idx}-badge`"
                shape="rectangular"
                :truncation-tooltip="item.label"
                dismissable
                class="mr-1 mt-2"
                @dismissed="handleItemSelect(item)"
              >
                {{ item.label }}
              </KBadge>
              <!-- Always render this badge even if it's hidden to ensure there will be
                   enough space to show it -->
              <KBadge
                shape="rectangular"
                :truncation-tooltip="hiddenItemsTooltip"
                :class="{ 'hidden': !invisibleSelectedItems.length }"
                class="mt-2 hidden-selection-count"
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
                v-else
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
            <div
              :id="multiselectInputId"
              :style="widthStyle"
            >
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
                @click="evt => {
                  if (isToggled.value) {
                    evt.stopPropagation()
                  }
                }"
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
              @click="evt => {
                // don't close drop down when selecting/deselecting items
                evt.stopPropagation()
              }"
            >
              <KMultiselectItem
                v-for="item in sortedItems"
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
                v-if="!sortedItems.length && !$slots.empty"
                key="k-multiselect-empty-state"
                :item="{ label: 'No results', value: 'no_results' }"
                class="k-multiselect-empty-item"
              />
            </div>
            <slot
              v-if="!loading && !sortedItems.length"
              name="empty"
            />
          </template>
        </KPop>
      </KToggle>
    </div>
    <div class="staging-area">
      <div
        :id="multiselectSelectedItemsStagingId"
        :key="stagingKey"
        :style="widthStyle"
        class="k-multiselect-selections staging"
        tabindex="-1"
        aria-hidden="true"
      >
        <KBadge
          v-for="item in visibleSelectedItemsStaging"
          :key="`${item ? item.key : ''}-badge`"
          shape="rectangular"
          dismissable
          hidden
          class="mr-1 mt-2"
        >
          {{ item ? item.label : '' }}
        </KBadge>
        <!-- Always render this badge even if it's hidden to ensure there will be
             enough space to show it
        -->
        <KBadge
          shape="rectangular"
          hidden
          class="mt-2 hidden-selection-count"
        >
          +{{ invisibleSelectedItemsStaging.length }}
        </KBadge>
      </div>
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

const { getSizeFromString, cloneDeep } = useUtilities()
const SELECTED_ITEMS_SINGLE_LINE_HEIGHT = 34

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
    selectionRowCount: {
      type: Number,
      default: 2,
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
    const selectionsMaxHeight = computed((): number => {
      return props.selectionRowCount * SELECTED_ITEMS_SINGLE_LINE_HEIGHT
    })
    const multiselectId = computed((): string => props.testMode ? 'test-multiselect-id-1234' : uuidv1())
    const multiselectInputId = computed((): string => props.testMode ? 'test-multiselect-input-id-1234' : uuidv1())
    const multiselectTextId = computed((): string => props.testMode ? 'test-multiselect-text-id-1234' : uuidv1())
    const multiselectSelectedItemsId = computed((): string => props.testMode ? 'test-multiselect-selected-id-1234' : uuidv1())
    const multiselectSelectedItemsStagingId = computed((): string => props.testMode ? 'test-multiselect-selected-staging-id-1234' : uuidv1())
    const unfilteredItems: Ref<MultiselectItem[]> = ref([])
    const sortedItems: Ref<MultiselectItem[]> = ref([])
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
        w = '300'
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

    const key = ref(0)
    const stagingKey = ref(0)
    const visibleSelectedItemsStaging = ref<MultiselectItem[]>([])
    const invisibleSelectedItemsStaging = ref<MultiselectItem[]>([])
    const visibleSelectedItems = ref<MultiselectItem[]>([])
    const invisibleSelectedItems = ref<MultiselectItem[]>([])
    const hiddenItemsTooltip = computed(() => invisibleSelectedItems.value.map(item => item.label).join(', '))

    const stageSelections = () => {
      // make sure we don't grow past the max height of the selected items box
      setTimeout(() => {
        const elem = document.getElementById(multiselectSelectedItemsStagingId.value)

        if (elem) {
          console.log(`staging height: ${elem.clientHeight} - (${visibleSelectedItemsStaging.value.length} visible)/(${invisibleSelectedItemsStaging.value.length} hidden)`)
          const height = elem.clientHeight
          if (height > selectionsMaxHeight.value) {
            console.log('height too big')
            const item = visibleSelectedItemsStaging.value.pop()
            if (item) {
              invisibleSelectedItemsStaging.value.push(item)
              console.log(`staging: (${visibleSelectedItemsStaging.value.length} visible)/(${invisibleSelectedItemsStaging.value.length} hidden)`)
            }
          }
          console.log('redraw staging')
          stagingKey.value++
        }
      }, 0)
    }

    watch(stagingKey, () => {
      setTimeout(() => {
        const elem = document.getElementById(multiselectSelectedItemsStagingId.value)

        if (elem) {
          console.log(`final staging height: ${elem.clientHeight} - (${visibleSelectedItemsStaging.value.length} visible)/(${invisibleSelectedItemsStaging.value.length} hidden)`)
          const height = elem.clientHeight
          if (height > selectionsMaxHeight.value) {
            console.log('still too big')
            const item = visibleSelectedItemsStaging.value.pop()
            if (item) {
              invisibleSelectedItemsStaging.value.push(item)
              console.log(`staging: (${visibleSelectedItemsStaging.value.length} visible)/(${invisibleSelectedItemsStaging.value.length} hidden)`)
            }
            console.log('redraw staging')
            stagingKey.value++
          } else {
            console.log('staging within range')
            visibleSelectedItems.value = cloneDeep(visibleSelectedItemsStaging.value)
            invisibleSelectedItems.value = cloneDeep(invisibleSelectedItemsStaging.value)
            console.log(`final: (${visibleSelectedItems.value.length} visible)/(${invisibleSelectedItems.value.length} hidden)`)
            console.log('redraw final')
            console.log('-------------------------------------------')
            key.value++
          }
        }
      }, 0)
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
      if (selectedItems.value.length && !isOpen) {
        if (selectedItems.value.length === 1) {
          return `${selectedItems.value.length} item selected`
        }
        return `${selectedItems.value.length} items selected`
      }

      if (props.placeholder) {
        return props.placeholder
      } else if (attrs.placeholder) {
        return attrs.placeholder as string
      }

      return 'Filter...'
    }

    const handleItemSelect = (item: MultiselectItem) => {
      const selectedItem = unfilteredItems.value.filter(anItem => anItem.key === item.key)[0]
      // if clicked item is already selected
      if (selectedItem.selected) {
        selectedItems.value = selectedItems.value.filter(anItem => anItem.key !== item.key)
        // remove item from visibility arrays
        if (visibleSelectedItemsStaging.value.filter(anItem => anItem.key === item.key).length) {
          visibleSelectedItemsStaging.value = visibleSelectedItemsStaging.value.filter(anItem => anItem.key !== item.key)
        } else if (invisibleSelectedItemsStaging.value.filter(anItem => anItem.key === item.key).length) {
          invisibleSelectedItemsStaging.value = invisibleSelectedItemsStaging.value.filter(anItem => anItem.key !== item.key)
        }
        // deselect item
        selectedItem.selected = false
        selectedItem.key = selectedItem?.key?.replace(/-selected/gi, '')

        // if some items are hidden grab the first hidden one and add it into the visible array
        if (invisibleSelectedItemsStaging.value.length) {
          const item = invisibleSelectedItemsStaging.value.pop()
          if (item) {
            visibleSelectedItemsStaging.value.push(item)
          }
        }
      } else { // newly selected item
        selectedItem.selected = true
        selectedItem.key = selectedItem?.key?.includes('-selected') ? selectedItem.key : `${selectedItem.key}-selected`
        selectedItem.key += '-selected'
        selectedItems.value.push(selectedItem)
        visibleSelectedItemsStaging.value.push(selectedItem)
      }

      stageSelections()

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
      visibleSelectedItemsStaging.value = []
      invisibleSelectedItemsStaging.value = []
      filterStr.value = ''
      stageSelections()
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

    // sort dropdown items. Selected items displayed before unselected items
    const sortItems = () => {
      const selItems = filteredItems.value.filter((item: MultiselectItem) => item.selected)
      const unselItems = filteredItems.value.filter((item: MultiselectItem) => !item.selected)

      sortedItems.value = selItems.concat(unselItems)
    }

    // If filtered items change resort
    watch(filteredItems, () => {
      sortItems()
    })

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

      unfilteredItems.value = cloneDeep(props.items)
      for (let i = 0; i < unfilteredItems.value.length; i++) {
        // Ensure each item has a `selected` property
        if (unfilteredItems.value[i].selected === undefined) {
          unfilteredItems.value[i].selected = false
        }

        unfilteredItems.value[i].key = `${unfilteredItems.value[i].label?.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${i}` || `k-multiselect-item-label-${i}`
        if (unfilteredItems.value[i].value === props.modelValue || unfilteredItems.value[i].selected) {
          unfilteredItems.value[i].selected = true
          selectedItems.value.push(unfilteredItems.value[i])
          visibleSelectedItemsStaging.value.push(unfilteredItems.value[i])
          unfilteredItems.value[i].key += '-selected'
        }

        stageSelections()

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
      stagingKey,
      key,
      invisibleSelectedItemsStaging,
      visibleSelectedItemsStaging,
      invisibleSelectedItems,
      visibleSelectedItems,
      hiddenItemsTooltip,
      multiselectId,
      multiselectInputId,
      multiselectTextId,
      multiselectSelectedItemsStagingId,
      multiselectSelectedItemsId,
      unfilteredItems,
      modifiedAttrs,
      popper,
      boundKPopAttributes,
      widthStyle,
      sortedItems,
      getPlaceholderText,
      handleItemSelect,
      clearSelection,
      triggerFocus,
      inputWidth,
      sortItems,
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

  .staging-area {
    position: absolute;
    left: -99999px;
  }

  .k-multiselect-selections {
    --KBadgeMaxWidth: 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 23px;

    &.staging {
      position: relative;
      height: auto;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding-left: 16px;
      padding-right: 23px;
    }

    .hidden-selection-count {
      --KBadgeLineHeight: 21px;

      &.hidden {
        visibility: hidden;
      }
    }
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
