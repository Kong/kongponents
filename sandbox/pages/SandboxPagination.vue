<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KPagination"
  >
    <div class="kpagination-sandbox">
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
      <SandboxSectionComponent title="currentPage">
        <KPagination
          :current-page="currentPage"
          :items="currentPageItems"
          :page-sizes="[10, 20, 30, 40]"
          :total-count="currentPageItems.length"
          @page-change="handleCurrentPage"
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
      <SandboxSectionComponent
        description="Setting a way too high number of visible neighbors here (20) but KPagination detects overflow and reduces the number of visible neighbors down to acceptable number (minimum of 1)."
        title="neighbors"
      >
        <div class="neighbors-wrapper">
          <KPagination
            :neighbors="20"
            :page-size="15"
            :total-count="1000"
          />
        </div>
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
import { inject, ref, computed } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { PageChangeData, PageSizeChangeData } from '@/types'

const handlePageSizeChange = (obj: PageSizeChangeData) => {
  console.log(obj)
}

const currentPage = ref<number>(7)
const currentPageItems = computed(() => Array.from({ length: 200 }, (_, index) => index + 1))
const handleCurrentPage = ({ page }: PageChangeData) => {
  currentPage.value = page
}


</script>

<style lang="scss" scoped>
.kpagination-sandbox {
  .neighbors-wrapper {
    border: $kui-border-width-10 solid $kui-color-border;
    display: flex;
    flex-direction: column;
    gap: $kui-space-40;
    max-width: 100%;
    overflow-x: auto;
    padding: $kui-space-70;
    resize: horizontal;
  }
}
</style>
