<template>
  <div class="k-collapse">
    <div
      class="collapse-heading"
      :class="{ 'has-trailing-trigger': trailingTrigger }"
    >
      <component
        :is="titleTag"
        v-if="title || $slots.title"
        class="collapse-title"
        data-testid="collapse-title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </component>
      <div class="collapse-trigger">
        <slot
          :is-collapsed="collapsedState"
          name="trigger"
          :toggle="toggleDisplay"
        >
          <button
            :aria-controls="contentId"
            :aria-expanded="!collapsedState"
            :aria-label="triggerLabel ? undefined : 'Toggle content'"
            class="collapse-trigger-content"
            data-testid="collapse-trigger-content"
            type="button"
            @click.prevent.stop="toggleDisplay()"
          >
            <slot name="trigger-content">
              <ChevronRightIcon
                class="collapse-trigger-icon"
                :class="{ 'collapse-expanded': !collapsedState }"
                data-testid="collapse-trigger-icon"
                decorative
                :size="KUI_ICON_SIZE_40"
              />
              <span
                v-if="triggerLabel"
                class="collapse-trigger-label"
                data-testid="collapse-trigger-label"
              >
                {{ triggerLabel }}
              </span>
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
    <Transition name="kongponents-fade-transition">
      <div
        v-show="!collapsedState"
        :id="contentId"
        class="collapse-hidden-content"
        data-testid="collapse-hidden-content"
      >
        <slot name="default" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useId, watch } from 'vue'
import type { CollapseEmits, CollapseProps, CollapseSlots } from '@/types'
import { ChevronRightIcon } from '@kong/icons'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

const {
  modelValue = true,
  title = '',
  titleTag = 'div',
  triggerLabel = '',
  triggerAlignment = 'trailing',
} = defineProps<CollapseProps>()

const emit = defineEmits<CollapseEmits>()
const slots = defineSlots<CollapseSlots>()

const contentId = useId()

const isCollapsed = ref<boolean>(true)
const modelValueChanged = ref<boolean>(false)


const trailingTrigger = computed((): boolean => triggerAlignment === 'trailing')
const hasVisibleContent = computed((): boolean => !!slots['visible-content'])

// we need this so we can create a watcher for programmatic changes to the modelValue
const modelComputed = computed({
  get(): boolean {
    return modelValue
  },
  set(newValue: boolean): void {
    toggleDisplay(newValue)
  },
})

// Use the modelValue only if the value hasn't been changed
const collapsedState = computed((): boolean => modelValueChanged.value ? isCollapsed.value : modelValue)

const toggleDisplay = (isToggled?: boolean): void => {
  if (!modelValueChanged.value) {
    // make sure we match modelValue first time in
    isCollapsed.value = modelValue
  }

  isCollapsed.value = isToggled !== undefined ? isToggled : !isCollapsed.value

  modelValueChanged.value = true

  emit('toggle', isCollapsed.value)
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
  box-sizing: border-box;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  width: 100%;

  .collapse-heading {
    display: block;
    margin-bottom: var(--kui-space-50, $kui-space-50);

    .collapse-title {
      align-items: center;
      color: var(--kui-color-text, $kui-color-text);
      display: flex;
      font-size: var(--kui-font-size-40, $kui-font-size-40);
      font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
      gap: var(--kui-space-50, $kui-space-50);
      letter-spacing: var(--kui-letter-spacing-minus-30, $kui-letter-spacing-minus-30);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      margin: var(--kui-space-0, $kui-space-0);
      margin-bottom: var(--kui-space-40, $kui-space-40);
    }

    .collapse-trigger {
      cursor: pointer;

      .collapse-trigger-content {
        @include defaultButtonReset;

        align-items: center;
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--kui-color-text-primary, $kui-color-text-primary);
        display: flex;
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        gap: var(--kui-space-20, $kui-space-20);
        line-height: var(--kui-line-height-30, $kui-line-height-30);
        outline: none;
        padding: var(--kui-space-10, $kui-space-10);

        &:hover:not(:focus):not(:active) {
          color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
        }

        &:active {
          color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
        }

        .collapse-trigger-icon {
          transition: transform $kongponentsTransitionDurTimingFunc;

          &.collapse-expanded {
            transform: rotate(90deg);
          }
        }
      }
    }

    &.has-trailing-trigger {
      align-items: center;
      display: flex;
      justify-content: space-between;

      .collapse-title {
        margin-bottom: var(--kui-space-0, $kui-space-0);
      }
    }
  }

  .collapse-visible-content,
  .collapse-hidden-content {
    @include bodyText;

    width: 100%;
  }

  .collapse-hidden-content {
    margin-top: var(--kui-space-40, $kui-space-40);
  }
}
</style>
