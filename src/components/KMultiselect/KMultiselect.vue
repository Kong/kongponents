<template>
  <div
    class="k-multiselect"
    :class="[$attrs.class]"
    :style="widthStyle"
  >
    <KLabel
      v-if="label"
      v-bind="labelAttributes"
      :data-testid="labelAttributes['data-testid'] ? labelAttributes['data-testid'] : 'k-multiselect-label'"
      :for="multiselectId"
    >
      {{ label }}
    </KLabel>
    <div
      :id="multiselectId"
      data-testid="k-multiselect-container"
    >
      <KToggle v-slot="{ isToggled, toggle }">
        <KPop
          ref="popper"
          v-bind="boundKPopAttributes"
          :on-popover-click="() => {
            return
          }"
          :position-fixed="positionFixed"
          :target="`[id='${multiselectInputId}']`"
          :test-mode="!!testMode || undefined"
          @closed="() => handleToggle(false, isToggled, toggle)"
          @opened="() => handleToggle(true, isToggled, toggle)"
        >
          <div
            ref="multiselectRef"
            class="k-multiselect-trigger w-100"
            :class="{ focused: isFocused, hovered: isHovered, disabled: isDisabled, readonly: isReadonly }"
            data-testid="k-multiselect-trigger"
            role="listbox"
            @click="handleFilterClick"
          >
            <div
              v-if="selectedItems.length && (isToggled.value || expandSelected)"
              :id="multiselectSelectedItemsId"
              :key="key"
              class="k-multiselect-selections"
              :class="{ 'scrollable my-2': expandSelected }"
              data-testid="k-multiselect-selections"
              :style="!expandSelected ? numericWidthStyle : nonSlimStyle"
            >
              <KBadge
                v-for="item, idx in visibleSelectedItems"
                :key="`${item.key ? item.key : idx}-badge`"
                class="mr-1"
                :class="!expandSelected ? 'mt-2' : 'my-1'"
                dismissable
                shape="rectangular"
                :truncation-tooltip="item.label"
                @click.stop
                @dismissed="handleItemSelect(item)"
              >
                {{ item.label }}
              </KBadge>
              <!-- Always render this badge even if it's hidden to ensure there will be enough space to show it -->
              <KBadge
                v-if="!expandSelected"
                class="mt-2 hidden-selection-count"
                :class="{ 'hidden': !invisibleSelectedItems.length }"
                force-tooltip
                shape="rectangular"
                :truncation-tooltip="hiddenItemsTooltip"
                @click.stop
              >
                +{{ invisibleSelectedItems.length }}
              </KBadge>
              <div
                v-if="expandSelected"
                ref="selectionBottomRef"
              />
            </div>
            <div class="k-multiselect-icon">
              <KButton
                v-if="!loading && selectedItems.length && isToggled.value"
                class="non-visual-button pa-0 k-multiselect-clear-icon"
                data-testid="k-multiselect-clear-icon"
                @click="clearSelection"
                @keyup.enter="clearSelection"
              >
                <KIcon
                  color="var(--grey-500)"
                  icon="close"
                  size="12"
                  title="Clear all selections"
                />
              </KButton>
              <KIcon
                v-else
                class="k-multiselect-chevron-icon"
                :class="{ 'in-selection-box': selectedItems.length }"
                color="var(--grey-500)"
                :icon="loading ? 'spinner' : 'chevronDown'"
                size="18"
              />
            </div>
            <div
              :id="multiselectInputId"
              :style="numericWidthStyle"
            >
              <KInput
                v-if="!expandSelected || (expandSelected && (!selectedItems.length || isToggled.value))"
                :id="multiselectTextId"
                v-bind="modifiedAttrs"
                autocapitalize="off"
                autocomplete="off"
                class="k-multiselect-input input-placeholder-dark"
                :class="{ 'mt-1': isToggled.value && selectedItems.length, 'is-readonly': isReadonly }"
                data-testid="k-multiselect-input"
                :model-value="filterStr"
                :placeholder="getPlaceholderText(isToggled.value)"
                :readonly="isReadonly ? true : undefined"
                type="text"
                @blur="() => isFocused = false"
                @click="(evt: any) => {
                  if (isToggled.value) {
                    evt.stopPropagation()
                  }
                }"
                @focus="onInputFocus"
                @keyup="(evt: any) => triggerFocus(evt, isToggled)"
                @mouseenter="() => isHovered = true"
                @mouseleave="() => isHovered = false"
                @update:model-value="onQueryChange"
              />
            </div>
          </div>
          <template #content>
            <!-- use @click.stop so we don't close drop down when selecting/deselecting items -->
            <div
              class="k-multiselect-list ma-0 pa-0"
              @blur="() => isFocused = false"
              @click.stop
              @focus="isFocused = true"
              @mouseenter="() => isHovered = true"
              @mouseleave="() => isHovered = false"
            >
              <KMultiselectItem
                v-for="item, idx in sortedItems"
                :key="`${item.key ? item.key : idx}-item`"
                :item="item"
                @selected="handleItemSelect"
              >
                <template #content>
                  <slot
                    class="k-multiselect-item"
                    :item="item"
                    name="item-template"
                  />
                </template>
              </KMultiselectItem>
              <KMultiselectItem
                v-if="enableItemCreation && uniqueFilterStr"
                key="k-multiselect-new-item"
                class="k-multiselect-new-item"
                data-testid="k-multiselect-add-item"
                :item="{ label: `${filterStr} (Add new value)`, value: 'add_item' }"
                @selected="handleAddItem"
              >
                <template #content>
                  <div class="select-item-description">
                    {{ filterStr }}
                    <span class="select-item-new-indicator">(Add new value)</span>
                  </div>
                </template>
              </KMultiselectItem>
              <KMultiselectItem
                v-if="!sortedItems.length && !$slots.empty && !enableItemCreation"
                key="k-multiselect-empty-state"
                class="k-multiselect-empty-item"
                data-testid="k-multiselect-empty-item"
                :item="{ label: 'No results found', value: 'no_results' }"
              >
                <template #content>
                  <div class="select-item-label">
                    No results found
                  </div>
                  <div class="select-item-desc">
                    Please adjust the criteria and try again
                  </div>
                </template>
              </KMultiselectItem>
            </div>
            <slot
              v-if="!loading && !sortedItems.length"
              name="empty"
            />
          </template>
        </KPop>
      </KToggle>
    </div>
    <div
      v-if="!expandSelected"
      aria-hidden="true"
      class="staging-area"
    >
      <div
        :id="multiselectSelectedItemsStagingId"
        :key="stagingKey"
        class="k-multiselect-selections staging"
        :style="numericWidthStyle"
        tabindex="-1"
      >
        <KBadge
          v-for="item, idx in visibleSelectedItemsStaging"
          :key="`${item.key ? item.key : idx}-badge`"
          class="mr-1 mt-2"
          dismissable
          hidden
          shape="rectangular"
        >
          {{ item.label }}
        </KBadge>
        <!-- Always render this badge even if it's hidden to ensure there will be enough space to show it -->
        <KBadge
          v-if="!expandSelected"
          class="mt-2 hidden-selection-count"
          hidden
          shape="rectangular"
        >
          +{{ invisibleSelectedItemsStaging.length }}
        </KBadge>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, computed, watch, PropType, nextTick, onMounted, useAttrs } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KBadge from '@/components/KBadge/KBadge.vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'

