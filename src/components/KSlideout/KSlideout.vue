<template>
  <div class="k-slideout">
    <transition name="fade">
      <div
        v-if="isVisible"
        :class="{ 'panel-background': hasOverlay }"
        @click="(event: any) => handleClose(event, true)"
      />
    </transition>
    <transition
      name="slide"
    >
      <div
        v-if="isVisible"
        class="panel"
        :class="{ 'is-visible': isVisible, 'border-styles': !hasOverlay }"
      >
        <!-- If there is title prop, display the header content -->
        <div
          v-if="title"
          class="k-slideout-header-content"
        >
          <slot name="badgeContent">
            <KBadge
              v-if="!titleOnly"
              :appearance="badgeAppearance"
              class="badge-with-title"
              :shape="badgeShape"
            >
              {{ badgeValue }}
            </KBadge>
          </slot>

          <slot name="titleContent">
            <p
              class="k-slideout-title"
              :class="{ 'title-spacing': titleOnly}"
            >
              {{ title }}
            </p>
          </slot>

          <slot name="iconContent">
            <KClipboardProvider>
              <span
                class="icon-with-title"
                @click="handleClick"
              >
                <KIcon
                  v-if="!titleOnly"
                  :color="iconColor"
                  :icon="iconType"
                  :size="iconSize"
                />
              </span>
            </KClipboardProvider>
          </slot>

          <button
            class="close-button-with-title"
            @click="(event: any) => handleClose(event, true)"
          >
            <KIcon
              color="var(--grey-600)"
              icon="close"
              :size="KUI_ICON_SIZE_50"
            />
          </button>
        </div>

        <button
          v-else
          :class="closeButtonAlignment === 'start' ? 'close-button-start' : 'close-button-end'"
          @click="(event: any) => handleClose(event, true)"
        >
          <KIcon
            icon="close"
            :size="KUI_ICON_SIZE_50"
          />
        </button>
        <div class="content">
          <KCard border-variant="noBorder">
            <template #body>
              <slot />
            </template>
          </KCard>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, computed, PropType } from 'vue'
import KCard from '@/components/KCard/KCard.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import useUtilities from '@/composables/useUtilities'
import type { BadgeAppearance, BadgeShape } from '@/types'
import { BadgeAppearances, BadgeShapes } from '@/types'
import { KUI_ICON_SIZE_50 } from '@kong/design-tokens'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  // controls close button alignment
  closeButtonAlignment: {
    type: String,
    default: 'start',
    validator: (value: string): boolean => {
      return ['start', 'end'].includes(value)
    },
  },
  // enable/disable overlay to be able to interact with the background content while the slideout is expanded
  hasOverlay: {
    type: Boolean,
    default: true,
  },
  // allows a host app to define the offset from the top of the page
  offsetTop: {
    type: Number,
    default: 0,
  },
  titleOnly: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  badgeValue: {
    type: String,
    default: '',
  },
  badgeAppearance: {
    type: String as PropType<BadgeAppearance>,
    required: false,
    validator: (value: string): boolean => {
      return Object.keys({ ...BadgeAppearances }).includes(value)
    },
    default: 'warning',
  },
  badgeShape: {
    type: String as PropType<BadgeShape>,
    required: false,
    validator: (value: string): boolean => {
      return Object.keys({ ...BadgeShapes }).includes(value)
    },
    default: 'rectangular',
  },
  iconType: {
    type: String,
    default: 'copy',
  },
  iconColor: {
    type: String,
    default: 'var(--blue-500)',
  },
  iconSize: {
    type: String,
    default: '16',
  },
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'kclipboard-icon-clicked', value: string): void
}>()

const { getSizeFromString } = useUtilities()
const handleClose = (e: any, forceClose = false): void => {
  if ((props.isVisible && e.keyCode === 27) || forceClose) {
    emit('close')
  }
}

const handleClick = (): void => {
  emit('kclipboard-icon-clicked', props.title)
}

const offsetTopValue = computed((): string => getSizeFromString(String(props.offsetTop)))

onMounted(() => {
  document.addEventListener('keydown', handleClose)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleClose)
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';

.k-slideout {
  --KCardPaddingY: var(--kui-space-90, #{$kui-space-90});
  --KCardPaddingX: var(--kui-space-110, #{$kui-space-110});

  .k-slideout-header-content {
    display: flex;
    .k-slideout-title {
      color: var(--black-400, var(--kui-color-text-neutral, $kui-color-text-neutral));
      flex:1;
      font-size: var(--kui-font-size-40, $kui-font-size-40);
      font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
      line-height: var(--kui-line-height-40, $kui-line-height-40);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.title-spacing {
        margin-left: var(--kui-space-50, $kui-space-50);
      }
    }
  }
  .panel {
    background-color: var(--white, var(--kui-color-background, $kui-color-background));
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 500px;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    width: 100%;
    z-index: 9999;

    .close-button-start {
      align-self: flex-start;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      height: auto;
      margin-left: var(--kui-space-60, $kui-space-60);
      outline: inherit;
      padding-top: var(--kui-space-60, $kui-space-60);
      position: absolute;
      transition: $tmp-animation-timing-2 ease;
      width: 16px;
    }

    .close-button-end {
      align-self: flex-end;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      height: auto;
      margin-right: var(--kui-space-60, $kui-space-60);
      outline: inherit;
      padding-top: var(--kui-space-60, $kui-space-60);
      position: absolute;
      transition: 200ms ease;
      width: 16px;
    }

    .badge-with-title {
      align-self: center;
      height: 20px;
      margin-left: var(--kui-space-40, $kui-space-40);
      margin-right: var(--kui-space-30, $kui-space-30);
    }

    .icon-with-title {
      align-self: center;
      cursor: pointer;
    }

    .close-button-with-title {
      margin-left: var(--kui-space-60, $kui-space-60);
      margin-right: var(--kui-space-60, $kui-space-60);
      margin-top: var(--kui-space-30, $kui-space-30);
    }

    .content {
      height: 100%;
      overflow: auto;
      -ms-overflow-style: none;  // IE 10+
      scrollbar-width: none;  // Firefox
      &::-webkit-scrollbar { display: none; }
    }
  }
}

  .panel-background {
    background: var(--black-45, $tmp-color-black-45);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    z-index: 9999;
  }

  .border-styles {
    border-left: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
  }
</style>

<style lang="scss">
// @keyframes animations need to be un-scoped
.k-slideout {
  @keyframes slide {
    0% { transform: translateX(100%); }
    100% { transform: translateX(0%); }
  }

  .slide-enter-active { animation: slide .3s cubic-bezier(1.0, 0.5, 0.8, 1.0); }

  .slide-leave-active { animation: slide .3s ease reverse; }

  .fade-enter-active, .fade-leave-active { transition: opacity 500ms;}

  .fade-enter, .fade-leave-to { opacity: 0; }
}
</style>
