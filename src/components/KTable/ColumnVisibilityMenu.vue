<template>
  <div class="table-column-visibility-menu">
    <KDropdown
      data-testid="table-column-visibility-menu"
      :disabled="disabled"
      :kpop-attributes="{ placement: 'bottom-end' }"
      @toggle-dropdown="handleDropdownToggle"
    >
      <KTooltip
        placement="bottom-end"
        :text="isDropdownOpen ? undefined : 'Show/Hide Columns'"
      >
        <KButton
          appearance="secondary"
          aria-label="Show/Hide Columns"
          class="menu-button"
          data-testid="column-visibility-menu-button"
          :disabled="disabled"
          icon
          size="large"
        >
          <TableColumnsIcon decorative />
        </KButton>
      </KTooltip>

      <template #items>
        <KInput
          v-if="searchColumnInMenu || filteredItems.length > 5"
          v-model.trim="searchColumnInMenu"
          autocomplete="off"
          class="search-input"
          data-testid="search-input"
          placeholder="Search columns"
          type="search"
          @click.stop
          @input="handleSearch"
        >
          <template #before>
            <SearchIcon decorative />
          </template>
          <template
            v-if="searchColumnInMenu"
            #after
          >
            <KButton
              appearance="tertiary"
              class="clear-search"
              data-testid="clear-search-button"
              icon
              size="small"
              @click.stop="() => searchColumnInMenu = ''"
            >
              <CloseIcon decorative />
            </KButton>
          </template>
        </KInput>

        <div
          ref="menuItemsRef"
          class="menu-items-wrapper"
        >
          <KDropdownItem
            v-for="col in filteredItems"
            :key="col.key"
            class="column-visibility-menu-item"
            :data-testid="`column-visibility-menu-item-${col.key}`"
            @click.stop="() => {
              visibilityMap[col.key] = !visibilityMap[col.key]
              isDirty = true
            }"
          >
            <!-- KLabel must be separate to maintain click handling on the label within the dropdown item -->
            <KCheckbox
              v-model="visibilityMap[col.key]"
              :aria-labelledby="`${tableId}-${col.key}-visibility-checkbox-label`"
              :data-testid="`column-visibility-checkbox-${col.key}`"
            />
            <KLabel
              :id="`${tableId}-${col.key}-visibility-checkbox-label`"
              class="visibility-checkbox-label"
            >
              {{ col.label }}
            </KLabel>
          </KDropdownItem>
        </div>
        <div class="apply-button-wrapper">
          <KButton
            appearance="tertiary"
            class="apply-button"
            data-testid="apply-button"
            @click="handleApply"
          >
            Apply
          </KButton>
        </div>
      </template>
    </KDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount, onMounted, type PropType, nextTick, computed } from 'vue'
import type { TableHeader } from '@/types'
import { debounce } from '@/utilities/debounce'
import { SearchIcon, CloseIcon, TableColumnsIcon } from '@kong/icons'
import KButton from '@/components/KButton/KButton.vue'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KDropdownItem from '@/components/KDropdown/KDropdownItem.vue'
import KInput from '@/components/KInput/KInput.vue'

const emit = defineEmits<{
  (e: 'update', columnVisibility: Record<string, boolean>): void
}>()

