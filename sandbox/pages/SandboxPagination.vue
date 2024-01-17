<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KPagination"
  >
    <div class="kpagination-sandbox">
      <!-- Figma -->
      <SandboxTitleComponent
        is-subtitle
        title="Figma"
      />
      <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A12478&mode=dev">
        Figma
      </KExternalLink>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="totalCount">
        <KPagination
          :total-count="50"
          @page-size-changed="handlePageSizeChange"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="pageSizes">
        <KPagination
          :page-sizes="[10, 20, 30, 40]"
          :total-count="100"
          @page-size-changed="handlePageSizeChange"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="initialPageSize">
        <KPagination
          :initial-page-size="20"
          :page-sizes="[10, 20, 30, 40]"
          :total-count="100"
          @page-size-changed="handlePageSizeChange"
        />
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'

const handlePageSizeChange = (obj: any) => {
  console.log(obj)
}
</script>
