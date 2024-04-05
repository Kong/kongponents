<template>
  <div class="k-table-column-visibility-menu">
    <KDropdown @toggle-dropdown="handleDropdownToggle">
      <KTooltip text="Show/Hide Columns">
        <KButton
          appearance="secondary"
          class="menu-button"
        >
          <template #icon>
            <CogIcon />
          </template>
        </KButton>
      </KTooltip>

      <template #items>
        <KDropdownItem
          v-for="col in columns"
          :key="col.key"
          class="column-visibility-menu-item"
          @click.stop="() => {
            visibilityMap[col.key] = !visibilityMap[col.key]
            isDirty = true
          }"
        >
          <!-- KLabel must be separate to maintain click handling on the label within the dropdown item -->
          <KCheckbox
            v-model="visibilityMap[col.key]"
            :aria-labelledby="`${tableId}-${col.key}-visibility-checkbox-label`"
          />
          <KLabel
            :id="`${tableId}-${col.key}-visibility-checkbox-label`"
            class="visibility-checkbox-label"
          >
            {{ col.label }}
          </KLabel>
        </KDropdownItem>
        <KDropdownItem>
          <KButton
            appearance="tertiary"
            class="apply-button"
            @click="handleApply"
          >
            Apply
          </KButton>
        </KDropdownItem>
      </template>
    </KDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, type PropType } from 'vue'
import type { TableHeader } from '@/types'
import { CogIcon } from '@kong/icons'
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

onBeforeMount(() => {
  // initialize visibility state
  initVisibilityMap()
})
</script>

<style lang="scss" scoped>
.k-table-column-visibility-menu {
  margin-left: var(--kui-space-auto, $kui-space-auto);

  .apply-button {
    margin-left: var(--kui-space-auto, $kui-space-auto);
    margin-right: var(--kui-space-auto, $kui-space-auto);
  }

  .visibility-checkbox-label {
    margin-bottom: var(--kui-space-0, $kui-space-0);
  }
}
</style>
