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
              v-if="selectedItems.length && (isToggled.value || expandSelected || collapsedContext)"
              :id="multiselectSelectedItemsId"
              :key="key"
              class="k-multiselect-selections"
              :class="{ 'scrollable my-2': expandSelected, 'mb-2': collapsedContext && !isToggled.value }"
              data-testid="k-multiselect-selections"
              :style="!expandSelected ? numericWidthStyle : nonSlimStyle"
            >
              <KBadge
                v-for="item, idx in visibleSelectedItems"
                :key="`${item.key ? item.key : idx}-badge`"
                class="mr-1"
                :class="{
                  'my-1': expandSelected,
                  'mt-2': !expandSelected,
                  'resize-badge':(item.selected && item.disabled)
                }"
                :dismissable="item.selected && !item.disabled"
                shape="rectangular"
                :truncation-tooltip="item.label"
                @click.stop
                @dismissed="handleItemSelect(item)"
              >
                {{ item.label }}
              </KBadge>
              <KBadge
                v-if="!expandSelected && invisibleSelectedItems.length"
                class="mt-2 hidden-selection-count"
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
                v-if="(!expandSelected && !collapsedContext) || ((expandSelected || collapsedContext) && (!selectedItems.length || isToggled.value))"
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
              <KMultiselectItems
                :items="sortedItems"
                @selected="handleItemSelect"
              >
                <template #content="{ item }">
                  <slot
                    class="k-multiselect-item"
                    :item="item"
                    name="item-template"
                  />
                </template>
              </KMultiselectItems>
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
            <div
              v-if="$slots['dropdown-footer-text'] || dropdownFooterText"
              class="k-multiselect-dropdown-footer-text"
              :class="`k-multiselect-dropdown-footer-${dropdownFooterTextPosition}`"
            >
              <slot name="dropdown-footer-text">
                {{ dropdownFooterText }}
              </slot>
            </div>
          </template>
        </KPop>
      </KToggle>
    </div>
    <!-- Staging area -->
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
          :dismissable="item.selected && !item.disabled"
          hidden
          shape="rectangular"
        >
          {{ item.label }}
        </KBadge>
        <!-- Always render this badge even if it's hidden to ensure there will be enough space to show it -->
        <KBadge
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
import { ref, Ref, computed, watch, PropType, nextTick, onMounted, onBeforeUnmount, useAttrs, useSlots } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KBadge from '@/components/KBadge/KBadge.vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KMultiselectItems from '@/components/KMultiselect/KMultiselectItems.vue'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'
import type { MultiselectItem, MultiselectFilterFnParams, DropdownFooterTextPosition, PopPlacements } from '@/types'

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
const slots = useSlots()

const { getSizeFromString, cloneDeep, stripRequiredLabel } = useUtilities()
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
   * Determines whether to show total selected count (false), or
   * row(s) of selections when collapsed
   */
  collapsedContext: {
    type: Boolean,
    default: false,
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
    default: (params: MultiselectFilterFnParams) => params.items.filter((item: MultiselectItem) => item.label?.toLowerCase().includes(params.query?.toLowerCase())),
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
})

const emit = defineEmits(['selected', 'item:added', 'item:removed', 'input', 'change', 'update:modelValue', 'query-change'])

const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.help || props.labelAttributes?.info || slots['label-tooltip']))
const defaultKPopAttributes = {
  hideCaret: true,
  placement: 'bottomStart' as PopPlacements,
  popoverTimeout: 0,
  popoverClasses: 'k-multiselect-popover mt-0',
}

// keys and ids
const key = ref(0)
const stagingKey = ref(0)
const multiselectId = computed((): string => props.testMode ? 'test-multiselect-id-1234' : uuidv4())
const multiselectInputId = computed((): string => props.testMode ? 'test-multiselect-input-id-1234' : uuidv4())
const multiselectTextId = computed((): string => props.testMode ? 'test-multiselect-text-id-1234' : uuidv4())
const multiselectSelectedItemsId = computed((): string => props.testMode ? 'test-multiselect-selected-id-1234' : uuidv4())
const multiselectSelectedItemsStagingId = computed((): string => props.testMode ? 'test-multiselect-selected-staging-id-1234' : uuidv4())
const multiselectRef = ref<HTMLDivElement | null>(null)
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
const invisibleSelectedItemsStagingSet = new Set<string>()
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
    disabled: (attrs.disabled !== undefined && String(attrs.disabled) !== 'false') || (attrs.readonly !== undefined && String(attrs.readonly) !== 'false'),
  }
})

