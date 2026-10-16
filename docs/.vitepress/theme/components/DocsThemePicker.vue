<template>
  <div
    ref="pickerRef"
    class="docs-theme-picker"
  >
    <button
      :aria-checked="activeMode === 'dark'"
      :aria-label="activeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      class="mode-btn"
      role="switch"
      :title="activeMode === 'dark' ? 'Light mode' : 'Dark mode'"
      type="button"
      @click="toggleMode"
    >
      <svg
        v-if="activeMode === 'dark'"
        aria-hidden="true"
        fill="none"
        height="18"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.7"
        viewBox="0 0 24 24"
        width="18"
      >
        <circle
          cx="12"
          cy="12"
          r="4"
        />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg
        v-else
        aria-hidden="true"
        fill="none"
        height="18"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.7"
        viewBox="0 0 24 24"
        width="18"
      >
        <path d="M20.7 14.3A8.8 8.8 0 0 1 9.7 3.3 8.8 8.8 0 1 0 20.7 14.3Z" />
      </svg>
    </button>
    <button
      ref="buttonRef"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="`Choose theme. Current theme: ${activeThemeLabel}`"
      class="theme-btn"
      :title="`Kongponents theme: ${activeThemeLabel}`"
      type="button"
      @click="open = !open"
    >
      <span
        class="theme-swatch"
        :style="{ background: swatchFor(activeThemeLabel) }"
      />
      <span class="theme-btn-label">Theme</span>
      <svg
        aria-hidden="true"
        class="theme-chevron"
        :class="{ 'theme-chevron--open': open }"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
        viewBox="0 0 12 12"
      >
        <path d="m2.5 4.5 3.5 3 3.5-3" />
      </svg>
    </button>

    <Transition name="flyout">
      <div
        v-if="open"
        aria-label="Kongponents themes"
        class="theme-flyout"
        role="menu"
        @keydown.esc="closeAndFocus"
      >
        <p class="flyout-title">
          Kongponents Theme
        </p>
        <ul class="flyout-list">
          <li
            v-for="label in themeLabels"
            :key="label"
          >
            <button
              :aria-checked="label === activeThemeLabel"
              class="flyout-item"
              :class="{ 'flyout-item--active': label === activeThemeLabel }"
              role="menuitemradio"
              type="button"
              @click="select(label)"
            >
              <span
                class="item-swatch"
                :class="{ 'item-swatch--contrast': label.includes('High Contrast') }"
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
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDocsTheme } from '../composables/useDocsTheme'
import { DOCS_THEME_OPTIONS } from '../utils/docsThemes'

const { activeThemeLabel, activeMode, themeLabels, selectTheme, toggleMode, applyCurrentTheme } = useDocsTheme()

const open = ref(false)
const pickerRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

function closeAndFocus(): void {
  open.value = false
  buttonRef.value?.focus()
}

function select(label: string): void {
  selectTheme(label)
  open.value = false
}

function swatchFor(label: string): string {
  if (label.startsWith('Electric Lime')) return '#ccff00'
  if (label.startsWith('Mono Lime')) return '#a8d400'
  const theme = DOCS_THEME_OPTIONS[label]?.light
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
  applyCurrentTheme()
  document.addEventListener('click', onClickOutside)
})
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
/* stylelint-disable custom-property-pattern */

.docs-theme-picker {
  align-items: center;
  display: flex;
  gap: 8px;
  margin-left: 8px;
  position: relative;
}

.mode-btn,
.theme-btn {
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  height: 38px;
  justify-content: center;
  transition: background-color 0.25s, border-color 0.25s;
}

.mode-btn {
  flex: 0 0 38px;
  padding: 0;
}

.theme-btn {
  gap: 8px;
  padding: 0 11px;
}

.mode-btn:hover,
.theme-btn:hover {
  background: color-mix(in srgb, var(--vp-c-text-1) 10%, var(--vp-c-bg));
  border-color: var(--vp-c-text-3);
}

.mode-btn:focus-visible,
.theme-btn:focus-visible,
.flyout-item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.theme-swatch {
  border: 2px solid var(--vp-c-bg);
  border-radius: 50%;
  display: block;
  flex-shrink: 0;
  height: 16px;
  outline: 1px solid var(--vp-c-divider);
  width: 16px;
}

.theme-btn-label {
  font-size: 12px;
  font-weight: 650;
}

.theme-chevron {
  display: block;
  flex: 0 0 12px;
  height: 12px;
  transition: transform 0.2s ease;
  width: 12px;
}

.theme-chevron--open {
  transform: rotate(180deg);
}

.theme-flyout {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 18px 44px #0003;
  min-width: 252px;
  overflow: hidden;
  padding: 8px;
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 101;
}

.flyout-title {
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin: 0;
  padding: 8px 10px 10px;
  text-transform: uppercase;
}

.flyout-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.flyout-item {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 5px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  font-size: 13px;
  gap: 10px;
  min-height: 38px;
  padding: 7px 10px;
  text-align: left;
  transition: background-color 0.15s, color 0.15s;
  width: 100%;
}

.flyout-item:hover {
  background: color-mix(in srgb, var(--vp-c-text-1) 8%, var(--vp-c-bg-elv));
}

.flyout-item--active {
  background: color-mix(in srgb, var(--vp-c-text-1) 11%, var(--vp-c-bg-elv));
  font-weight: 650;
}

.item-swatch {
  border: 2px solid var(--vp-c-bg-elv);
  border-radius: 50%;
  flex-shrink: 0;
  height: 14px;
  outline: 1px solid var(--vp-c-divider);
  width: 14px;
}

.item-swatch--contrast {
  outline: 2px solid var(--vp-c-text-2);
}

.item-label {
  flex: 1;
}

.item-check {
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .mode-btn,
  .theme-btn {
    border: 0;
    height: 36px;
    padding: 0;
    width: 36px;
  }

  .mode-btn { flex-basis: 36px; }

  .theme-btn-label,
  .theme-chevron { display: none; }
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
