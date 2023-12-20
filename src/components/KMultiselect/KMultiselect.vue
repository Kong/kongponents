<template>
  <div
    class="k-multiselect"
    :class="[$attrs.class, { 'multiselect-error': error }]"
    :style="widthStyle"
  >
    <KLabel
      v-if="label"
      v-bind="labelAttributes"
      :data-testid="labelAttributes['data-testid'] ? labelAttributes['data-testid'] : 'multiselect-label'"
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
    <div data-testid="multiselect-container">
      <KToggle v-slot="{ isToggled, toggle }">
        <KPop
          ref="popper"
          v-bind="boundKPopAttributes"
          :on-popover-click="() => {
            return
          }"
          :position-fixed="positionFixed"
          target=".multiselect-trigger"
          @closed="() => handleToggle(false, isToggled, toggle)"
          @opened="() => handleToggle(true, isToggled, toggle)"
        >
          <div
            ref="multiselectElement"
            class="multiselect-trigger"
            :class="{ focused: isFocused, hovered: isHovered, disabled: isDisabled, readonly: isReadonly }"
            data-testid="multiselect-trigger"
            role="listbox"
            @click="handleFilterClick"
          >
            <div v-if="collapsedContext">
              <KInput
                :id="multiselectId"
                v-bind="modifiedAttrs"
                ref="multiselectInputElement"
                autocapitalize="off"
                autocomplete="off"
                class="multiselect-input"
                :class="{ 'is-readonly': isReadonly }"
                data-testid="multiselect-input"
                :model-value="filterString"
                :placeholder="getPlaceholderText"
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
            <div
              v-else-if="!selectedItems.length"
              class="expanded-selection-empty"
            >
              0 items selected
            </div>
            <div
              v-else
              :key="key"
              class="selection-badges-container"
              data-testid="selection-badges-container"
              :style="numericWidthStyle"
            >
              <KBadge
                v-for="item, idx in visibleSelectedItems"
                :key="`${item.key ? item.key : idx}-badge`"
                :appearance="getBadgeAppearance(item)"
                class="multiselect-selection-badge"
                :icon-before="false"
                :tooltip="item.label"
                truncation-tooltip
                @click.stop
              >
                {{ item.label }}
                <template
                  v-if="item.selected && !item.disabled && !isDisabled && !isReadonly"
                  #icon
                >
                  <CloseIcon
                    data-testid="badge-dismiss-button"
                    role="button"
                    tabindex="0"
                    @click="handleItemSelect(item)"
                  />
                </template>
              </KBadge>
              <KBadge
                v-if="invisibleSelectedItems.length"
                :appearance="error ? 'danger' : 'info'"
                class="hidden-selection-count"
                :tooltip="hiddenItemsTooltip"
                @click.stop
              >
                +{{ invisibleSelectedItems.length }}
              </KBadge>
            </div>
            <div class="multiselect-icons-container">
              <CloseIcon
                v-if="!loading && selectedItems.length && isToggled.value"
                class="multiselect-clear-icon"
                data-testid="multiselect-clear-icon"
                role="button"
                :size="KUI_ICON_SIZE_40"
                tabindex="0"
                @click="clearSelection"
                @keyup.enter="clearSelection"
              />
              <ProgressIcon
                v-else-if="loading"
                class="multiselect-loading-icon"
                :size="KUI_ICON_SIZE_40"
              />
              <ChevronDownIcon
                v-else
                class="multiselect-chevron-icon"
                :size="KUI_ICON_SIZE_40"
              />
            </div>
          </div>
          <template #content>
            <!-- use @click.stop so we don't close drop down when selecting/deselecting items -->
            <div
              class="multiselect-list"
              @click.stop
              @mouseenter="() => isHovered = true"
              @mouseleave="() => isHovered = false"
            >
              <div
                v-if="!collapsedContext && !isReadonly"
                class="multiselect-input-wrapper"
              >
                <KInput
                  :id="multiselectId"
                  v-bind="modifiedAttrs"
                  ref="multiselectDropdownInputElement"
                  autocapitalize="off"
                  autocomplete="off"
                  class="multiselect-dropdown-input"
                  data-testid="multiselect-dropdown-input"
                  :model-value="filterString"
                  :placeholder="placeholder ? placeholder : 'Filter...'"
                  type="text"
                  @click.stop
                  @update:model-value="onQueryChange"
                />
              </div>
              <KMultiselectItems
                :items="sortedItems"
                @selected="handleItemSelect"
              >
                <template #content="{ item }">
                  <slot
                    class="multiselect-item"
                    :item="item"
                    name="item-template"
                  />
                </template>
              </KMultiselectItems>
              <KMultiselectItem
                v-if="enableItemCreation && uniqueFilterStr && !$slots.empty"
                key="multiselect-add-item"
                class="multiselect-add-item"
                data-testid="multiselect-add-item"
                :item="{ label: `${filterString} (Add new value)`, value: 'add_item' }"
                @selected="handleAddItem"
              >
                <template #content>
                  <div class="select-item-description">
                    {{ filterString }}
                    <span class="select-item-new-indicator">(Add new value)</span>
                  </div>
                </template>
              </KMultiselectItem>
              <KMultiselectItem
                v-if="!sortedItems.length && !$slots.empty && !enableItemCreation"
                key="multiselect-empty-item"
                class="multiselect-empty-item"
                data-testid="multiselect-empty-item"
                :item="{ label: 'No results', value: 'no_results', disabled: true }"
              />
            </div>
            <slot
              v-if="!loading && !sortedItems.length"
              name="empty"
            />
            <div
              v-if="hasDropdownFooter"
              class="dropdown-footer"
              :class="`dropdown-footer-${dropdownFooterTextPosition}`"
            >
              <slot name="dropdown-footer-text">
                {{ dropdownFooterText }}
              </slot>
            </div>
          </template>
        </KPop>
      </KToggle>
    </div>
    <p
      v-if="help"
      class="help-text"
    >
      {{ help }}
    </p>

    <!-- Staging area -->
    <div
      v-if="!collapsedContext"
      aria-hidden="true"
      class="staging-area"
    >
      <div
        :key="stagingKey"
        ref="multiselectSelectionsStagingElement"
        class="selection-badges-container staging"
        :style="numericWidthStyle"
        tabindex="-1"
      >
        <KBadge
          v-for="item, idx in visibleSelectedItemsStaging"
          :key="`${item.key ? item.key : idx}-badge`"
          aria-hidden="true"
          class="multiselect-selection-badge"
          :icon-before="false"
        >
          {{ item.label }}
          <template
            v-if="item.selected && !item.disabled && !isDisabled && !isReadonly"
            #icon
          >
            <CloseIcon
              data-testid="badge-dismiss-button"
              role="button"
              tabindex="-1"
              @click="handleItemSelect(item)"
            />
          </template>
        </KBadge>
        <!-- Always render this badge even if it's hidden to ensure there will be enough space to show it -->
        <KBadge
          aria-hidden="true"
          class="hidden-selection-count"
        >
          +{{ invisibleSelectedItemsStaging.length }}
        </KBadge>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref, PropType } from 'vue'
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, useAttrs, useSlots } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KBadge from '@/components/KBadge/KBadge.vue'
import KInput from '@/components/KInput/KInput.vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KMultiselectItems from '@/components/KMultiselect/KMultiselectItems.vue'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'
import type { MultiselectItem, MultiselectFilterFnParams, DropdownFooterTextPosition, PopPlacements, BadgeAppearance } from '@/types'
import { CloseIcon, ChevronDownIcon, ProgressIcon } from '@kong/icons'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

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
const SELECTED_ITEMS_SINGLE_LINE_HEIGHT = 36

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
  help: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
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
    default: '100%',
  },
  /**
   * Number of rows of selections to show when focused
   */
  selectedRowCount: {
    type: Number,
    default: 1,
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
  filterFunction: {
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

const emit = defineEmits<{
  (e: 'selected', item: MultiselectItem[]): void
  (e: 'input', value: string[]): void
  (e: 'change', item: MultiselectItem | null): void
  (e: 'update:modelValue', value: string[]): void
  (e: 'query-change', query: string): void
  (e: 'item-added', value: MultiselectItem): void
  (e: 'item-removed', value: MultiselectItem): void
}>()

const isRequired = computed((): boolean => attrs.required !== undefined && String(attrs.required) !== 'false')
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.help || props.labelAttributes?.info || slots['label-tooltip']))
const hasDropdownFooter = computed((): boolean => !!(props.dropdownFooterText || slots['dropdown-footer-text']))

