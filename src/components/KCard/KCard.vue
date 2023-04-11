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
      class="k-card-header d-flex mb-3"
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
        class="k-card-title mb-3"
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
      class="k-card-title mb-3"
    >
      <h4>
        <!-- @slot Use this slot to pass title content -->
        <slot name="title">
          {{ title }}
        </slot>
      </h4>
    </div>

    <div class="k-card-content d-flex">
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
        class="k-card-notifications ml-3"
      >
        <slot name="notifications" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { v1 as uuidv1 } from 'uuid'
import { BorderVariant, BorderVariantsArray } from '@/types'
import { computed, PropType, useSlots } from 'vue'

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
    validator: (value: BorderVariant): boolean => Object.values(BorderVariantsArray).includes(value),
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
@import '@/styles/variables';
@import '@/styles/functions';

.kong-card {
  background-color: var(--KCardBackground, var(--white, color(white)));
  border-radius: var(--KCardBorderRadius, 3px);
  padding: var(--KCardPaddingY, var(--spacing-lg)) var(--KCardPaddingX, var(--spacing-lg));
  transition: box-shadow 0.2s ease-in-out;

  &.noBorder {
    border: none;
  }

  &.border {
    border: var(--KCardBorder, 1px solid var(--black-10, color(black-10)));
    box-shadow: none;
  }

  &.borderTop {
    border-top: var(--KCardBorder, 1px solid var(--black-10, color(black-10)));
  }

  &.hover:hover, &.kcard-shadow {
    box-shadow: var(--KCardShadow, 0 4px 8px var(--black-10, color(black-10)));
  }

  .k-card-header {
    align-items: center;

    &.has-status {
      align-items: flex-start;
    }
  }

  .k-card-status-hat {
    align-items: center;
    color: var(--grey-600);
    display: flex;
    font-size: var(--type-xs);
  }

  .k-card-title h4 {
    color: var(--KCardTitleColor, var(--black-500));
    font-size: var(--KCardTitleFontSize, 20px);
    font-weight: 600;
    margin: 0;
    padding: 0;
  }

  .k-card-actions  {
    margin-left: auto;
  }

  .k-card-body {
    color: var(--grey-600);
    font-size: 13px;
    line-height: 20px;
    width: 100%;
  }

  .k-card-content .k-table td,
  .k-card-content table td,
  .k-card-content :deep(.k-table) td {
    font-size: var(--type-md);
  }

  .k-card-notifications {
    margin-left: auto;
    margin-top: auto;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.kong-card {
  .k-card-header {
    .k-button {
      min-height: 38px;
    }
  }
}
</style>
