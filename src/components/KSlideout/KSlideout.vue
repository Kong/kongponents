<template>
  <div class="k-slideout">
    <transition name="fade">
      <div
        v-if="isVisible"
        :class="{ 'panel-background': overlayEnabled }"
        @click="(event: any) => handleClose(event, true)"
      />
    </transition>
    <transition
      name="slide"
    >
      <div
        v-if="isVisible"
        class="panel"
        :class="{ 'is-visible': isVisible, 'border-styles': !overlayEnabled }"
      >
        <!-- If there is title prop, display the header content -->
        <div
          v-if="title"
          class="k-slideout-header-content"
        >
          <slot name="badgeContent">
            <KBadge
              v-if="!hasOnlyTitle"
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
              :class="{ 'title-spacing': hasOnlyTitle}"
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
                  v-if="!hasOnlyTitle"
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
              size="24"
              view-box="0 0 24 24"
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
            view-box="0 0 24 24"
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
  overlayEnabled: {
    type: Boolean,
    default: true,
  },
  // allows a host app to define the offset from the top of the page
  offsetTop: {
    type: Number,
    default: 0,
  },
  hasOnlyTitle: {
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
      color: var(--black-400, #3C4557);
      flex:1;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.title-spacing {
        margin-left: 12px;
      }
    }
  }
  .panel {
    background-color: var(--white, color(white));
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
      margin-left: 16px;
      outline: inherit;
      padding-top: 16px;
      position: absolute;
      transition: 200ms ease;
      width: 16px;
    }

    .close-button-end {
      align-self: flex-end;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      height: auto;
      margin-right: 16px;
      outline: inherit;
      padding-top: 16px;
      position: absolute;
      transition: 200ms ease;
      width: 16px;
    }

    .badge-with-title {
      align-self: center;
      height: 20px;
      margin-left: 10px;
      margin-right: 6px;
    }

    .icon-with-title {
      align-self: center;
      cursor: pointer;
    }

    .close-button-with-title {
      margin-left: 16px;
      margin-right: 16px;
      margin-top: 6px;
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
    background: var(--black-45, color(black-45));
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    z-index: 9999;
  }

  .border-styles {
    border-left: 1px solid var(--grey-300)
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
