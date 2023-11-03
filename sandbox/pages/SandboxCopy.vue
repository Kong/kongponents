<template>
  <div class="kcopy-sandbox">
    <SandboxTitleComponent
      title="KCopy"
    />
    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent
      title="format"
    >
      <template #description>
        KCopy component takes 1 of 4 format:
        <ul>
          <li>
            <em>default</em> - displays regular copyable text
          </li>
          <li>
            <em>hidden</em>
          </li>
          <li>
            <em>redacted</em>
          </li>
          <li>
            <em>deleted</em>
          </li>
        </ul>
      </template>
      <div class="horizontal-spacing">
        <KCopy
          :text="text"
        />
        <KCopy
          format="hidden"
          :text="text"
        />
        <KCopy
          format="hidden"
          :text="text"
        />
        <KCopy
          format="redacted"
          :text="text"
        />
      </div>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KCopy } from '@/components'

const text = '123-asd-zxcv-678-fghj'
</script>

<style lang="scss" scoped>
.kcopy-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
  }
}
</style>