const getBadgeAppearance = (item?: MultiselectItem): BadgeAppearance => {
  if (isDisabled.value || isReadonly.value || item?.disabled) {
    return 'neutral'
  }

  if (props.error) {
    return 'danger'
  }

  return 'info'
}

const defaultKPopAttributes = {
  hideCaret: true,
  placement: 'bottomStart' as PopPlacements,
  popoverTimeout: 0,
  popoverClasses: 'multiselect-popover',
}

// keys and ids
const key = ref(0)
const stagingKey = ref(0)

const multiselectId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())

const multiselectElement = ref<HTMLDivElement | null>(null)
const multiselectInputElement = ref<HTMLDivElement | null>(null)
const multiselectDropdownInputElement = ref<HTMLDivElement | null>(null)
const multiselectSelectionsStagingElement = ref<HTMLDivElement>()

// filter and selection
const selectionsMaxHeight = computed((): number => {
  return props.selectedRowCount * SELECTED_ITEMS_SINGLE_LINE_HEIGHT
})
const filterString = ref('')
// whether or not filter string matches an existing item's label
const uniqueFilterStr = computed((): boolean => {
  if (!filterString.value) {
    return false
  }

  if (unfilteredItems.value.filter((item: MultiselectItem) => item.label === filterString.value).length) {
    return false
  }

  return true
})
const popper = ref(null)

