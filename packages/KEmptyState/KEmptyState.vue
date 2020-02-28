<template>
  <div class="empty-state-wrapper">
    <div class="empty-state-title">
      <div
        v-if="isError"
        class="warning-icon card-icon mb-4"
      >
        <KIcon
          :size="iconSize"
          icon="warning2"
          view-box="0 0 50 50" />
      </div>
      <h5>
        <slot name="title"/>
      </h5>
    </div>
    <div class="empty-state-content">
      <p>
        <slot name="message"/>
      </p>
      <p>
        <slot name="cta">
          <KButton
            v-if="!ctaIsHidden"
            :is-rounded="true"
            appearance="outline-primary"
            @click.native="() => handleClick && handleClick()">
            {{ ctaText }}
          </KButton>
        </slot>
      </p>
    </div>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'
export default {
  name: 'KEmptyState',
  components: { KButton, KIcon },
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: '50'
    },
    ctaIsHidden: {
      type: Boolean,
      default: false
    },
    ctaText: {
      type: String,
      default: ''
    },
    handleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
  .empty-state-wrapper {
  padding: 4rem 0;
  text-align: center;
  color: rgba(0,0,0,.70);
  border: 1px solid rgba(151,151,151,.1);
  border-radius: 3px;
  background-color: rgba(0,0,0,.03);
}
.empty-state-wrapper h5 {
  margin: 0 0 .75rem;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
}
.empty-state-wrapper p {
  margin: 0 auto 1.5rem;
  font-size: 1rem;
  line-height: 1.375rem;
  font-weight: 400;
  max-width: 50%;
}
.empty-state-wrapper p:last-child {
  margin: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
