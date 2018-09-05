<template>
  <div
    :class="[borderVariant, {'hover': hasHover }]"
    class="kong-card">
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
      * Set top border or no border. If neither set defaut will have border<br>
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

<style scoped>
.kong-card {
  padding: 1rem;
  margin-bottom: 1rem;
}

.kong-card.noBoard {
  border: none;
}

.kong-card.border {
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,.12);
  box-shadow: none;
}

.kong-card.borderTop {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.kong-card.hover:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,.12);
}

.kong-card .k-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.kong-card .k-card-title h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: rgba(0,0,0,.85);
}

.kong-card .k-card-actions  {
  margin-left: auto;
}
</style>