// A clone of `props.items`, normalized.  May contain additional custom items that have been created.
const unfilteredItems: Ref<MultiselectItem[]> = ref([])

// A sorted version of the above.
const sortedItems: Ref<MultiselectItem[]> = ref([])

// An array of items.  May contain items that are not present in `unfilteredItems` if an item was selected, then the `items` prop was changed.
const selectedItems = ref<MultiselectItem[]>([])

// The items visible in the main part of the component.
const visibleSelectedItemsStaging = ref<MultiselectItem[]>([])

// The items in the "overflow" part of the component.
const invisibleSelectedItemsStaging = ref<MultiselectItem[]>([])

// A set of the values in the "overflow" part of the component.
const invisibleSelectedItemsStagingSet = new Set<string>()

// Used to store the results of the determination of which items are visible.
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
    popoverClasses: `${defaultKPopAttributes.popoverClasses} ${props.kpopAttributes.popoverClasses} ${hasDropdownFooter.value ? 'has-dropdown-footer' : ''}`,
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

const getPlaceholderText = computed((): string => {
  if (selectedItems.value.length === 1) {
    return `${selectedItems.value.length} item selected`
  }

  return `${selectedItems.value.length} items selected`
})

const filteredItems = computed(() => {
  // For autosuggest, items don't need to be filtered internally
  return props.autosuggest ? unfilteredItems.value : props.filterFunction({ items: unfilteredItems.value, query: filterString.value })
})

const handleFilterClick = (evt: any) => {
  if (attrs.disabled !== undefined && String(attrs.disabled) !== 'false') {
    evt.stopPropagation()
  }
}

const handleToggle = async (open: boolean, isToggled: Ref<boolean>, toggle: Function) => {
  if (open) {
    if (!isToggled.value) { // not already open
      filterString.value = ''
      toggle()
      sortItems()

      await nextTick()

      const input = document.getElementById(multiselectId.value) as HTMLInputElement
      input?.focus()
    }
  } else {
    if (isToggled.value) { // not already closed
      filterString.value = ''
      toggle()
    }
  }
}

