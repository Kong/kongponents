<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KStepper"
  >
    <div class="kstepper-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1315%3A5554&mode=dev&t=9OUwgF6LJ2eiytiT-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="buttonText">
        <KPop button-text="KPop button">
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="tag">
        <KPop
          button-text="Button"
          tag="section"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="title">
        <KPop
          button-text="Button"
          title="Popover title"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="trigger">
        <KPop
          button-text="Button"
          trigger="hover"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="placement">
        <KPop
          button-text="Button"
          placement="top"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="width">
        <KPop
          button-text="Button"
          width="500"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="maxWidth">
        <KPop
          button-text="Button"
          max-width="100"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="popoverTimeout">
        <KPop
          button-text="Button"
          :popover-timeout="3000"
          trigger="hover"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hidePopover">
        <p>
          <span v-if="!hidingPopover">Hide popover: <code>false</code></span>
          <span v-else>Hiding popover in: {{ timeoutValue }}</span>
        </p>
        <KPop :hide-popover="showPopover">
          <KButton @click="startPopoverTimeout">
            Button
          </KButton>

          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disabled">
        <KPop
          button-text="Button"
          disabled
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hideCaret">
        <KPop
          button-text="Button"
          hide-caret
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default">
        <KPop>
          <KButton appearance="secondary">
            Slotted button
          </KButton>

          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="title & content">
        <KPop button-text="Button">
          <template #title>
            Popover title
          </template>

          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="footer">
        <KPop button-text="Button">
          <template #content>
            Popover content.
          </template>

          <template #footer>
            <KButton size="small">
              Footer button
            </KButton>
          </template>
        </KPop>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, nextTick, ref, watch } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'

const hidingPopover = ref<boolean>(false)
const interval = ref<any>(null)
const showPopover = ref<boolean>(true)
const timeoutValue = ref<number>(3)

const startPopoverTimeout = () => {
  hidingPopover.value = true

  setTimeout(() => {
    showPopover.value = false
  }, 3000)

  interval.value = setInterval(() => {
    timeoutValue.value -= 1
  }, 1000)
}

watch(showPopover, async (value) => {
  if (!value) {
    await nextTick()
    clearInterval(interval.value)
    hidingPopover.value = false
    showPopover.value = true
    timeoutValue.value = 3
    interval.value = null
  }
})
</script>