const props = defineProps({
  columns: {
    type: Array as PropType<TableHeader[]>,
    required: true,
  },
  tableId: {
    type: String,
    required: true,
  },
  visibilityPreferences: {
    type: Object as PropType<Record<string, boolean>>,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const isDropdownOpen = ref<boolean>(false)
const visibilityMap = ref<Record<string, boolean>>({})
const isDirty = ref(false)
const menuItemsRef = ref<HTMLDivElement>()
const searchColumnInMenu = ref('')

const initVisibilityMap = (): void => {
  visibilityMap.value = props.columns.reduce((acc, col: TableHeader) => {
    acc[col.key] = props.visibilityPreferences[col.key] === undefined ? true : props.visibilityPreferences[col.key]

    return acc
  }, {} as Record<string, boolean>)
  isDirty.value = false
}

const handleSearch = debounce((search: any) => {
  searchColumnInMenu.value = search
  if (menuItemsRef.value) {
    setOverflowClass(menuItemsRef.value)
  }
}, 500)

const filteredItems = computed((): TableHeader[] => {
  if (!searchColumnInMenu.value) {
    return props.columns
  }

  return props.columns.filter(item => {
    return (item.label ? item.label : item.key).toLowerCase().includes(searchColumnInMenu.value.toLowerCase())
  })
})

const handleApply = (): void => {
  // pass by ref problems
  emit('update', JSON.parse(JSON.stringify(visibilityMap.value)))
  isDirty.value = false
  searchColumnInMenu.value = ''
}

const handleDropdownToggle = (isOpen: boolean): void => {
  isDropdownOpen.value = isOpen

  // set scroll classes on open
  if (isOpen && menuItemsRef.value) {
    nextTick(() => {
      if (menuItemsRef.value) {
        setOverflowClass(menuItemsRef.value)
      }
    })
  }
  // reset the map if the dropdown is closed without applying changes
  if (!isOpen && isDirty.value) {
    initVisibilityMap()
  }

  // reset the search if the dropdown is closed
  if (!isOpen) {
    searchColumnInMenu.value = ''
  }
}

/**
 * Fade out the bottom of the menu items when scrollable
 */
const setOverflowClass = (el: HTMLDivElement) => {
  const isScrollable = el.scrollHeight > el.clientHeight

  // GUARD: If element is not scrollable, remove all classes
  if (!isScrollable) {
    el.classList.remove('is-bottom-overflowing')
    return
  }

  // Otherwise, the element is overflowing!
  // One pixel is added to the height to account for non-integer heights.
  const isScrolledToBottom = el.scrollHeight < el.clientHeight + el.scrollTop + 1
  el.classList.toggle('is-bottom-overflowing', !isScrolledToBottom)
}

watch(() => props.visibilityPreferences, () => {
  initVisibilityMap()
}, { immediate: true })

onMounted(() => {
  if (menuItemsRef.value) {
    menuItemsRef.value.addEventListener('scroll', (e) => {
      const el = e.currentTarget as HTMLDivElement

      setOverflowClass(el)
    })

    setOverflowClass(menuItemsRef.value)
  }
})

onBeforeMount(() => {
  // initialize visibility state
  initVisibilityMap()
})
</script>

<style lang="scss" scoped>
.table-column-visibility-menu {
  .menu-items-wrapper {
    $bottom-mask-size: 0px;
    -webkit-mask-image: linear-gradient(to bottom, black calc(100% - $bottom-mask-size), transparent 100%);
    mask-image: linear-gradient(to bottom, black calc(100% - $bottom-mask-size), transparent 100%);
    max-height: 250px;
    overflow-y: auto;

    &.is-bottom-overflowing {
      $bottom-mask-size: 48px;

      -webkit-mask-image: linear-gradient(to bottom, black calc(100% - $bottom-mask-size), transparent 100%);
      mask-image: linear-gradient(to bottom, black calc(100% - $bottom-mask-size), transparent 100%);
    }
  }

  .apply-button-wrapper {
    display: flex;
    width: 100%;

    .apply-button {
      margin-left: var(--kui-space-auto, $kui-space-auto);
      margin-right: var(--kui-space-20, $kui-space-20);
    }
  }

  .visibility-checkbox-label {
    cursor: pointer;
    margin-bottom: var(--kui-space-0, $kui-space-0);
    margin-left: calc(-1 * var(--kui-space-40, $kui-space-40)); // because dropdown item container and checkbox both have default spacing, reduce it
  }

  :deep(.k-input).search-input {
    padding-bottom: $kui-space-20;
    padding-left: $kui-space-20;
    padding-right: $kui-space-20;
    ::-webkit-search-cancel-button {
      /* hide the default "X" button */
      -webkit-appearance: none;
    }
  }
}
</style>