export interface MultiselectItem {
  label: string
  value: string
  key?: string
  selected?: boolean
  disabled?: boolean
  custom?: boolean
}

export interface MultiselectFilterFnParams {
  items: MultiselectItem[]
  query: string
}

// functions used in prop validators
const getValues = (items: MultiselectItem[]) => {
  const vals:string[] = []
  items.forEach((item: MultiselectItem) => vals.push(item.value))

  return vals
}

const itemValuesAreUnique = (items: MultiselectItem[]): boolean => {
  const vals = getValues(items)
  const uniqueValues = new Set(vals)

  return vals.length === uniqueValues.size
}

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const attrs = useAttrs()
const { getSizeFromString, cloneDeep } = useUtilities()
const SELECTED_ITEMS_SINGLE_LINE_HEIGHT = 34

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
  labelAttributes: {
    type: Object,
    default: () => ({}),
  },
  placeholder: {
    type: String,
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
  /**
   * The width of the multiselect and popover's min-width
   */
  width: {
    type: String,
    default: '',
  },
  /**
   * Number of rows of selections to show when focused
   */
  selectedRowCount: {
    type: Number,
    default: 2,
  },
  /**
   * Determines whether or not to hide the selections when not focused,
   * and whether or not to move items displayed beyond the selectedRowCount
   * into a +n badge, or allow the sections to be scrollable.
   */
  expandSelected: {
    type: Boolean,
    default: false,
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
    default: () => [],
    // Items must have a label & value
    validator: (items: MultiselectItem[]) => !items.length || (items.every(i => i.label !== undefined && i.value !== undefined) && itemValuesAreUnique(items)),
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
   * Allow creating new items
   */
  enableItemCreation: {
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
})

const emit = defineEmits(['selected', 'item:added', 'item:removed', 'input', 'change', 'update:modelValue', 'query-change'])

const defaultKPopAttributes = {
  hideCaret: true,
  placement: 'bottomStart',
  popoverTimeout: 0,
  popoverClasses: 'k-multiselect-popover mt-0',
}

// keys and ids
const key = ref(0)
const stagingKey = ref(0)
const multiselectId = computed((): string => props.testMode ? 'test-multiselect-id-1234' : uuidv1())
const multiselectInputId = computed((): string => props.testMode ? 'test-multiselect-input-id-1234' : uuidv1())
const multiselectTextId = computed((): string => props.testMode ? 'test-multiselect-text-id-1234' : uuidv1())
const multiselectSelectedItemsId = computed((): string => props.testMode ? 'test-multiselect-selected-id-1234' : uuidv1())
const multiselectSelectedItemsStagingId = computed((): string => props.testMode ? 'test-multiselect-selected-staging-id-1234' : uuidv1())
const multiselectRef = ref(null)
const selectionBottomRef = ref(null)
// filter and selection
const selectionsMaxHeight = computed((): number => {
  return props.selectedRowCount * SELECTED_ITEMS_SINGLE_LINE_HEIGHT
})
const filterStr = ref('')
// whether or not filter string matches an existing item's label
const uniqueFilterStr = computed((): boolean => {
  if (!filterStr.value) {
    return false
  }

  if (unfilteredItems.value.filter((item: MultiselectItem) => item.label === filterStr.value).length) {
    return false
  }

  return true
})
const popper = ref(null)
const unfilteredItems: Ref<MultiselectItem[]> = ref([])
const sortedItems: Ref<MultiselectItem[]> = ref([])
const selectedItems = ref<MultiselectItem[]>([])
const visibleSelectedItemsStaging = ref<MultiselectItem[]>([])
const invisibleSelectedItemsStaging = ref<MultiselectItem[]>([])
const visibleSelectedItems = ref<MultiselectItem[]>([])
const invisibleSelectedItems = ref<MultiselectItem[]>([])
const hiddenItemsTooltip = computed(() => invisibleSelectedItems.value.map(item => item.label).join(', '))
// state
const initialFocusTriggered: Ref<boolean> = ref(false)
const isHovered = ref(false)
const isFocused = ref(false)
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')
const isReadonly = computed((): boolean => attrs?.readonly !== undefined && String(attrs?.readonly) !== 'false')

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): string[] {
    return props.modelValue
  },
  set(newValue: string[]): void {
    const items = unfilteredItems.value.filter((item: MultiselectItem) => newValue.includes(item.value))

    if (items.length) {
      handleMultipleItemsSelect(items)
    } else if (!newValue.length) {
      clearSelection()
    }
  },
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
    width: numericWidth.value + 'px',
    maxWidth: numericWidth.value + 'px',
    maxHeight: String(props.dropdownMaxHeight),
    disabled: (attrs.disabled !== undefined && String(attrs.disabled) !== 'false') || (attrs.readonly !== undefined && String(attrs.readonly) !== 'false'),
  }
})