// make sure we don't grow past the max height of the selected items box
// do the check off screen in the staging area so the UI doesn't jump
const stageSelections = () => {
  // set timeout required to push the calculation to the end of the update lifecycle event queue
  setTimeout(() => {
    const elem = multiselectSelectionsStagingElement.value

    if (!props.collapsedContext) {
      // if it's collapsed don't do calculations, because we don't display badges
      stagingKey.value++
      return
    }

    if (elem) {
      const height = elem.clientHeight
      if (height > selectionsMaxHeight.value) {
        // populate as much items as possible by checking the offsetTop
        const overflowedElements = Array.from(elem.querySelectorAll('.multiselect-selection-badge'))
          .filter(badge => (badge as HTMLElement).offsetTop >= selectionsMaxHeight.value)

        // if there are overflowed items, move them to the invisibleSelectedItemsStaging array
        const cutPoint = visibleSelectedItemsStaging.value.length - overflowedElements.length
        const overflowedItems = visibleSelectedItemsStaging.value.splice(cutPoint, overflowedElements.length)

        for (const item of overflowedItems) {
          if (!invisibleSelectedItemsStagingSet.has(item.value)) {
            invisibleSelectedItemsStagingSet.add(item.value)
            invisibleSelectedItemsStaging.value.push(item)
          }
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

const handleMultipleItemsDeselect = (items: MultiselectItem[], restage = false) => {
  const deselectedValues = new Set(items.map(anItem => anItem.value))

  selectedItems.value = selectedItems.value.filter(anItem => !deselectedValues.has(anItem.value))
  visibleSelectedItemsStaging.value = visibleSelectedItemsStaging.value.filter(anItem => !deselectedValues.has(anItem.value))
  invisibleSelectedItemsStaging.value = invisibleSelectedItemsStaging.value.filter(anItem => !deselectedValues.has(anItem.value))

  items.forEach(itemToDeselect => {
    invisibleSelectedItemsStagingSet.delete(itemToDeselect.value)

    // deselect item
    itemToDeselect.selected = false
    itemToDeselect.key = itemToDeselect.key?.replace(/-selected/gi, '')

    // if some items are hidden grab the first hidden one and add it into the visible array
    if (invisibleSelectedItemsStaging.value.length) {
      const itemToShow = invisibleSelectedItemsStaging.value.pop()
      if (itemToShow) {
        visibleSelectedItemsStaging.value.push(itemToShow)
        invisibleSelectedItemsStagingSet.delete(itemToShow.value)
      }
    }

    // if it's an added item, remove it from list when it is deselected
    if (props.enableItemCreation && itemToDeselect.custom) {
      unfilteredItems.value = unfilteredItems.value.filter(anItem => anItem.value !== itemToDeselect.value)
      emit('item-removed', itemToDeselect)
    }
  })

  if (restage) {
    stageSelections()
  }
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
      emit('item-removed', item)
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
  }

  stageSelections()
  const selectedVals = selectedItems.value.map(anItem => anItem.value)

  emit('selected', selectedItems.value)
  emit('change', selectedItem)
  emit('update:modelValue', selectedVals)
}

// add an item with `enter`
const handleAddItem = (): void => {
  if (!props.enableItemCreation || !filterString.value || !uniqueFilterStr.value) {
    // do nothing if not enabled or no label or label already exists
    return
  }

  const pos = unfilteredItems.value.length + 1
  const item:MultiselectItem = {
    label: filterString.value + '',
    value: uuidv4(),
    key: `${filterString.value.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${pos}`,
  }
  emit('item-added', item)

  handleItemSelect(item, true)
  filterString.value = ''
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
      emit('item-removed', anItem)
    }
  })
  // clear added entries
  unfilteredItems.value = unfilteredItems.value.filter(anItem => !anItem.custom)
  selectedItems.value = []
  visibleSelectedItemsStaging.value = []
  invisibleSelectedItemsStaging.value = []
  invisibleSelectedItemsStagingSet.clear()
  filterString.value = ''
  stageSelections()

  emit('selected', [])
  emit('change', null)
  emit('update:modelValue', [])
  emit('query-change', '')
}

const onQueryChange = (query: string) => {
  filterString.value = query
  emit('query-change', query)
}

const triggerFocus = (evt: any, isToggled: Ref<boolean>):void => {
  // `esc` key closes
  if (evt.keyCode === 27) {
    isToggled.value = false
    return
  }

  const inputElem = multiselectInputElement.value
  if (!isToggled.value && inputElem) {
    // simulate click to trigger dropdown open
    inputElem.click()
  }
}

const onInputFocus = async (): Promise<void> => {
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
    const elem = multiselectSelectionsStagingElement.value

    if (props.collapsedContext) {
      // if collapsed, don't do all the calculations because we are not displaying badges
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
    if (!newVal.length) {
      clearSelection()
      return
    }

    const previouslySelectedItems = new Set<string>(oldVal)
    const currentlySelectedItems = new Set<string>(newVal)

    const selectedAndPresentItems = unfilteredItems.value.filter((item: MultiselectItem) => currentlySelectedItems.has(item.value))
    const deselectedItems = selectedItems.value.filter((item: MultiselectItem) => !currentlySelectedItems.has(item.value) && previouslySelectedItems.has(item.value))

    if (deselectedItems.length) {
      handleMultipleItemsDeselect(deselectedItems)
    }

    if (selectedAndPresentItems.length) {
      handleMultipleItemsSelect(selectedAndPresentItems)
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

    unfilteredItems.value[i].key = `${unfilteredItems.value[i].label?.replace(/ /gi, '-')?.replace(/[^a-z0-9-_]/gi, '')}-${i}` || `multiselect-item-label-${i}`
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
  }

  stageSelections()

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
  numericWidth.value = multiselectElement.value?.clientWidth || 300
}

const resizeObserver = ref()
onMounted(() => {
  resizeObserver.value = new ResizeObserver(entries => {
    // TODO: use resizeObserverHelper(entries, setNumericWidth())
    // Wrapper 'window.requestAnimationFrame' is needed for disabling "ResizeObserver loop limit exceeded" error in DD
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return
      }
      // Actual code
      setNumericWidth()
    })
  })
  resizeObserver.value.observe(multiselectElement.value as HTMLDivElement)
})

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(multiselectElement.value)
  }
})
</script>

<style lang="scss" scoped>
/* Component variables */

