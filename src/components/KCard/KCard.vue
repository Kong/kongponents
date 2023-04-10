<script lang="ts" setup>
import { v1 as uuidv1 } from 'uuid'
import type { BorderVariant } from '@/types'
import { computed, useSlots } from 'vue'

interface IProps {
  /**
   * Title string if slot not used, also used for aria-label
   */
  title?: string;
  /**
     * Pass body string in if slot not used
     */
  body?: string;
  /**
     * Set top border or no border. If neither set default will have border<br>
     * * Options: [borderTop, noBorder]
     */
  borderVariant?: BorderVariant;
  /**
   * Sets if card has hover state<br>
   */
  hasHover?: boolean;
  hasShadow?: boolean;
  /**
   * Add small status text above the card title
   */
  status?: string;
  /**
   * Test mode - for testing only, strips out generated ids
   */
  testMode?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  body: '',
  borderVariant: 'border',
  hasHover: false,
  hasShadow: false,
  status: '',
  testMode: false,
})

const titleId = computed((): string => props.testMode ? 'test-title-id-1234' : uuidv1())

const contentId = computed((): string => props.testMode ? 'test-content-id-1234' : uuidv1())

const slots = useSlots()

const useStatusHatLayout = computed((): boolean => !!(props.status || !!slots.statusHat))

const showCardHeard = computed((): boolean => !!slots.actions || useStatusHatLayout.value ||
  (!useStatusHatLayout.value && (!!props.title || !!slots.title)))

const showCardTitleWithoutStatus = computed((): boolean => !useStatusHatLayout.value &&
  (!!props.title || !!slots.title))

const showCardTitleWithStatus = computed((): boolean => useStatusHatLayout.value &&
  (!!props.title || !!slots.title))
</script>

<template>
  <section
    :aria-describedby="contentId || undefined"
    :aria-label="title ? title : undefined"
    :aria-labelledby="!title && ($slots.title || slots.title) ? titleId : undefined"
    class="kong-card"
    :class="[borderVariant, {'hover': hasHover, 'kcard-shadow': hasShadow }]"
  >
    <div
      v-if="showCardHeard"
      class="k-card-header d-flex mb-3"
      :class="{ 'has-status': status || $slots.statusHat }"
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
