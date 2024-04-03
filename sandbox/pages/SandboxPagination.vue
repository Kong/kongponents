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
          @page-size-change="handlePageSizeChange"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="pageSizes">
        <KPagination
          :page-sizes="[10, 20, 30, 40]"
          :total-count="100"
          @page-size-change="handlePageSizeChange"
        />
        <KPagination
          :page-sizes="[1]"
          :total-count="100"
          @page-size-change="handlePageSizeChange"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="initialPageSize">
        <KPagination
          :initial-page-size="20"
          :page-sizes="[10, 20, 30, 40]"
          :total-count="100"
          @page-size-change="handlePageSizeChange"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="neighbors">
        <KPagination
          :neighbors="3"
          :page-size="15"
          :total-count="1000"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disablePageJump">
        <KPagination
          disable-page-jump
          :total-count="1000"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="offset">
        <KPagination
          offset
          :total-count="1000"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="offsetPreviousButtonDisabled">
        <KPagination
          offset-previous-button-disabled
          pagination-type="offset"
          :total-count="1000"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="offsetNextButtonDisabled">
        <KPagination
          offset-next-button-disabled
          pagination-type="offset"
          :total-count="1000"
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
