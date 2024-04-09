<template>
  <div class="k-collapse">
    <div
      class="collapse-heading"
      :class="{ 'has-trailing-trigger': trailingTrigger }"
    >
      <div
        v-if="title"
        class="collapse-title"
        :class="{ 'has-trailing-trigger': trailingTrigger }"
        data-testid="collapse-title"
      >
        {{ title }}
      </div>
      <div
        class="collapse-trigger"
        :class="{ 'has-trailing-trigger': trailingTrigger }"
      >
        <slot
          :is-collapsed="collapsedState"
          name="trigger"
          :toggle="toggleDisplay"
        >
          <button
            class="collapse-trigger-content"
            :class="{ 'collapse-expanded': !isCollapsed }"
            data-testid="collapse-trigger-content"
            role="button"
            @click.prevent.stop="toggleDisplay()"
          >
            <slot name="trigger-content">
              <span
                v-if="triggerLabel"
                class="collapse-trigger-label"
                data-testid="collapse-trigger-label"
              >
                <ChevronDownIcon class="collapse-trigger-chevron" />
                <span>{{ triggerLabel }}</span>
              </span>
              <ChevronDownIcon
                v-else
                class="collapse-trigger-icon collapse-trigger-chevron"
                data-testid="collapse-trigger-icon"
              />
            </slot>
          </button>
        </slot>
      </div>
    </div>
    <div
      v-if="hasVisibleContent"
      class="collapse-visible-content"
      data-testid="collapse-visible-content"
    >
      <slot name="visible-content" />
    </div>
    <div
      v-show="!collapsedState"
      class="collapse-hidden-content"
      data-testid="collapse-hidden-content"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, useSlots, watch } from 'vue'
import type { TriggerAlignment } from '@/types'
import { TriggerAlignmentArray } from '@/types'
import { ChevronDownIcon } from '@kong/icons'

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
// TODO: remove this mixin once https://github.com/Kong/kongponents/pull/2119 is merged

@mixin buttonReset {
  background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
  border: none;
  color: inherit;
  cursor: pointer;
  padding: var(--kui-space-0, $kui-space-0);
}

.k-collapse {
  width: 100%;

  .collapse-heading {
    display: block;
    margin-bottom: var(--kui-space-50, $kui-space-50);

    &.has-trailing-trigger {
      display: flex;
    }
  }
  .collapse-title {
    font-size: var(--kui-font-size-50, $kui-font-size-50);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    margin-bottom: var(--kui-space-40, $kui-space-40);

    &.has-trailing-trigger {
      margin-right: var(--kui-space-auto, $kui-space-auto);
    }
  }

  .collapse-trigger {
    cursor: pointer;

    &.has-trailing-trigger {
      margin-left: var(--kui-space-auto, $kui-space-auto);
    }

    .collapse-trigger-content {
      @include buttonReset;

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
  .collapse-trigger {
    .collapse-trigger-content {
      .collapse-trigger-chevron {
        margin-right: var(--kui-space-20, $kui-space-20);
        &.kong-icon {
          &.kong-icon-chevronDown svg path,
          &.kong-icon-chevronRight svg path {
            stroke: var(--kui-color-text-primary, $kui-color-text-primary);
          }
        }
      }

      .collapse-trigger-icon.kong-icon {
        padding-right: var(--kui-space-0, $kui-space-0);
      }

      .collapse-trigger-label {
        .kong-icon {
          position: relative;
          top: 2px;
        }
      }
    }
  }

  .collapse-visible-content {
    margin-bottom: var(--kui-space-60, $kui-space-60);
    width: 100%;
  }

  .collapse-hidden-content {
    width: 100%;
  }
}
</style>
