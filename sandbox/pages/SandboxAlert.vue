<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KAlert"
  >
    <div class="kalert-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1105%3A733&mode=dev&t=6zTR9N7eIIoXGsX7-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title">
        <KAlert title="This Is An Alert With Title And No Message" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="message">
        <KAlert message="This is an alert with message and no title (most common use-case)." />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="appearance">
        <KAlert
          appearance="info"
          message="This is info alert."
        />
        <KAlert
          appearance="success"
          message="This is success alert."
        />
        <KAlert
          appearance="warning"
          message="This is warning alert."
        />
        <KAlert
          appearance="danger"
          message="This is danger alert."
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hideIcon">
        <KAlert
          appearance="info"
          :hide-icon="false"
          message="This is info alert with icon."
        />
        <KAlert
          appearance="success"
          :hide-icon="false"
          message="This is success alert with icon."
        />
        <KAlert
          appearance="warning"
          :hide-icon="false"
          message="This is warning alert with icon."
        />
        <KAlert
          appearance="danger"
          :hide-icon="false"
          message="This is danger alert with icon."
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="dismissible">
        <KAlert
          dismissible
          message="This is a dismissible button."
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="icon">
        <KAlert message="Alert with a custom icon.">
          <template #icon>
            <KongIcon />
          </template>
        </KAlert>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="default">
        <KAlert>
          <strong>Custom</strong> content
        </KAlert>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon } from '@kong/icons'
</script>
