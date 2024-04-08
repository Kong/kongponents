<template>
  <div class="table-column-visibility-menu">
    <KDropdown
      data-testid="table-column-visibility-menu"
      @toggle-dropdown="handleDropdownToggle"
    >
      <KTooltip text="Show/Hide Columns">
        <KButton
          appearance="tertiary"
          class="menu-button"
          data-testid="column-visibility-menu-button"
        >
          <template #icon>
            <ViewColumns />
          </template>
        </KButton>
      </KTooltip>

      <template #items>
        <KDropdownItem
          v-for="col in columns"
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
import { ref, watch, onBeforeMount, type PropType } from 'vue'
import type { TableHeader } from '@/types'
import { ViewColumns } from '@kong/icons'
import KButton from '@/components/KButton/KButton.vue'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KDropdownItem from '@/components/KDropdown/KDropdownItem.vue'

const emit = defineEmits<{
  (e: 'update:visibility', columnVisibility: Record<string, boolean>): void
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
})

const visibilityMap = ref<Record<string, boolean>>({})
const isDirty = ref(false)

const initVisibilityMap = (): void => {
  visibilityMap.value = props.columns.reduce((acc, col: TableHeader) => {
    acc[col.key] = props.visibilityPreferences[col.key] === undefined ? true : props.visibilityPreferences[col.key]

    return acc
  }, {} as Record<string, boolean>)
  isDirty.value = false
}

const handleApply = (): void => {
  // pass by ref problems
  emit('update:visibility', JSON.parse(JSON.stringify(visibilityMap.value)))
  isDirty.value = false
}

const handleDropdownToggle = (isOpen: boolean): void => {
  // reset the map if the dropdown is closed without applying changes
  if (!isOpen && isDirty.value) {
    initVisibilityMap()
  }
}

watch(() => props.visibilityPreferences, () => {
  initVisibilityMap()
})

onBeforeMount(() => {
  // initialize visibility state
  initVisibilityMap()
})
</script>

<style lang="scss" scoped>
.table-column-visibility-menu {
  margin-left: var(--kui-space-auto, $kui-space-auto);

  .apply-button-wrapper {
    display: flex;
    width: 100%;

    .apply-button {
      margin-left: var(--kui-space-auto, $kui-space-auto);
      margin-right: var(--kui-space-auto, $kui-space-auto);
    }
  }

  .visibility-checkbox-label {
    cursor: pointer;
    margin-bottom: var(--kui-space-0, $kui-space-0);
    margin-left: calc(-1 * var(--kui-space-40, $kui-space-40)); // because dropdown item container and checkbox both have default spacing, reduce it
  }
}
</style>
