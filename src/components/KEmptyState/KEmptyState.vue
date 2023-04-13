<template>
  <section
    class="empty-state-wrapper"
    :class="{ 'is-error': isError }"
  >
    <div class="empty-state-title">
      <div
        v-if="isError || icon"
        class="k-empty-state-icon card-icon mb-3"
        :class="{ 'warning-icon': isError }"
      >
        <KIcon
          :color="isError ? iconColor || 'var(--black-70)' : iconColor"
          :icon="icon ? icon : 'warning'"
          :secondary-color="isError ? 'var(--yellow-400)' : undefined"
          :size="iconSize"
        />
      </div>
      <div class="k-empty-state-title-header mt-4 mb-4">
        <slot name="title" />
      </div>
    </div>
    <div class="empty-state-content">
      <div class="k-empty-state-message mb-6">
        <slot name="message" />
      </div>
      <div class="k-empty-state-cta">
        <slot name="cta">
          <KButton
            v-if="!ctaIsHidden && ctaText"
            appearance="primary"
            size="small"
            @click.prevent="() => handleClick && handleClick()"
          >
            {{ ctaText }}
          </KButton>
        </slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  isError: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: String,
    default: '50',
  },
  icon: {
    type: String,
    default: '',
  },
  ctaIsHidden: {
    type: Boolean,
    default: false,
  },
  ctaText: {
    type: String,
    default: '',
  },
  handleClick: {
    type: Function,
    default: null,
  },
  iconColor: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.empty-state-wrapper {
  background-color: var(--KEmptyBackground, var(--white));
  border-radius: 4px;
  padding: 48px 0;
  text-align: center;

  .k-empty-state-title-header {
    color: var(--KEmptyTitleColor, var(--black-500));
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0 0 14px;
  }

  .k-empty-state-message {
    color: var(--KEmptyContentColor, var(--black-400));
    font-size: 13px;
    line-height: 20px;
    margin: 0 auto 14px;
    max-width: 50%;
  }

  .k-empty-state-cta {
    margin: 0;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
