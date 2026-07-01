<template>
  <div class="sandbox-theme-fab">
    <KPop
      hide-close-icon
      placement="top-end"
      :popover-timeout="0"
      width="200"
    >
      <button class="fab-trigger">
        <span
          class="fab-swatch"
          :style="{ background: swatchColor }"
        />
        <span class="fab-label">{{ activeThemeLabel }}</span>
        <span class="fab-chevron">▲</span>
      </button>
      <template #content>
        <ul
          class="theme-list"
          role="listbox"
        >
          <li
            v-for="label in themeLabels"
            :key="label"
            :aria-selected="label === activeThemeLabel"
            class="theme-option"
            :class="{ 'theme-option--active': label === activeThemeLabel }"
            role="option"
            @click="selectTheme(label)"
          >
            <span
              class="theme-option-swatch"
              :style="{ background: swatchFor(label) }"
            />
            <span class="theme-option-label">{{ label }}</span>
            <span
              v-if="label === activeThemeLabel"
              class="theme-option-check"
            >✓</span>
          </li>
        </ul>
      </template>
    </KPop>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSandboxTheme } from '../composables/useSandboxTheme'
import { SANDBOX_THEME_OPTIONS } from '../utils/sandboxThemes'

const { activeThemeLabel, themeLabels, selectTheme } = useSandboxTheme()

/**
 * Derives a representative swatch color from a theme's own token values.
 * Priority: brand accent → surface background → resolved CSS var fallback.
 * All values come from the theme object itself — nothing is hardcoded per theme name.
 */
function swatchFor(label: string): string {
  const theme = SANDBOX_THEME_OPTIONS[label]
  if (!theme) {
    // Default: no overrides — show the Kong baseline primary.
    return '#1155cb'
  }
  const t = theme as Record<string, string>
  return t['--kui-button-color-background-primary']
    ?? t['--kui-color-background-primary']
    ?? t['--kui-color-text-primary']
    ?? t['--kui-color-background']
    ?? '#1155cb'
}

const swatchColor = computed(() => swatchFor(activeThemeLabel.value))
</script>

<style lang="scss" scoped>
.sandbox-theme-fab {
  bottom: 24px;
  position: fixed;
  right: 24px;
  z-index: 200;
}

.fab-trigger {
  align-items: center;
  background-color: var(--kui-color-background, #ffffff);
  border: 1px solid var(--kui-color-border, #e0e0e0);
  border-radius: var(--kui-border-radius-round, 999px);
  box-shadow: var(--kui-shadow, 0 4px 20px rgba(0, 0, 0, .15));
  color: var(--kui-color-text, #000933);
  cursor: pointer;
  display: flex;
  font-family: var(--kui-font-family-text, sans-serif);
  font-size: var(--kui-font-size-20, 12px);
  font-weight: var(--kui-font-weight-semibold, 600);
  gap: 8px;
  padding: 8px 16px 8px 10px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: var(--kui-shadow-border-primary, 0 0 0 1px #1155cb), var(--kui-shadow, 0 4px 20px rgba(0, 0, 0, .15));
  }
}

.fab-swatch {
  border: 1px solid var(--kui-color-border, #e0e0e0);
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  height: 14px;
  width: 14px;
}

.fab-label {
  line-height: 1;
}

.fab-chevron {
  color: var(--kui-color-text-neutral, #6c7489);
  font-size: 8px;
  line-height: 1;
}

.theme-list {
  list-style: none;
  margin: 0;
  padding: 4px 0;
}

.theme-option {
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--kui-color-background-primary-weakest, #f0f4ff);
  }

  &--active {
    color: var(--kui-color-text-primary, #1155cb);
    font-weight: var(--kui-font-weight-semibold, 600);
  }
}

.theme-option-swatch {
  border: 1px solid var(--kui-color-border, #e0e0e0);
  border-radius: 50%;
  flex-shrink: 0;
  height: 12px;
  width: 12px;
}

.theme-option-label {
  flex: 1;
  font-size: var(--kui-font-size-30, 14px);
}

.theme-option-check {
  color: var(--kui-color-text-primary, #1155cb);
  font-size: var(--kui-font-size-20, 12px);
}
</style>
