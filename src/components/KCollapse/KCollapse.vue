<template>
  <div class="k-collapse w-100">
    <div
      class="k-collapse-heading mb-3"
      :class="{
        'd-flex': trailingTrigger,
        'd-block': !trailingTrigger
      }"
    >
      <div
        v-if="title"
        class="k-collapse-title"
        :class="{
          'mr-auto': trailingTrigger,
          'mb-2': !trailingTrigger
        }"
        data-testid="k-collapse-title"
      >
        {{ title }}
      </div>
      <div
        class="k-collapse-trigger"
        :class="{
          'ml-auto': trailingTrigger
        }"
      >
        <slot
          :is-collapsed="collapsedState"
          name="trigger"
          :toggle="toggleDisplay"
        >
          <a
            class="k-collapse-trigger-content d-inline-block"
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
                  class="k-collapse-trigger-chevron mr-1"
                  :icon="collapsedState ? 'chevronRight' : 'chevronDown'"
                  size="14"
                />
                <span>{{ triggerLabel }}</span>
              </span>
              <KIcon
                v-else
                class="k-collapse-trigger-icon k-collapse-trigger-chevron"
                data-testid="k-collapse-trigger-icon"
                :icon="collapsedState ? 'chevronRight' : 'chevronDown'"
              />
            </slot>
          </a>
        </slot>
      </div>
    </div>
    <div
      v-if="hasVisibleContent"
      class="k-collapse-visible-content w-100 mb-4"
      data-testid="k-collapse-visible-content"
    >
      <slot name="visible-content" />
    </div>
    <div
      v-show="!collapsedState"
      class="k-collapse-hidden-content w-100"
      data-testid="k-collapse-hidden-content"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'KCollapse',
  components: {
    KIcon,
  },
  props: {
    // Is the KCollapse collapsed? Defaults to true
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
      type: String,
      required: false,
      default: 'trailing',
      validator: (value: string): boolean => {
        return ['leading', 'trailing'].includes(value)
      },
    },
  },
  emits: ['toggled', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const hasVisibleContent = computed((): boolean => !!slots['visible-content'])
    const isCollapsed = ref(true)
    const modelValueChanged = ref(false)

    const trailingTrigger = computed(() => props.triggerAlignment === 'trailing')

    // we need this so we can create a watcher for programmatic changes to the modelValue
    const modelComputed = computed({
      get(): boolean {
        return props.modelValue
      },
      set(newValue: boolean): void {
        toggleDisplay(newValue)
      },
    })

    const toggleDisplay = (isToggled?: boolean): void => {
      if (!modelValueChanged.value) {
        // make sure we match modelValue first time in
        isCollapsed.value = props.modelValue
      }

      if (isToggled !== undefined) {
        isCollapsed.value = isToggled
      } else {
        isCollapsed.value = !isCollapsed.value
      }

      modelValueChanged.value = true
      emit('toggled', isCollapsed.value)
      emit('update:modelValue', isCollapsed.value)
    }

    const collapsedState = computed((): boolean => {
      // Use the modelValue only if the value hasn't been changed
      return modelValueChanged.value ? isCollapsed.value : props.modelValue
    })

    // watch for programmatic changes to v-model
    watch(modelComputed, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        toggleDisplay(newVal)
      }
    })

    return {
      hasVisibleContent,
      trailingTrigger,
      toggleDisplay,
      collapsedState,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-collapse {
  .k-collapse-title {
    font-size: var(--type-lg);
    font-weight: 600;
  }

  .k-collapse-trigger {
    cursor: pointer;

    .k-collapse-trigger-content {
      font-size: var(--type-sm);
      font-weight: 600;
      color: var(--KCollapseTriggerColor, var(--blue-500));
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-collapse {
  .k-collapse-trigger {
    .k-collapse-trigger-content {
      .k-collapse-trigger-chevron.kong-icon {
        &.kong-icon-chevronDown svg path,
        &.kong-icon-chevronRight svg path {
          stroke: var(--KCollapseTriggerColor, var(--blue-500));
        }

      }

      .k-collapse-trigger-icon.kong-icon {
        padding-right: 0;
      }

      .k-collapse-trigger-label {
        .kong-icon {
          position: relative;
          top: 2px;
        }
      }
    }
  }
}
</style>
