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
          title="Info"
        />
        <KAlert
          appearance="success"
          message="This is success alert."
          title="Success"
        />
        <KAlert
          appearance="warning"
          message="This is warning alert."
          title="Warning"
        />
        <KAlert
          appearance="danger"
          message="This is danger alert."
          title="Danger"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hideIcon">
        <KAlert
          appearance="info"
          dismissible
          :hide-icon="false"
          message="This is info alert with icon."
        />
        <KAlert
          appearance="info"
          dismissible
          :hide-icon="false"
          message="This is info alert with icon and super long text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <KAlert
          appearance="info"
          dismissible
          :hide-icon="false"
          title="Just title and icon"
        />
        <KAlert
          appearance="info"
          dismissible
          :hide-icon="false"
          title="Just super long title and icon. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut."
        />
        <KAlert
          appearance="info"
          dismissible
          :hide-icon="false"
          message="This is info alert with icon."
          title="Info"
        />
        <KAlert
          appearance="success"
          dismissible
          :hide-icon="false"
          message="This is success alert with icon."
          title="Success"
        />
        <KAlert
          appearance="warning"
          dismissible
          :hide-icon="false"
          message="This is warning alert with icon."
          title="Warning"
        />
        <KAlert
          appearance="danger"
          dismissible
          :hide-icon="false"
          message="This is danger alert with icon."
          title="Danger"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="dismissible">
        <KAlert
          dismissible
          message="This is a dismissible alert."
        />
        <KAlert
          dismissible
          :hide-icon="false"
          message="Fully packed alert. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          title="This is a dismissible alert with super long title, super long message and icon. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="icon">
        <KAlert
          :hide-icon="false"
          message="Alert with a custom icon."
        >
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
