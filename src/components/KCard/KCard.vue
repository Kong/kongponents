<template>
  <section
    :aria-describedby="contentId || undefined"
    :aria-label="title ? title : undefined"
    :aria-labelledby="!title && slots.title ? titleId : undefined"
    class="kong-card"
    :class="[borderVariant, {'hover': hasHover, 'kcard-shadow': hasShadow }]"
  >
    <div
      v-if="showCardHead"
      class="k-card-header"
      :class="{ 'has-status': status || slots.statusHat }"
    >
      <div
        v-if="status || slots.statusHat"
        class="k-card-status-hat"
      >
        <!-- @slot Use this slot to pass status text above title -->
        <slot name="statusHat">
          {{ status }}
        </slot>
      </div>

      <div
        v-if="showCardTitleWithoutStatus"
        :id="title ? undefined : titleId"
        class="k-card-title"
      >
        <h4>
          <!-- @slot Use this slot to pass title content -->
          <slot name="title">
            {{ title }}
          </slot>
        </h4>
      </div>

      <div class="k-card-actions">
        <!-- @slot Use this slot to pass actions to right side of header -->
        <slot name="actions" />
      </div>
    </div>

    <div
      v-if="showCardTitleWithStatus"
      :id="title ? undefined : titleId"
      class="k-card-title"
    >
      <h4>
        <!-- @slot Use this slot to pass title content -->
        <slot name="title">
          {{ title }}
        </slot>
      </h4>
    </div>

    <div class="k-card-content">
      <div
        :id="contentId"
        class="k-card-body"
      >
        <!-- @slot Use this slot to pass in body content -->
        <slot name="body">
          {{ body }}
        </slot>
      </div>

      <div
        v-if="slots.notifications"
        class="k-card-notifications"
      >
        <slot name="notifications" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { v1 as uuidv1 } from 'uuid'
import type { BorderVariant } from '@/types'
import { BorderVariantsArray } from '@/types'
import type { PropType } from 'vue'
import { computed, useSlots } from 'vue'

const props = defineProps({
  /**
   * Title string if slot not used, also used for aria-label
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Pass body string in if slot not used
   */
  body: {
    type: String,
    default: '',
  },
  /**
   * Set top border or no border. If neither set default will have border<br>
   * * Options: [borderTop, noBorder]
   */
  borderVariant: {
    type: String as PropType<BorderVariant>,
    default: 'border',
    validator: (value: BorderVariant): boolean => BorderVariantsArray.includes(value),
  },
  /**
   * Sets if card has hover state<br>
   */
  hasHover: {
    type: Boolean,
    default: false,
  },
  hasShadow: {
    type: Boolean,
    default: false,
  },
  /**
   * Add small status text above the card title
   */
  status: {
    type: String,
    default: '',
  },
  /**
   * Test mode - for testing only, strips out generated ids
   */
  testMode: {
    type: Boolean,
    default: false,
  },
})

const titleId = computed((): string => props.testMode ? 'test-title-id-1234' : uuidv1())

const contentId = computed((): string => props.testMode ? 'test-content-id-1234' : uuidv1())

const slots = useSlots()

const useStatusHatLayout = computed((): boolean => !!(props.status || !!slots.statusHat))

const showCardHead = computed((): boolean => !!slots.actions || useStatusHatLayout.value ||
  (!useStatusHatLayout.value && (!!props.title || !!slots.title)))

const showCardTitleWithoutStatus = computed((): boolean => !useStatusHatLayout.value &&
  (!!props.title || !!slots.title))

const showCardTitleWithStatus = computed((): boolean => useStatusHatLayout.value &&
  (!!props.title || !!slots.title))
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';


.kong-card {
  background-color: var(--KCardBackground, var(--white, var(--kui-color-background, $kui-color-background)));
  border-radius: var(--KCardBorderRadius, var(--kui-border-radius-20, $kui-border-radius-20));
  padding: var(--KCardPaddingY, var(--spacing-lg, var(--kui-space-80, $kui-space-80))) var(--KCardPaddingX, var(--spacing-lg, var(--kui-space-80, $kui-space-80)));
  transition: box-shadow $tmp-animation-timing-2 ease-in-out;

  &.noBorder {
    border: none;
  }

  &.border {
    border: var(--KCardBorder, var(--kui-border-width-10, $kui-border-width-10) solid var(--black-10, $tmp-color-black-10));
    box-shadow: none;
  }

  &.borderTop {
    border-top: var(--KCardBorder, var(--kui-border-width-10, $kui-border-width-10) solid var(--black-10, $tmp-color-black-10));
  }

  &.hover:hover, &.kcard-shadow {
    box-shadow: var(--KCardShadow, 0 4px 8px var(--black-10, $tmp-color-black-10));
  }

  .k-card-header {
    align-items: center;
    display: flex !important;
    margin-bottom: var(--kui-space-50, $kui-space-50) !important;

    &.has-status {
      align-items: flex-start;
    }
  }

  .k-card-status-hat {
    align-items: center;
    color: var(--grey-600, var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger));
    display: flex;
    font-size: var(--type-xs, var(--kui-font-size-20, $kui-font-size-20));
  }

  .k-card-title {
    margin-bottom: var(--kui-space-50, $kui-space-50) !important;

    h4 {
      color: var(--KCardTitleColor, var(--kui-color-text, $kui-color-text));
      font-size: var(--KCardTitleFontSize, var(--kui-font-size-60, $kui-font-size-60));
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      margin: var(--kui-space-0, $kui-space-0);
      padding: var(--kui-space-0, $kui-space-0);
    }
  }

  .k-card-actions  {
    margin-left: var(--kui-space-auto, $kui-space-auto);
  }

  .k-card-body {
    color: var(--grey-600, var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger));
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    width: 100%;
  }

  .k-card-content {
    display: flex !important;

    .k-table td, table td, :deep(.k-table) td {
      font-size: var(--type-md, var(--kui-font-size-40, $kui-font-size-40));
      line-height: var(--kui-line-height-40, $kui-line-height-40);
    }
  }

  .k-card-notifications {
    margin-left: var(--kui-space-50, $kui-space-50) !important;
    margin-top: var(--kui-space-auto, $kui-space-auto);
  }
}
</style>

<style lang="scss">



.kong-card {
  .k-card-header {
    .k-button {
      min-height: 38px;
    }
  }
}
</style>