// TypeScript complains if I bind the original object
const boundKPopAttributes = computed(() => ({ ...createKPopAttributes.value }))

const widthValue = computed(() => {
  const w = props.width ? props.width : '300'

  return getSizeFromString(w)
})

const widthStyle = computed(() => {
  return {
    width: widthValue.value,
  }
})

const numericWidthStyle = computed(() => {
  return {
    width: numericWidth.value + 'px',
  }
})

const nonSlimStyle = computed(() => {
  return {
    width: (numericWidth.value - 30) + 'px',
    maxHeight: selectionsMaxHeight.value + 'px',
    paddingRight: 0,
  }
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
    return String(attrs.placeholder || '')
  }

  return 'Filter...'
}

const filteredItems = computed(() => {
  // For autosuggest, items don't need to be filtered internally
  return props.autosuggest ? unfilteredItems.value : props.filterFunc({ items: unfilteredItems.value, query: filterStr.value })
})

const handleFilterClick = (evt: any) => {
  if (attrs.disabled !== undefined && String(attrs.disabled) !== 'false') {
    evt.stopPropagation()
  }
}

const handleToggle = (open: boolean, isToggled: Ref<boolean>, toggle: Function) => {
  if (open) {
    if (!isToggled.value) { // not already open
      filterStr.value = ''
      toggle()
      sortItems()
    }
  } else {
    if (isToggled.value) { // not already closed
      filterStr.value = ''
      toggle()
    }
  }
}

