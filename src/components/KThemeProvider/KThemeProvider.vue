<template>
  <component
    :is="tag"
    class="k-theme-provider"
    :data-kui-theme="name || undefined"
    :style="wrapperStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, watch, provide } from 'vue'
import type { KongponentsTheme, ThemeProviderProps, ThemeProviderSlots } from '@/types/theme'
import { themeToStyleRecord, type ThemeStyleRecord } from '@/theme/themeToCssVars'
import { applyTheme } from '@/theme/applyTheme'
import { KONGPONENTS_THEME_INJECTION_KEY, createThemeController } from '@/composables/useTheme'

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  theme: undefined,
  global: false,
  tag: 'div',
  name: undefined,
})

defineSlots<ThemeProviderSlots>()

/**
 * Applies the theme for the current scope. When `global`, the tokens are written
 * to the document root; otherwise the subtree path relies on the inline
 * `wrapperStyle` binding below, so this is a no-op.
 */
const apply = (theme: KongponentsTheme | undefined): void => {
  if (props.global) {
    applyTheme(theme)
  }
}

const controller = createThemeController(apply, props.theme)

// Keep the controller (and therefore the applied theme) in sync with the prop.
watch(() => props.theme, (theme) => {
  controller.setTheme(theme)
})

// Expose this scope's theme to descendants via useTheme().
provide(KONGPONENTS_THEME_INJECTION_KEY, controller)

/** Inline `--kui-*` custom properties for the subtree (non-global) case. */
const wrapperStyle = computed<ThemeStyleRecord | undefined>(() => {
  if (props.global) {
    return undefined
  }

  return themeToStyleRecord(controller.theme.value ?? {})
})
</script>
