<template>
  <component
    :is="safeTag"
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
import { THEME_PROVIDER_DISPLAY_VALUES } from '@/types/theme'
import { themeToStyleRecord, type ThemeStyleRecord } from '@/theme/themeToCssVars'
import { applyTheme } from '@/theme/applyTheme'
import { KONGPONENTS_THEME_INJECTION_KEY, createThemeController } from '@/composables/useTheme'

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  theme: undefined,
  global: false,
  tag: 'div',
  name: undefined,
  display: 'contents',
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

const { theme: activeTheme, setTheme } = createThemeController(apply, props.theme)

// Keep the controller (and therefore the applied theme) in sync with the prop.
watch(() => props.theme, setTheme)

// Expose this scope's theme to descendants via useTheme().
provide(KONGPONENTS_THEME_INJECTION_KEY, { theme: activeTheme, setTheme })

/** Tags that must never be used as the provider wrapper (XSS / resource injection risk). */
const BLOCKED_TAGS = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'base', 'meta', 'title', 'html', 'head', 'body'])

const safeTag = computed<string>(() => {
  // Strip everything outside valid HTML/custom-element identifier chars ([a-zA-Z0-9-]).
  // This neutralises whitespace padding, null bytes, control characters, and encoding
  // tricks before the blocklist check (e.g. "scr\x00ipt" → "script" → blocked).
  const normalized = props.tag.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()

  // Must be non-empty and start with a letter (HTML tag name grammar requires it).
  if (!normalized || !/^[a-z]/.test(normalized) || BLOCKED_TAGS.has(normalized)) {
    return 'div'
  }

  return normalized
})

const VALID_DISPLAY = new Set<string>(THEME_PROVIDER_DISPLAY_VALUES)

/** Inline styles for the wrapper: always sets `display`; also sets `--kui-*` custom properties in the subtree (non-global) case. */
const wrapperStyle = computed<ThemeStyleRecord>(() => {
  const requested = props.display ?? 'contents'
  let display: string

  if (VALID_DISPLAY.has(requested)) {
    display = requested
  } else {
    display = 'contents'
  }

  const styles: ThemeStyleRecord = { display }

  if (!props.global) {
    Object.assign(styles, themeToStyleRecord(activeTheme.value ?? {}))
  }

  return styles
})
</script>
