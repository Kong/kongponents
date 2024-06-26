<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KCopy"
  >
    <div class="kcopy-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="text">
        <KCopy :text="uuid1" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="badge">
        <KCopy
          badge
          :text="uuid1"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="badgeLabel">
        <KCopy
          badge
          badge-label="Service ID:"
          :text="uuid1"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="truncate">
        <KCopy
          :text="uuid1"
          truncate
        />
        <KCopy
          badge
          :text="uuid1"
          truncate
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="truncationLimit">
        <KCopy
          :text="uuid1"
          truncate
          :truncation-limit="5"
        />
        <KCopy
          badge
          :text="uuid1"
          truncate
          :truncation-limit="5"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="copyTooltip">
        <KCopy
          copy-tooltip="Click to copy successfully"
          :text="uuid1"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="textTooltip">
        <KCopy
          :text="uuid1"
          text-tooltip="Text hover tooltip"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="successTooltip">
        <KCopy
          success-tooltip="Successfully copied"
          :text="uuid1"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="monospace">
        <KCopy
          :monospace="false"
          :text="uuid1"
        />
        <KCopy
          badge
          monospace
          :text="uuid1"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="format">
        <KCopy :text="uuid1" />
        <KCopy
          format="hidden"
          :text="uuid1"
        />
        <KCopy
          format="redacted"
          :text="uuid1"
        />
        <KCopy
          format="deleted"
          :text="uuid1"
        />
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent title="KCopy inside of a KButton">
        <div class="horizontal-container">
          <KButton appearance="secondary">
            <KCopy
              format="hidden"
              :text="uuid1"
            />
          </KButton>
          <KButton appearance="tertiary">
            <KCopy
              format="hidden"
              :text="uuid1"
            />
          </KButton>
        </div>
        <div>
          <p>Clicking on KButton will trigger click on KCopy:</p>
          <KButton
            @click="onButtonClick"
          >
            <KCopy
              ref="kButtonKCopyElement"
              format="hidden"
              :text="uuid1"
            />
          </KButton>
        </div>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import KCopy from '@/components/KCopy/KCopy.vue'

const uuid1: string = '2cf64827-6c70-4116-906b-4c9aae83fc4a'

const kButtonKCopyElement = ref<InstanceType<typeof KCopy> | null>(null)

const onButtonClick = () => {
  // @ts-ignore - function is exposed
  kButtonKCopyElement.value?.copy()
}
</script>

<style lang="scss" scoped>
.kcopy-sandbox {
  .horizontal-container {
    display: flex;
    flex-wrap: wrap;
    gap: $kui-space-50;
  }
}
</style>
