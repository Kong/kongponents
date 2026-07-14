<template>
  <div
    ref="pickerRef"
    class="docs-theme-picker"
  >
    <button
      class="theme-btn"
      :title="`Kongponents theme: ${activeThemeLabel}`"
      @click="open = !open"
    >
      <span
        class="theme-swatch"
        :style="{ background: swatchFor(activeThemeLabel) }"
      />
    </button>

    <Transition name="flyout">
      <div
        v-if="open"
        :aria-label="`Kongponents theme: ${activeThemeLabel}`"
        class="theme-flyout"
        role="listbox"
      >
        <p class="flyout-title">
          Kongponents Theme
        </p>
        <ul class="flyout-list">
          <li
            v-for="label in themeLabels"
            :key="label"
            :aria-selected="label === activeThemeLabel"
            class="flyout-item"
            :class="{ 'flyout-item--active': label === activeThemeLabel }"
            role="option"
            @click="select(label)"
          >
            <span
              class="item-swatch"
              :style="{ background: swatchFor(label) }"
            />
            <span class="item-label">{{ label }}</span>
            <svg
              v-if="label === activeThemeLabel"
              class="item-check"
              fill="none"
              height="12"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              viewBox="0 0 24 24"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { applyTheme } from '../../../../src/theme/applyTheme'
import { useDocsTheme } from '../composables/useDocsTheme'
import { DOCS_THEME_OPTIONS } from '../utils/docsThemes'

const { activeThemeLabel, themeLabels, selectTheme } = useDocsTheme()

const open = ref(false)
const pickerRef = ref<HTMLElement | null>(null)

function select(label: string): void {
  selectTheme(label)
  open.value = false
}

function swatchFor(label: string): string {
  const theme = DOCS_THEME_OPTIONS[label]
  if (!theme) return '#1155cb'
  const t = theme as Record<string, string>
  return t['--kui-button-color-background-primary']
    ?? t['--kui-color-background-primary']
    ?? t['--kui-color-text-primary']
    ?? t['--kui-color-background']
    ?? '#1155cb'
}

function onClickOutside(e: MouseEvent): void {
  if (pickerRef.value && !pickerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  // The Kongponents plugin calls applyTheme(undefined) during enhanceApp (before
  // components mount), wiping any module-level injection. Reapply here so the
  // persisted theme is always active after hydration.
  applyTheme(DOCS_THEME_OPTIONS[activeThemeLabel.value])
  document.addEventListener('click', onClickOutside)
})
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
/* stylelint-disable custom-property-pattern */

.docs-theme-picker {
  align-items: center;
  display: flex;
  margin-left: 6px;
  position: relative;
}

.theme-btn {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  height: 36px;
  justify-content: center;
  transition: background-color 0.25s, color 0.25s;
  width: 36px;
}

.theme-btn:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.theme-swatch {
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 50%;
  display: block;
  flex-shrink: 0;
  height: 16px;
  width: 16px;
}

.theme-flyout {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  min-width: 180px;
  overflow: hidden;
  padding: 8px 0;
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 100;
}

.flyout-title {
  color: var(--vp-c-text-3);
  font-size: 11px;
  font-weight: 600;
  /* stylelint-disable-next-line unit-disallowed-list */
  letter-spacing: 0.06em;
  margin: 0;
  padding: 6px 14px 4px;
  text-transform: uppercase;
}

.flyout-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.flyout-item {
  align-items: center;
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  font-size: 14px;
  gap: 8px;
  padding: 6px 14px;
  transition: background-color 0.15s;
}

.flyout-item:hover {
  background: var(--vp-c-default-soft);
}

.flyout-item--active {
  color: var(--vp-c-brand-1);
}

.item-swatch {
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  flex-shrink: 0;
  height: 12px;
  width: 12px;
}

.item-label {
  flex: 1;
}

.item-check {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

/* Transition */
.flyout-enter-active,
.flyout-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