// make sure we don't grow past the max height of the selected items box
// do the check off screen in the staging area so the UI doesn't jump
const stageSelections = () => {
  // set timeout required to push the calculation to the end of the update lifecycle event queue
  setTimeout(() => {
    const elem = document.getElementById(multiselectSelectedItemsStagingId.value)

    if (props.expandSelected) {
      // if it's expanded don't do calculcations, because we will display all
      stagingKey.value++
      return
    }

    if (elem) {
      const height = elem.clientHeight
      if (height > selectionsMaxHeight.value) {
        const item = visibleSelectedItemsStaging.value.pop()
        if (item) {
          invisibleSelectedItemsStaging.value.push(item)
        }
      }
      stagingKey.value++
    }
  }, 0)
}

// handles programmatic selections
const handleMultipleItemsSelect = (items: MultiselectItem[]) => {
  items.forEach(itemToSelect => {
    const selectedItem = unfilteredItems.value.filter(anItem => anItem.value === itemToSelect.value)?.[0] || null

    selectedItem.selected = true
    selectedItem.key = selectedItem?.key?.includes('-selected') ? selectedItem.key : `${selectedItem.key}-selected`
    // if it isn't already in selectedItems, add it
    if (!selectedItems.value.filter(anItem => anItem.value === selectedItem.value).length) {
      selectedItems.value.push(selectedItem)
      visibleSelectedItemsStaging.value.push(selectedItem)
    }
  })

  stageSelections()
}

// handle item select/deselect from dropdown
const handleItemSelect = (item: MultiselectItem, isNew?: boolean) => {
  let selectionIsAdded = false // true if selected item is added, not from items passed in
  let selectedItem = isNew ? item : unfilteredItems.value.filter(anItem => anItem.value === item.value)?.[0] || null

  // if it wasn't in unfilteredItems, check newly added items if enabled
  if (props.enableItemCreation && selectedItem?.custom) {
    selectionIsAdded = true
  }

  // if still not found, we are probably filtering with autosuggest, so get it from selectedItems
  if (selectedItem === null) {
    selectedItem = selectedItems.value.filter(anItem => anItem.value === item.value)?.[0] || null
  }
  // if we still couldn't find it, bail
  if (selectedItem === null) {
    return
  }

  // if clicked item is already selected
  if (selectedItem.selected) {
    selectedItems.value = selectedItems.value.filter(anItem => anItem.value !== item.value)
    // remove item from visibility arrays
    if (visibleSelectedItemsStaging.value.filter(anItem => anItem.value === item.value).length) {
      visibleSelectedItemsStaging.value = visibleSelectedItemsStaging.value.filter(anItem => anItem.value !== item.value)
    } else if (invisibleSelectedItemsStaging.value.filter(anItem => anItem.value === item.value).length) {
      invisibleSelectedItemsStaging.value = invisibleSelectedItemsStaging.value.filter(anItem => anItem.value !== item.value)
    }
    // deselect item
    selectedItem.selected = false
    selectedItem.key = selectedItem.key?.replace(/-selected/gi, '')

    // if some items are hidden grab the first hidden one and add it into the visible array
    if (invisibleSelectedItemsStaging.value.length) {
      const itemToShow = invisibleSelectedItemsStaging.value.pop()
      if (itemToShow) {
        visibleSelectedItemsStaging.value.push(itemToShow)
      }
    }

    // if it's an added item, remove it from list when it is deselected
    if (selectionIsAdded) {
      unfilteredItems.value = unfilteredItems.value.filter(anItem => anItem.value !== item.value)
      emit('item:removed', item)
    }
  } else { // newly selected item
    selectedItem.selected = true
    selectedItem.key = selectedItem.key?.includes('-selected') ? selectedItem.key : `${selectedItem.key}-selected`
    selectedItems.value.push(selectedItem)
    visibleSelectedItemsStaging.value.push(selectedItem)
    // track it if it's a newly added item
    if (isNew) {
      selectedItem.custom = true
      unfilteredItems.value.push(selectedItem)
    }

    if (props.expandSelected) {
      // if expanded, scroll new selections into view
      scrollSmoothlyToBottom()
    }
  }

  stageSelections()
  const selectedVals = selectedItems.value.map(anItem => anItem.value)

  emit('selected', selectedItems.value)
  emit('change', item)
  emit('update:modelValue', selectedVals)
}

