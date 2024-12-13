<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KAlert"
  >
    <div class="kalert-sandbox">
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
          title="Info"
        >
          <div class="appearance-content">
            This is info alert.
            <a
              href="https://kongponents.konghq.com/components/alert.html"
              target="_blank"
            >
              Link
            </a>
            <code>someCodeHere: true</code>
          </div>
        </KAlert>
        <KAlert
          appearance="success"
          title="Success"
        >
          <div class="appearance-content">
            This is success alert.
            <a
              href="https://kongponents.konghq.com/components/alert.html"
              target="_blank"
            >
              Link
            </a>
            <code>someCodeHere: true</code>
          </div>
        </KAlert>
        <KAlert
          appearance="warning"
          title="Warning"
        >
          <div class="appearance-content">
            This is warning alert.
            <a
              href="https://kongponents.konghq.com/components/alert.html"
              target="_blank"
            >
              Link
            </a>
            <code>someCodeHere: true</code>
          </div>
        </KAlert>
        <KAlert
          appearance="danger"
          title="Danger"
        >
          <div class="appearance-content">
            This is danger alert.
            <a
              href="https://kongponents.konghq.com/components/alert.html"
              target="_blank"
            >
              Link
            </a>
            <code>someCodeHere: true</code>
          </div>
        </KAlert>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="showIcon">
        <KAlert
          appearance="info"
          dismissible
          message="This is info alert with icon."
          show-icon
        />
        <KAlert
          appearance="info"
          dismissible
          message="This is info alert with icon and super long text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          show-icon
        />
        <KAlert
          appearance="info"
          dismissible
          show-icon
          title="Just title and icon"
        />
        <KAlert
          appearance="info"
          dismissible
          show-icon
          title="Just super long title and icon. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut."
        />
        <KAlert
          appearance="info"
          dismissible
          message="This is info alert with icon."
          show-icon
          title="Info"
        />
        <KAlert
          appearance="success"
          dismissible
          message="This is success alert with icon."
          show-icon
          title="Success"
        />
        <KAlert
          appearance="warning"
          dismissible
          message="This is warning alert with icon."
          show-icon
          title="Warning"
        />
        <KAlert
          appearance="danger"
          dismissible
          message="This is danger alert with icon."
          show-icon
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
          message="Fully packed alert. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          show-icon
          title="This is a dismissible alert with super long title, super long message and icon. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <KAlert
          dismissible
          message="This is a really long message with unbreakable word 1IfLzvISgP/MW3ddl8DBDXAEX2Njz4urmQZAQ+MYy8Y5IY8nIiRs3XO+G/8Wtz6/+oSd3uYRwUbK1YxCQRFjX+4X2ZMBF1V/Zoox2UyKGT/zm1GL3NiskUNVdSvQtNpWBQUHAwIwFwYJKwYBBAGCNxQCBAoMCGNlcnRUeXBlMCMGCSsGAQQBgjcVAgQWBBQBAQEBAQEBAQEBAQEBAQEBAQEBATAcBgkrBgEEAYI3FQcEDzANBgUpAQEBAQIBCgIBVQQDHh4AawBvAG4AbgBlAGMAdAAtAGQAZQBmAGEAdQBsAHQwHhcNMjQwNzI0MDgzODA3WhcNMzQwNzI0MDgzODA3WjA0MTIwCQYDVQQGEwJVUzAlBgNVBAMeHgBrAG8AFDATBgkrBgEEAYI3FQEEBgIEABQACjALBgkqhkiG9w0BAQ0DggEBABRXflxHNEO0"
          show-icon
          title="This a really long title with unbreakable word MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDJ2fL1cYjvw8eaCORQKgCq/Qen0lOBFC5O8YWm795FPrqwa/tJAatvyJdkN5mHH8CTBsax+NDsk082LR5f9HnWLunmYg11e8DKx+IQz1x1VbNgpCbWj4pBFjnVQHdR3xR1SOHodmnzpqtca/rWfIA8eZi9OUxmWgdYpfLhqqYbvxwgZsvKYZGC7LsUkGHHtAgMBAAECggEAB/X/WdBgNXvuGgLMG0D+R6EZuaPX7jDbHkIiDs/6ObxJzHJyI9bo9+K3AG/TDBEhGrXmaa8BjYqqm7M/ZEUJpcOLTAht2w8aLwHVz0rEY7HVCbIqLDdLCv7Pj+DcuMupxAfymbXcCFVjVU8wxKnkB+e1TKbfAK1Yh8SNMZ5ZFrlBwrBVDRt1t9ONAxc1aSJi112."
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

<style scoped lang="scss">
.appearance-content {
  display: flex;
  gap: $kui-space-40;
}
</style>
