<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KToaster"
  >
    <div class="ktoaster-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=497%3A9761&mode=dev&t=lcG4fMxcpZoeYwsC-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title">
        <!-- TODO -->
      </SandboxSectionComponent>
      <SandboxSectionComponent title="message">
        <KButton @click="openToaster('message')">
          KToaster
        </KButton>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="appearance">
        <div class="horizontal-container">
          <KButton @click="openToaster('appearance:info')">
            <InfoIcon />
            Info
          </KButton>
          <KButton @click="openToaster('appearance:success')">
            <CheckCircleIcon />
            Success
          </KButton>
          <KButton
            appearance="danger"
            @click="openToaster('appearance:danger')"
          >
            <ClearIcon />
            Danger
          </KButton>
          <KButton @click="openToaster('appearance:warning')">
            <WarningIcon />
            Warning
          </KButton>
          <KButton
            appearance="secondary"
            @click="openToaster('appearance:system')"
          >
            <KongIcon />
            System
          </KButton>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="timeout">
        <KButton @click="openToaster('timeout')">
          KToaster
        </KButton>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default">
        <!-- TODO -->
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { inject } from 'vue'
import { ToastManager } from '@/index'
import type { Toast } from '@/types'
import { InfoIcon, CheckCircleIcon, WarningIcon, ClearIcon, KongIcon } from '@kong/icons'

const toaster = new ToastManager()

const openToaster = (argument: string) => {
  let options: Toast = {
    appearance: 'info',
    message: 'This is a toaster',
  }

  switch (argument) {
    case 'message':
      options = { message: 'This is toaster message', appearance: 'info' }
      break
    case 'appearance:info':
      options = { message: 'This is info toaster', appearance: 'info' }
      break
    case 'appearance:success':
      options = { message: 'This is success toaster', appearance: 'success' }
      break
    case 'appearance:danger':
      options = { message: 'This is danger toaster', appearance: 'danger' }
      break
    case 'appearance:warning':
      options = { message: 'This is warning toaster', appearance: 'warning' }
      break
    // case 'appearance:system':
    //   options = { message: 'This is system toaster', appearance: 'system' }
    //   break
    case 'timeout':
      options = { message: 'This is toaster with timeout (10s)', appearance: 'info', timeoutMilliseconds: 10000 }
      break
  }

  toaster.open(options)
}
</script>

<style lang="scss" scoped>
.ktoaster-sandbox {
  .horizontal-container {
    display: flex;
    gap: $kui-space-50;
  }
}
</style>