// add an item with `enter`
const handleAddItem = (): void => {
  if (!props.enableItemCreation || !filterStr.value || !uniqueFilterStr.value) {
    // do nothing if not enabled or no label or label already exists
    return
  }

  const pos = unfilteredItems.value.length + 1
  const item:MultiselectItem = {
    label: filterStr.value + '',
    value: props.testMode ? `test-multiselect-added-item-${pos}` : uuidv1(),
    key: `${filterStr.value.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${pos}`,
  }
  emit('item:added', item)

  handleItemSelect(item, true)
  filterStr.value = ''
}

const scrollSmoothlyToBottom = () => {
  setTimeout(() => {
    // @ts-ignore
    selectionBottomRef.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, 200)
}

// sort dropdown items. Selected items displayed before unselected items
const sortItems = () => {
  const selItems = filteredItems.value.filter((item: MultiselectItem) => item.selected)
  const unselItems = filteredItems.value.filter((item: MultiselectItem) => !item.selected)

  sortedItems.value = selItems.concat(unselItems)
}

const clearSelection = (): void => {
  unfilteredItems.value.forEach(anItem => {
    anItem.selected = false
    anItem.key = anItem?.key?.replace(/-selected/gi, '')

    if (anItem.custom) {
      // we must emit that we are removing each item before we actually clear them since this is our only reference
      emit('item:removed', anItem)
    }
  })
  // clear added entries
  unfilteredItems.value = unfilteredItems.value.filter(anItem => !anItem.custom)
  selectedItems.value = []
  visibleSelectedItemsStaging.value = []
  invisibleSelectedItemsStaging.value = []
  filterStr.value = ''
  stageSelections()

  emit('selected', [])
  emit('change', null)
  emit('update:modelValue', [])
  emit('query-change', '')
}

const onQueryChange = (query: string) => {
  filterStr.value = query
  emit('query-change', query)
}

const triggerFocus = (evt: any, isToggled: Ref<boolean>):void => {
  // `esc` key closes
  if (evt.keyCode === 27) {
    isToggled.value = false
    return
  }

  const inputElem = document.getElementById(multiselectTextId.value)
  if (!isToggled.value && inputElem) {
    // simulate click to trigger dropdown open
    inputElem.click()
  }
}

const onInputFocus = (): void => {
  isFocused.value = true
  if (!initialFocusTriggered.value) {
    initialFocusTriggered.value = true
    emit('query-change', '')
  }
}

// whenever staging key is changed, we're ready to actually draw the selections
watch(stagingKey, () => {
  // set timeout required to push the calculation to the end of the update lifecycle event queue
  setTimeout(() => {
    const elem = document.getElementById(multiselectSelectedItemsStagingId.value)

    if (props.expandSelected) {
      // if expanded, don't do all the calculations because we are going to display
      // everything
      visibleSelectedItems.value = cloneDeep(visibleSelectedItemsStaging.value)
      invisibleSelectedItems.value = []
      key.value++
      return
    }

    if (elem) {
      const height = elem.clientHeight
      if (height > selectionsMaxHeight.value) {
        const item = visibleSelectedItemsStaging.value.pop()
        if (item) {
          invisibleSelectedItemsStaging.value.push(item)
        }
        stagingKey.value++
      } else {
        visibleSelectedItems.value = cloneDeep(visibleSelectedItemsStaging.value)
        invisibleSelectedItems.value = cloneDeep(invisibleSelectedItemsStaging.value)
        key.value++
      }
    }
  }, 0)
})

// make the popper recalculate it's position whenever the selections display
// is updated in case we've grown a line
watch(key, () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (popper.value && typeof popper.value.updatePopper === 'function') {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popper.value.updatePopper()
    })
  }
})

