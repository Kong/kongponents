<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSegmentedControl"
  >
    <div class="ksegmentedcontrol-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1244%3A14989&mode=dev">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="options">
        <KSegmentedControl
          v-model="vModel1"
          :options="[{ label:'Left',value:'left' }, { label:'Right',value:'right' }]"
        />
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { inject, ref } from 'vue'

const vModel1 = ref('left')
</script>

<style lang="scss" scoped>
// .ksegmentedcontrol-sandbox {
// }
</style>
