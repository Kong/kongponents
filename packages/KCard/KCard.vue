<template>
  <div
    :class="[borderVariant, {'hover': hasHover, 'kcard-shadow': hasShadow }]"
    class="kong-card">
    <div
      v-if="title || $scopedSlots.title || $scopedSlots.actions || $slots.title"
      :class="(helpText || $scopedSlots.helpText !== undefined) && 'mb-0' || 'mb-4'"
      class="k-card-header">
      <div class="k-card-title">
        <h4>
          <!-- @slot Use this slot to pass title content -->
          <slot name="title">{{ title }}</slot>
        </h4>
      </div>
      <div class="k-card-actions">
        <!-- @slot Use this slot to pass actions to right side of header -->
        <slot name="actions"/>
      </div>
    </div>
    <div
      v-if="helpText || $scopedSlots.helpText"
      class="k-card-help-text mb-5">
      <!-- @slot Use this slot to pass help text under the title -->
      <slot name="helpText">
        <span>{{ helpText }}</span>
      </slot>
    </div>
    <div class="k-card-body">
      <!-- @slot Use this slot to pass in body content -->
      <slot name="body">{{ body }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KCard',

  props: {
    /**
     * Pass title string in if slot not used
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Pass body string in if slot not used
     */
    body: {
      type: String,
      default: ''
    },
    /**
      * Set top border or no border. If neither set default will have border<br>
      * Options: [borderTop, noBorder]
      */
    borderVariant: {
      type: String,
      default: 'border'
    },
    /**
      * Sets if card has hover state<br>
      */
    hasHover: {
      type: Boolean,
      default: false
    },

    hasShadow: {
      type: Boolean,
      default: false
    },

    /**
      * Adds help text positioned closely under the card title
      */
    helpText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';

.kong-card {
  padding: var(--KCardPaddingY, 1rem) var(--KCardPaddingX, 1rem);
  border-radius: var(--KCardBorderRadius, 3px);
  background-color: var(--KCardBackground, var(--white, color(white)));

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
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    min-height: 38px;

    .k-button {
      min-height: 38px;
    }
  }

  .k-card-title h4 {
    margin: 0;
    font-size: var(--KCardTitleFontSize, var(--type-lg, type(lg)));
    font-weight: 500;
    color: var(--KCardTitleColor, var(--black-85, color(black-85)));
  }

  .k-card-actions  {
    margin-left: auto;
  }

  .k-card-help-text {
    color: var(--black-45);
  }
}
</style>