// Calculate the `.k-popover-content` max-height
const popoverContentMaxHeight = computed((): string => getSizeFromString(props.dropdownMaxHeight))

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
        if (item && !invisibleSelectedItemsStagingSet.has(item.value)) {
          invisibleSelectedItemsStagingSet.add(item.value)
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
    } else if (invisibleSelectedItemsStagingSet.delete(item.value)) {
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
        invisibleSelectedItemsStagingSet.delete(itemToShow.value)
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
    value: props.testMode ? `test-multiselect-added-item-${pos}` : uuidv4(),
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
  invisibleSelectedItemsStagingSet.clear()
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
        if (item && !invisibleSelectedItemsStagingSet.has(item.value)) {
          invisibleSelectedItemsStaging.value.push(item)
          invisibleSelectedItemsStagingSet.add(item.value)
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

    // If an item is `selected` and `disabled`, provide fallback tooltip text if not provided
    if (unfilteredItems.value[i].selected === true && unfilteredItems.value[i].disabled === true && !unfilteredItems.value[i].disabledTooltipText) {
      unfilteredItems.value[i].disabledTooltipText = 'This item cannot be removed'
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
const setNumericWidth = (): void => {
  numericWidth.value = multiselectRef.value?.clientWidth || 300
}

const resizeObserver = ref()
onMounted(() => {
  resizeObserver.value = new ResizeObserver(entries => {
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return
      }
      setNumericWidth()
    })
  })
  resizeObserver.value.observe(multiselectRef.value as HTMLDivElement)
})

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(multiselectRef.value)
  }
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
    left: -99999px;
    pointer-events: none;
    position: absolute;
    visibility: hidden;
    z-index: -1;
  }

  .k-multiselect-selections {
    --KBadgeMaxWidth: 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 23px;

    .resize-badge {
      padding: 5px;
    }

    &.scrollable {
      overflow-y: auto;
    }

    &.staging {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: auto;
      padding-left: 16px;
      padding-right: 23px;
      position: relative;
    }

    .hidden-selection-count {
      // match dismissable height
      --KBadgeLineHeight: 21px;
    }
  }

  .k-multiselect-icon {
    position: absolute;
    right: 1px;
    top: 1px;
    z-index: 1;

    .k-multiselect-chevron-icon {
      position: relative;
      right: 10px;
      top: 11px;
    }

    .k-multiselect-clear-icon {
      position: absolute;
      right: 10px;
      top: 8px;
    }
  }

  .k-multiselect-trigger {
    border-radius: 3px;
    display: inline-block;
    position: relative;
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
      display: inline-block;
      position: relative;
      width: 100%;

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
      font-style: italic;
      font-weight: 600;
    }
  }

  .k-multiselect-dropdown-footer-text {
    background-color: color(white);
    border-top: 1px solid var(--grey-200);
    color: color(grey-500);
    padding: var(--spacing-xs);
    padding-bottom: 0;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

// allows setting a maxHeight on the popover dropdown
@mixin kMultiselectPopoverMaxHeight {
  max-height: v-bind('popoverContentMaxHeight');
  overflow-y: auto;
}

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
        // remove input's default box shadow
        box-shadow: none !important;
        // slightly smaller than container so we can see
        // the container's box-shadow
        height: calc(100% - 2px);
        left: 1px;
        margin: 1px;
        position: relative;
        width: calc(100% - 4px);

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
    margin-top: 2px !important;
    width: 100%;

    &[x-placement^="top"] {
      margin-bottom: 2px !important;
      margin-top: 0 !important;
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
      color: var(--black-70);
      flex: 1;

      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
      }
    }

    .k-popover-content {
      @include kMultiselectPopoverMaxHeight;

      // when dropdown footer text position is sticky
      &:has(.k-multiselect-dropdown-footer-text.k-multiselect-dropdown-footer-sticky) {
        max-height: none;

        .k-multiselect-list {
          @include kMultiselectPopoverMaxHeight;
        }
      }

      // Firefox workaround
      // since :has() selector isn't supported in Firefox be default
      .k-multiselect-list ~ .k-multiselect-dropdown-footer-sticky {
        bottom: 0;
        position: sticky;
      }
    }
  }
}
</style>
