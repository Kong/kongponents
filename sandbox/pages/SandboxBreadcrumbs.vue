<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KBreadcrumbs"
  >
    <div class="kbreadcrumbs-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=470%3A22444&mode=dev&t=tS1kk3tqkOVTlZ8a-1">
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
          item-max-width="50px"
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
          <template #icon-not-here>
            <KongIcon />
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
import { RuntimeDedicatedCloudIcon, KongIcon } from '@kong/icons'

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
  title: 'Non-link item',
  text: 'Non-link item',
},
{
  key: 'here',
  title: 'You are here',
  text: 'You are here',
  to: { path: '/breadcrumbs' },
}]
</script>