$kMultiselectInputPaddingY: var(--kui-space-40, $kui-space-40); // corresponds to mixin, search for variable name in mixins
$kMultiselectInputPaddingX: var(--kui-space-50, $kui-space-50); // corresponds to mixin
$kMultiselectChevronIconSize: var(--kui-icon-size-40, $kui-icon-size-40);
$kMultiselectSelectionsPaddingRight: calc($kMultiselectInputPaddingX + $kMultiselectChevronIconSize + var(--kui-space-40, $kui-space-40));
$kMultiselectInputHelpTextHeight: var(--kui-line-height-20, $kui-line-height-20); // corresponds to mixin

/* Component mixins */

@mixin kMultiselectPopoverMaxHeight {
  max-height: v-bind('popoverContentMaxHeight');
  overflow-y: auto;
}

/* Component styles */

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

  .expanded-selection-empty {
    @include inputText;

    color: var(--kui-color-text-neutral, $kui-color-text-neutral); // override mixin with placeholder text color
    font-size: var(--kui-font-size-30, $kui-font-size-30); // override mixin with placeholder font size
    padding-bottom: $kMultiselectInputPaddingY;
    padding-left: $kMultiselectInputPaddingX;
    padding-right: $kMultiselectSelectionsPaddingRight;
    padding-top: $kMultiselectInputPaddingY;
  }

  .selection-badges-container {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: var(--kui-space-40, $kui-space-40);
    margin-bottom: $kMultiselectInputPaddingY;
    margin-top: $kMultiselectInputPaddingY;
    padding-left: $kMultiselectInputPaddingX;
    padding-right: $kMultiselectSelectionsPaddingRight;

    &.staging {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: auto;
      position: relative;
    }
  }

  .multiselect-icons-container {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    margin-right: $kMultiselectInputPaddingX;
    margin-top: 10px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    .multiselect-clear-icon {
      cursor: pointer;

      &:hover, &:focus {
        color: var(--kui-color-text, $kui-color-text) !important;
      }
    }
  }

  .multiselect-trigger {
    @include inputBoxShadow;

    display: inline-block;
    position: relative;
    width: 100%;

    &.hovered {
      @include inputHover;
    }

    &.focused {
      @include inputFocus;
    }

    &.readonly {
      @include inputReadOnly;
    }

    &.disabled {
      @include inputDisabled;
    }

    .multiselect-input {
      display: inline-block;
      position: relative;
      width: 100%;

      :deep(input) {
        box-shadow: none !important; // remove input's default box shadow
        left: 1px; // so we can see the container's box-shadow
        margin: 1px; // so we can see the container's box-shadow
        padding-bottom: calc($kMultiselectInputPaddingY - 1px); // slightly smaller than container so we can see the container's box-shadow
        padding-top: calc($kMultiselectInputPaddingY - 1px); // slightly smaller than container so we can see the container's box-shadow
        position: relative;
        width: calc(100% - 4px); // slightly smaller than container so we can see the container's box-shadow

        &:hover,
        &:focus,
        &:read-only,
        &:disabled {
          box-shadow: none !important;
        }
      }
    }
  }

  :deep(.multiselect-popover) {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-0, $kui-space-0);

    &.has-dropdown-footer {
      padding-bottom: var(--kui-space-0, $kui-space-0);
    }

    .k-popover-content {
      @include kMultiselectPopoverMaxHeight;

      // when dropdown footer text position is sticky
      &:has(.dropdown-footer.dropdown-footer-sticky) {
        max-height: none;

        .multiselect-list {
          @include kMultiselectPopoverMaxHeight;
        }
      }

      // Firefox workaround
      // since :has() selector isn't supported in Firefox be default
      .multiselect-list ~ .dropdown-footer-sticky {
        bottom: 0;
        position: sticky;
      }
    }
  }

  .multiselect-input-wrapper {
    border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    padding: var(--kui-space-40, $kui-space-40);
  }

  .dropdown-footer {
    align-items: center;
    background-color: var(--kui-color-background, $kui-color-background);
    border-bottom-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    border-bottom-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    display: flex;
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    gap: var(--kui-space-30, $kui-space-30);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    padding: var(--kui-space-50, $kui-space-50);
    pointer-events: none;
  }

  .help-text {
    @include inputHelpText;

    // reset default margin from browser
    margin: 0;
    margin-top: var(--kui-space-40, $kui-space-40);
  }

  &.multiselect-error {
    .multiselect-trigger {
      @include inputError;

      &.hovered {
        @include inputErrorHover;
      }

      &.focused {
        @include inputErrorFocus;
      }
    }

    .help-text {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }
  }
}
</style>
