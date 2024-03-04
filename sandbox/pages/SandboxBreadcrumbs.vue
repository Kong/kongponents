<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KBreadcrumbs"
  >
    <div class="kbreadcrumbs-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A9543&mode=dev&t=USFhEkebi5cmYxaK-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="items">
        <KBreadcrumbs
          :items="breadcrumbs"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="itemMaxWidth">
        <KBreadcrumbs
          item-max-width="20px"
          :items="breadcrumbs"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="icon">
        <KBreadcrumbs :items="breadcrumbs">
          <template #icon-home>
            <RuntimeDedicatedCloudIcon />
          </template>
        </KBreadcrumbs>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { RuntimeDedicatedCloudIcon } from '@kong/icons'

const breadcrumbs = [{
  key: 'home',
  to: { path: '/' },
  title: 'Go Home',
  text: 'Home',
  icon: 'kong',
},
{
  key: 'button',
  to: { path: '/button' },
  title: 'Go to Button',
  text: 'Button',
},
{
  key: 'not-here',
  title: 'You are not Here',
  text: 'You are not Here',
},
{
  key: 'here',
  title: 'You are Here',
  text: 'You are Here',
}]
</script>
