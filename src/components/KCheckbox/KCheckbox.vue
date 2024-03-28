<template>
  <div
    class="k-checkbox"
    :class="[$attrs.class, kCheckboxClasses ]"
  >
    <div class="checkbox-input-wrapper">
      <input
        :id="inputId"
        v-bind="modifiedAttrs"
        class="checkbox-input"
        type="checkbox"
        @change="handleChange"
      >
      <CheckSmallIcon
        v-if="modelValue"
        class="checkbox-icon"
        data-testid="check-icon"
        :size="KUI_ICON_SIZE_40"
        tabindex="-1"
      />
      <IndeterminateSmallIcon
        v-if="isIndeterminate && !modelValue"
        class="checkbox-icon"
        data-testid="indeterminate-icon"
        :size="KUI_ICON_SIZE_40"
        tabindex="-1"
      />
    </div>

    <div class="checkbox-label-wrapper">
      <KLabel
        v-if="hasLabel"
        v-bind="labelAttributes"
        class="checkbox-label"
        :for="inputId"
      >
        <slot>{{ label }}</slot>

        <template
          v-if="hasTooltip"
          #tooltip
        >
          <slot name="tooltip" />
        </template>
      </KLabel>
      <div
        v-if="showDescription"
        class="checkbox-description"
      >
        <slot name="description">
          <p>{{ description }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, useAttrs, useSlots } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { LabelAttributes } from '@/types'
import KLabel from '@/components/KLabel/KLabel.vue'
import { CheckSmallIcon, IndeterminateSmallIcon } from '@kong/icons'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  labelAttributes: {
    type: Object as PropType<LabelAttributes>,
    default: () => ({}),
    validator: (value: LabelAttributes): boolean => {
      if (value.help) {
        console.warn('KCheckbox: `help` property of `labelAttributes` prop is deprecated. Please use `info` prop instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#klabel')
      }

      return true
    },
  },
  description: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'change', value: boolean): void;
  (e: 'input', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>()

const slots = useSlots()
const attrs = useAttrs()

const inputId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
const hasLabel = computed((): boolean => !!(props.label || slots.default))
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')

const showDescription = computed((): boolean => hasLabel.value && (!!props.description || !!slots.description))
const hasTooltip = computed((): boolean => !!slots.tooltip)

const modifiedAttrs = computed(() => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  $attrs.checked = props.modelValue

  /**
   * Indeterminate state logic
   *
   * Checkbox can't have both `checked` and `indeterminate` attributes at the same time.
   * If modelValue is `true` then it's checked (`indeterminate` attribute omitted regardless of value).
   * If `indeterminate` attribute is passed (and is truthy) and modelValue is `false` then it's indeterminate (`checked` attribute omitted).
   */
  if ($attrs.indeterminate !== undefined && String($attrs.indeterminate) !== 'false' && !props.modelValue) {
    delete $attrs.checked
    $attrs.indeterminate = true
  } else {
    delete $attrs.indeterminate
  }

  return $attrs
})

const kCheckboxClasses = computed((): Record<string, boolean> => {
  return {
    disabled: isDisabled.value,
    'has-description': showDescription.value,
    'input-error': props.error,
  }
})

const isIndeterminate = computed((): boolean => {
  return modifiedAttrs.value.indeterminate !== undefined && String(modifiedAttrs.value.indeterminate) !== 'false'
})

const handleChange = (event: Event): void => {
  emit('change', (event.target as HTMLInputElement).checked)
  emit('input', (event.target as HTMLInputElement).checked)
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
/* Component mixins */

@mixin kCheckboxIcon {
  color: var(--kui-color-text-inverse, $kui-color-text-inverse) !important;
  inset: 0;
  left: calc(50% - 2.4px); // 2px is not enough, 3px is too much...
  pointer-events: none;
  position: absolute;
  top: calc(50% + 1.75px); // 1px is not enough, 2px is too much...
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* Component styles */

.k-checkbox {
  align-items: flex-start;
  display: inline-flex;

  .checkbox-input-wrapper {
    display: flex;
    margin-top: 3px; // align with label
    position: relative;
  }

  /* Checkbox styles */
  .checkbox-input {
    @include radioCheckboxDefaults;

    // Since the mixin is used in both KRadio and KCheckbox it doesn't have rules for some component-specific properties so we need to set them here
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);

    &:hover {
      @include radioCheckboxHover;
    }

    &:focus-visible {
      @include radioCheckboxFocus;
    }

    &:active:not(:disabled) {
      @include radioCheckboxActive;
    }

    &:checked, &:indeterminate {
      @include radioCheckboxChecked;

      &:focus-visible {
        @include radioCheckboxCheckedFocus;
      }

      &:active {
        @include radioCheckboxCheckedActive;
      }

      &:disabled {
        @include radioCheckboxCheckedDisabled;
      }
    }

    &:disabled {
      @include radioCheckboxDisabled;
    }
  }

  &.input-error {
    .checkbox-input {
      &:not(:disabled) {
        @include radioCheckboxError;

        &:hover {
          @include radioCheckboxErrorHover;
        }

        &:focus-visible {
          @include radioCheckboxErrorFocus;
        }

        &:checked, &:indeterminate {
          @include radioCheckboxErrorChecked;

          &:focus-visible {
            @include radioCheckboxErrorCheckedFocus;
          }
        }
      }
    }
  }

  /* Check and indeterminate icon styles */
  .checkbox-input:checked + .checkbox-icon,
  .checkbox-input:indeterminate + .checkbox-icon {
    @include kCheckboxIcon;
  }

  &.disabled {
    .checkbox-input:checked + .checkbox-icon,
    .checkbox-input:indeterminate + .checkbox-icon {
      // override kCheckboxIcon mixin
      color: var(--kui-color-text-neutral, $kui-color-text-neutral) !important;
    }
  }

  /* Label & description styles */
  .checkbox-label-wrapper {
    flex: 1;

    .checkbox-label {
      cursor: pointer;
      margin: 0;
    }

    .checkbox-description {
      @include inputHelpText;

      margin-top: var(--kui-space-20, $kui-space-20);

      p {
        @include inputHelpText;

        margin: 0; // reset default margin from browser
      }
    }
  }

  &.disabled .checkbox-label {
    cursor: not-allowed;
  }
}
</style>
