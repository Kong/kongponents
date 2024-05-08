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
        <KPop
          v-if="false"
          button-text="KPop Button"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="tag">
        <KPop
          v-if="false"
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
          v-if="false"
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
          v-if="false"
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
          v-if="false"
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
          v-if="false"
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
          v-if="false"
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
          v-if="false"
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
        <KPop
          v-if="false"
          :hide-popover="showPopover"
        >
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
          v-if="false"
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
          v-if="false"
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
        <KPop
          v-if="false"
        >
          <KButton appearance="secondary">
            Slotted button
          </KButton>

          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="title & content">
        <KPop
          v-if="false"
          button-text="Button"
        >
          <template #title>
            Popover title
          </template>

          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="footer">
        <KPop
          v-if="false"
          button-text="Button"
        >
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

      <!-- Events -->
      <SandboxTitleComponent
        is-subtitle
        title="Events"
      />
      <SandboxSectionComponent title="open & close">
        <KPop
          v-if="false"
          button-text="Button"
          @close="onEvent('Popover closed')"
          @open="onEvent('Popover opened')"
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="popover-click">
        <KComponent
          v-slot="{ data }"
          :data="{ closeOnPopoverClick: false }"
        >
          <KInputSwitch
            v-model="data.closeOnPopoverClick"
            label="Close on popover click"
          />
          <KPop
            button-text="Button"
            :close-on-popover-click="data.closeOnPopoverClick"
            @close="onEvent('Popover closed')"
            @open="onEvent('Popover opened')"
            @popover-click="onEvent('Popover clicked')"
          >
            <template #content>
              <KButton
                appearance="tertiary"
                size="small"
                @click="onEvent('Popover content clicked')"
              >
                Click here.
              </KButton>
            </template>
          </KPop>
        </KComponent>
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

const onEvent = (message: string): void => {
  console.log(message)
}
</script>
