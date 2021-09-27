<template>
  <div class="empty-state-wrapper">
    <div class="empty-state-title">
      <div
        v-if="isError || icon"
        :class="{ 'warning-icon': isError }"
        class="empty-state-icon card-icon mb-4"
      >
        <KIcon
          :size="iconSize"
          :icon="icon ? icon : 'warning'" />
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
            appearance="outline"
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
    icon: {
      type: String,
      default: ''
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
  padding: 42px 0;
  text-align: center;
  border-radius: 3px;
  background-color: var(--KEmptyBackground);
}
.empty-state-wrapper h5 {
  color: var(--KEmptyTitleColor, var(--black-500));
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
}
.empty-state-wrapper p {
  color: var(--KEmptyContentColor, var(--black-400));
  margin: 0 auto 14px;
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
