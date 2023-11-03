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
        <ul>
          <li>
            <KCopy
              :text="text"
            />
          </li>
          <li>
            <KCopy
              format="hidden"
              :text="text"
            />
          </li>
          <li>
            <KCopy
              format="redacted"
              :text="text"
            />
          </li>
          <li>
            <KCopy
              format="deleted"
              :text="text"
            />
          </li>
        </ul>
      </div>
    </SandboxSectionComponent>

    <SandboxSectionComponent
      title="badge"
    >
      <template #description>
        Whether or not to display as a badge. Defaults to false.
      </template>
      <div class="horizontal-spacing">
        <KCopy
          badge
          :text="text"
          truncate
        />
      </div>
    </SandboxSectionComponent>

    <SandboxSectionComponent
      title="badgeLabel"
    >
      <template #description>
        Text displayed before the copyable text when badge is true.
      </template>
      <div class="horizontal-spacing">
        <KCopy
          badge
          badge-label="Id"
          :text="text"
        />
      </div>
    </SandboxSectionComponent>

    <SandboxSectionComponent
      title="truncationLimit"
    >
      <template #description>
        Number of characters to truncate at. Defaults to 8.
      </template>
      <div class="horizontal-spacing">
        <KCopy
          :text="text"
          truncate
          :truncation-limit="15"
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
