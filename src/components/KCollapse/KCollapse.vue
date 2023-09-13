<template>
  <div class="k-collapse">
    <div
      class="k-collapse-heading"
      :class="{ 'has-trailing-trigger': trailingTrigger }"
    >
      <div
        v-if="title"
        class="k-collapse-title"
        :class="{ 'has-trailing-trigger': trailingTrigger }"
        data-testid="k-collapse-title"
      >
        {{ title }}
      </div>
      <div
        class="k-collapse-trigger"
        :class="{ 'has-trailing-trigger': trailingTrigger }"
      >
        <slot
          :is-collapsed="collapsedState"
          name="trigger"
          :toggle="toggleDisplay"
        >
          <a
            class="k-collapse-trigger-content"
            data-testid="k-collapse-trigger-content"
            href="#"
            role="button"
            @click.prevent.stop="toggleDisplay()"
          >
            <slot name="trigger-content">
              <span
                v-if="triggerLabel"
                class="k-collapse-trigger-label"
                data-testid="k-collapse-trigger-label"
              >
                <KIcon
                  class="k-collapse-trigger-chevron"
                  :icon="collapseIcon"
                  :size="KUI_ICON_SIZE_20"
                />
                <span>{{ triggerLabel }}</span>
              </span>
              <KIcon
                v-else
                class="k-collapse-trigger-icon k-collapse-trigger-chevron"
                data-testid="k-collapse-trigger-icon"
                :icon="collapseIcon"
              />
            </slot>
          </a>
        </slot>
      </div>
    </div>
    <div
      v-if="hasVisibleContent"
      class="k-collapse-visible-content"
      data-testid="k-collapse-visible-content"
    >
      <slot name="visible-content" />
    </div>
    <div
      v-show="!collapsedState"
      class="k-collapse-hidden-content"
      data-testid="k-collapse-hidden-content"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import KIcon from '@/components/KIcon/KIcon.vue'
import type { PropType } from 'vue'
import { computed, ref, useSlots, watch } from 'vue'
import type { TriggerAlignment } from '@/types'
import { TriggerAlignmentArray } from '@/types'
import { KUI_ICON_SIZE_20 } from '@kong/design-tokens'

const props = defineProps({
  // Is the KCollapse collapsed? Defaults to true-->
  modelValue: {
    type: Boolean,
    required: false,
    default: true,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  triggerLabel: {
    type: String,
    required: false,
    default: '',
  },
  triggerAlignment: {
    type: String as PropType<TriggerAlignment>,
    required: false,
    default: 'trailing',
    validator: (value: TriggerAlignment): boolean => TriggerAlignmentArray.includes(value),
  },
})

const emit = defineEmits<{
  (e: 'toggled', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>()

const isCollapsed = ref<boolean>(true)
const modelValueChanged = ref<boolean>(false)

const slots = useSlots()

const trailingTrigger = computed((): boolean => props.triggerAlignment === 'trailing')
const hasVisibleContent = computed((): boolean => !!slots['visible-content'])

// we need this so we can create a watcher for programmatic changes to the modelValue
const modelComputed = computed({
  get(): boolean {
    return props.modelValue
  },
  set(newValue: boolean): void {
    toggleDisplay(newValue)
  },
})

// Use the modelValue only if the value hasn't been changed
const collapsedState = computed((): boolean => modelValueChanged.value ? isCollapsed.value : props.modelValue)

const collapseIcon = computed((): string => collapsedState.value ? 'chevronRight' : 'chevronDown')

const toggleDisplay = (isToggled?: boolean): void => {
  if (!modelValueChanged.value) {
    // make sure we match modelValue first time in
    isCollapsed.value = props.modelValue
  }

  isCollapsed.value = isToggled !== undefined ? isToggled : !isCollapsed.value

  modelValueChanged.value = true

  emit('toggled', isCollapsed.value)
  emit('update:modelValue', isCollapsed.value)
}

// watch for programmatic changes to v-model
watch(modelComputed, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    toggleDisplay(newVal)
  }
})
</script>

<style lang="scss" scoped>

.k-collapse {
  width: 100% !important;
  .k-collapse-heading {
    display: block !important;
    margin-bottom: var(--kui-space-50, $kui-space-50) !important;

    &.has-trailing-trigger {
      display: flex !important;
    }
  }
  .k-collapse-title {
    font-size: var(--kui-font-size-50, $kui-font-size-50);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    margin-bottom: var(--kui-space-40, $kui-space-40) !important;

    &.has-trailing-trigger {
      margin-right: var(--kui-space-auto, $kui-space-auto) !important;
    }
  }

  .k-collapse-trigger {
    cursor: pointer;

    &.has-trailing-trigger {
      margin-left: var(--kui-space-auto, $kui-space-auto);
    }

    .k-collapse-trigger-content {
      color: var(--kui-color-text-primary, $kui-color-text-primary);
      display: inline-block !important;
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    }
  }
}
</style>

<style lang="scss">

.k-collapse {
  .k-collapse-trigger {
    .k-collapse-trigger-content {
      .k-collapse-trigger-chevron {
        margin-right: var(--kui-space-20, $kui-space-20) !important;
        &.kong-icon {
          &.kong-icon-chevronDown svg path,
          &.kong-icon-chevronRight svg path {
            stroke: var(--kui-color-text-primary, $kui-color-text-primary);
          }
        }
      }

      .k-collapse-trigger-icon.kong-icon {
        padding-right: var(--kui-space-0, $kui-space-0);
      }

      .k-collapse-trigger-label {
        .kong-icon {
          position: relative;
          top: 2px;
        }
      }
    }
  }

  .k-collapse-visible-content {
    margin-bottom: var(--kui-space-60, $kui-space-60) !important;
    width: 100% !important;
  }

  .k-collapse-hidden-content {
    width: 100% !important;
  }
}
</style>
