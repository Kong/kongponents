<template>
  <section
    class="empty-state-wrapper"
    :class="{ 'is-error': isError }"
  >
    <div class="empty-state-title">
      <div
        v-if="isError || icon"
        class="k-empty-state-icon card-icon"
        :class="{ 'warning-icon': isError }"
      >
        <KIcon
          :color="isError ? iconColor || 'var(--black-70)' : iconColor"
          :icon="icon ? icon : 'warning'"
          :secondary-color="isError ? 'var(--yellow-400)' : undefined"
          :size="iconSize"
        />
      </div>
      <div
        v-if="$slots.title"
        class="k-empty-state-title-header"
      >
        <slot name="title" />
      </div>
    </div>
    <div class="empty-state-content">
      <div
        v-if="$slots.message"
        class="k-empty-state-message"
      >
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

defineProps({
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
  padding: var(--spacing-xxl, spacing(xxl)) 0;
  text-align: center;

  > * + * {
    margin-top: var(--spacing-md, spacing(md));
  }

  .k-empty-state-title-header {
    color: var(--KEmptyTitleColor, var(--black-500));
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }

  .empty-state-title > * + * {
    margin-top: var(--spacing-xs, spacing(xs));
  }

  .k-empty-state-message {
    color: var(--KEmptyContentColor, var(--black-400));
    font-size: 13px;
    line-height: 20px;
    margin-left: auto;
    margin-right: auto;
    max-width: 50%;
  }

  .empty-state-content > * + * {
    margin-top: var(--spacing-xl, spacing(xl));
  }

  .k-empty-state-cta {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
