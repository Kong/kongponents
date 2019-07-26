<template>
  <div
    :class="[borderVariant, {'hover': hasHover }]"
    class="k-card">
    <div class="k-card-header">
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
     * Pass title sting in if slot not used
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Pass body sting in if slot not used
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
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

.k-card {
  padding: var(--spacing-md, spacing(md));
  margin-bottom: var(--spacing-md, spacing(md));
  border-radius: 3px;

  .k-card-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-md, spacing(md));;
  }

  .k-card-title h4 {
    margin: 0;
    font-size: type(lg);
    font-weight: 500;
    color: var(--KCardTitle, color(tblack-85));
  }

  .k-card-actions  {
    margin-left: auto;
  }

  // Variants
  &.noBoard {
    border: none;
  }
  &.border {
    border: 1px solid var(--KCardBorder, color(tblack-10));
    box-shadow: none;
  }
  &.borderTop {
    border-top: 1px solid var(--KCardBorder, color(tblack-10));
  }

  &.hover:hover {
    box-shadow: 0 4px 8px color(tblack-10);
  }
}
</style>
