<template>
  <div class="k-table-column-visibility-menu">
    <KDropdown>
      <KButton
        appearance="secondary"
        class="menu-button"
      >
        <CogIcon />
      </KButton>

      <template #items>
        <KDropdownItem
          v-for="col in columns"
          :key="col.key"
          class="column-visibility-menu-item"
          @click.stop
        >
          <KCheckbox
            v-model="visibilityMap[col.label]"
            :label="col.label"
          />
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
  visibilityPreferences: {
    type: Object as PropType<Record<string, boolean>>,
    default: () => ({}),
  },
})

const visibilityMap = ref<Record<string, boolean>>({})

const handleApply = () => {
  emit('update:visibility', visibilityMap.value)
}

onBeforeMount(() => {
  // initialize visibility state
  visibilityMap.value = props.columns.reduce((acc, col: TableHeader) => {
    acc[col.label] = props.visibilityPreferences[col.label] === undefined ? true : props.visibilityPreferences[col.label]

    return acc
  }, {} as Record<string, boolean>)
})
</script>

<style lang="scss" scoped>
.k-table-column-visibility-menu {
  margin-left: auto;

  .apply-button {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
