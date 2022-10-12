<template>
  <div class="k-collapse w-100">
    <div
      :class="{
        'd-flex': triggerAlignment === 'trailing',
        'd-block': triggerAlignment === 'leading'
      }"
      class="k-collapse-heading w-100 mb-3"
    >
      <div
        v-if="title"
        :class="{
          'mr-auto': triggerAlignment === 'trailing',
          'mb-2': triggerAlignment === 'leading'
        }"
        class="k-collapse-title"
        data-testid="k-collapse-title"
      >
        {{ title }}
      </div>
      <div
        :class="{
          'ml-auto': triggerAlignment === 'trailing'
        }"
        class="k-collapse-trigger"
      >
        <slot
          name="trigger"
          :is-collapsed="getIsCollapsed()"
          :toggle="toggleDisplay"
        >
          <KButton
            class="k-collapse-trigger-content non-visual-button"
            data-testid="k-collapse-trigger-content"
            @click="toggleDisplay()"
          >
            <slot name="trigger-content">
              <span
                v-if="triggerLabel"
                class="k-collapse-trigger-label"
                data-testid="k-collapse-trigger-label"
              >
                <KIcon
                  :icon="getIsCollapsed() ? 'chevronRight' : 'chevronDown'"
                  color="var(--blue-500)"
                  size="12"
                  class="mr-1"
                />
                {{ triggerLabel }}
              </span>
              <KIcon
                v-else
                :icon="getIsCollapsed() ? 'chevronRight' : 'chevronDown'"
                color="var(--black-70)"
                class="k-collapse-trigger-icon"
                data-testid="k-collapse-trigger-icon"
              />
            </slot>
          </KButton>
        </slot>
      </div>
    </div>
    <div
      v-if="hasVisibleContent"
      class="k-collapse-visible-content w-100"
      data-testid="k-collapse-visible-content"
    >
      <slot name="visible-content" />
    </div>
    <div
      v-if="!getIsCollapsed()"
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
    modelValue: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    triggerLabel: {
      type: String,
      default: '',
    },
    triggerAlignment: {
      type: String,
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

    // we need this so we can create a watcher for programmatic changes to the modelValue
    const value = computed({
      get(): boolean {
        return props.modelValue
      },
      set(newValue: boolean): void {
        toggleDisplay(newValue)
      },
    })

    const toggleDisplay = (isToggled?: boolean) => {
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

    const getIsCollapsed = (): boolean => {
      // Use the modelValue only if the value hasn't been changed
      return modelValueChanged.value ? isCollapsed.value : props.modelValue
    }

    // watch for programmatic changes to v-model
    watch(value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        toggleDisplay(newVal)
      }
    })

    return {
      hasVisibleContent,
      toggleDisplay,
      getIsCollapsed,
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
      color: var(--blue-500);
      font-size: var(--type-xs);
      font-weight: 600 !important;
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
      &.k-button {
        padding: 8px 0;
        margin-top: -8px;

        .k-collapse-trigger-icon.kong-icon {
          padding-right: 0;
        }

        .k-collapse-trigger-label {
          .kong-icon {
            height: 12px;
            top: 2px;
            position: relative;
          }
        }
      }
    }
  }
}
</style>
