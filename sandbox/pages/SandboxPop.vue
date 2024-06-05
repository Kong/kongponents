<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KPop"
  >
    <div class="kpop-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1470%3A3448&mode=dev&t=qJAFUBmW2m9dkFvT-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="buttonText">
        <KPop button-text="KPop Button">
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
        <div class="vertical-container">
          <KPop
            v-for="placement in PopPlacementsArray"
            :key="placement"
            :button-text="placement"
            :placement="placement"
          >
            <template #content>
              Popover content.
            </template>
          </KPop>
        </div>
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
      <SandboxSectionComponent
        title="hideCaret"
      >
        <KPop
          button-text="Button"
          hide-caret
        >
          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hideCloseIcon">
        <KComponent
          v-slot="{ data }"
          :data="{ hideCloseIcon: false }"
        >
          <KInputSwitch
            v-model="data.hideCloseIcon"
            label="Hide close icon"
          />

          <KPop
            button-text="Button"
            :hide-close-icon="data.hideCloseIcon"
          >
            <template #content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </template>
          </KPop>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="positionFixed">
        <KComponent
          v-slot="{ data }"
          :data="{ positionFixed: true }"
        >
          <KInputSwitch
            v-model="data.positionFixed"
            label="Position fixed"
          />

          <KPop
            :key="data.positionFixed ? 'fixed' : 'absolute'"
            button-text="Button"
            :position-fixed="data.positionFixed"
          >
            <template #content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </template>
          </KPop>
        </KComponent>
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

      <!-- Events -->
      <SandboxTitleComponent
        is-subtitle
        title="Events"
      />
      <SandboxSectionComponent title="open & close">
        <KPop
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
                size="small"
                @click="onEvent('Popover content clicked')"
              >
                Click here
              </KButton>
            </template>
          </KPop>
        </KComponent>
      </SandboxSectionComponent>

      <!-- Exposed Methods -->
      <SandboxTitleComponent
        is-subtitle
        title="Exposed Methods"
      />
      <SandboxSectionComponent title="hidePopover">
        <p>
          <span v-if="!hidingPopover">Hide popover: <code>false</code></span>
          <span v-else>Hiding popover in: {{ timeoutValue }}</span>
        </p>
        <KPop ref="kPop">
          <KButton @click="startPopoverTimeout">
            Button
          </KButton>

          <template #content>
            Popover content.
          </template>
        </KPop>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { PopPlacementsArray } from '@/types'
import { KPop } from '@/components'

const kPop = ref<InstanceType<typeof KPop> | null>(null)
const hidingPopover = ref<boolean>(false)
const interval = ref<any>(null)
const timeoutValue = ref<number>(3)

const startPopoverTimeout = () => {
  hidingPopover.value = true

  setTimeout(() => {
    kPop.value?.hidePopover()
    clearInterval(interval.value)
    hidingPopover.value = false
    timeoutValue.value = 3
    interval.value = null
  }, 3000)

  interval.value = setInterval(() => {
    timeoutValue.value -= 1
  }, 1000)
}

const onEvent = (message: string): void => {
  console.log(message)
}
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-wrap: wrap;
  gap: $kui-space-50;
}
</style>