// If filtered items change, re-sort them
watch(filteredItems, () => {
  sortItems()
})

// watch for programmatic changes to model
watch(value, (newVal, oldVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    const items = unfilteredItems.value.filter((item: MultiselectItem) => newVal.includes(item.value))
    if (items.length) {
      handleMultipleItemsSelect(items)
    } else if (!newVal.length) {
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
    if (props.modelValue.includes(unfilteredItems.value[i].value) || unfilteredItems.value[i].selected) {
      const selectedItem = unfilteredItems.value[i]
      selectedItem.selected = true
      selectedItem.key = selectedItem.key?.includes('-selected') ? selectedItem.key : `${selectedItem.key}-selected`
      // if it isn't already in the selectedItems array, add it
      if (!selectedItems.value.filter(anItem => anItem.value === selectedItem.value).length) {
        selectedItems.value.push(selectedItem)
      }
      // if it isn't already in the selectedItems array, add it
      if (!visibleSelectedItemsStaging.value.filter(anItem => anItem.value === selectedItem.value).length) {
        visibleSelectedItemsStaging.value.push(selectedItem)
      }
    }

    stageSelections()
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

const numericWidth = ref<number>(300)
onMounted(() => {
  // @ts-ignore
  numericWidth.value = multiselectRef.value?.clientWidth || 300
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';
@import '@/styles/mixins';

.k-multiselect {
  position: relative; // so staging area is positioned around this node
  width: fit-content; // necessary for correct placement of popup

  // off screen area for checking selections before display
  .staging-area {
    position: absolute;
    left: -99999px;
    z-index: -1;
    pointer-events: none;
    visibility: hidden;
  }

  .k-multiselect-selections {
    --KBadgeMaxWidth: 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-right: 23px;
    padding-left: 16px;

    &.scrollable {
      overflow-y: auto;
    }

    &.staging {
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: auto;
      padding-right: 23px;
      padding-left: 16px;
    }

    .hidden-selection-count {
      // match dismissable height
      --KBadgeLineHeight: 21px;

      &.hidden {
        visibility: hidden;
      }
    }
  }

  .k-multiselect-icon {
    position: absolute;
    top: 1px;
    right: 1px;

    .k-multiselect-chevron-icon {
      position: relative;
      top: 11px;
      right: 10px;
    }

    .k-multiselect-clear-icon {
      position: absolute;
      top: 8px;
      right: 10px;
    }
  }

  .k-multiselect-trigger {
    position: relative;
    display: inline-block;
    border-radius: 3px;
    // mimic input's box shadow styling
    @include input-default;

    &.hovered {
      @include input-hover;
    }

    &.focused {
      @include input-focus;
    }

    &.readonly {
      @include input-readonly;
    }

    &.disabled {
      @include input-disabled;
    }

    .k-multiselect-input {
      position: relative;
      display: inline-block;

      &.is-readonly {
        // box-shadow: none !important;
        // @include input-readonly;

        :deep(.k-input) {
          &:not([type=checkbox]):not([type=radio]), .form-control:not([type=checkbox]):not([type=radio]) {
            background-color: transparent !important;
          }
        }
      }
    }
  }

  .k-multiselect-new-item {
    word-break: break-word;

    .select-item-new-indicator {
      font-weight: 600;
      font-style: italic;
    }
  }

}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-multiselect {
  .k-multiselect-trigger {
    .k-multiselect-input {
      &.prevent-pointer-events {
        pointer-events: none;
      }

      &.input-placeholder-dark::placeholder {
        color: var(--KInputColor, var(--black-70, rgba(0, 0, 0, 0.7))) !important;
      }

      input.k-input:not([type="checkbox"]):not([type="radio"]) {
        position: relative;
        left: 1px;
        width: calc(100% - 4px);
        // slightly smaller than container so we can see
        // the container's box-shadow
        height: calc(100% - 2px);
        margin: 1px;
        // remove input's default box shadow
        box-shadow: none !important;

        &:hover,
        &:focus,
        &:read-only,
        &:disabled {
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
      color: var(--grey-500);

      .select-item-label {
        color: var(--grey-500);
      }
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
  }
}
</style>
