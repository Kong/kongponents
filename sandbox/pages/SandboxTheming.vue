<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="Theming"
  >
    <div class="ktheming-sandbox">
      <SandboxTitleComponent
        is-subtitle
        title="App-level theme (applied to :root)"
      />
      <p>
        The buttons below call <code>useTheme().setTheme()</code>, which writes the theme's
        <code>--kui-*</code> tokens to the document root. Notice that <strong>everything</strong> reskins —
        including the teleported modal and toaster, and the plain (non-Kongponents) box that simply reads
        <code>var(--kui-color-text)</code>.
      </p>

      <SandboxSectionComponent title="Theme switcher">
        <div class="theme-switcher">
          <KButton
            v-for="option in themeOptions"
            :key="option.label"
            :appearance="activeTheme === option.label ? 'primary' : 'secondary'"
            @click="selectTheme(option.label)"
          >
            {{ option.label }}
          </KButton>
        </div>
      </SandboxSectionComponent>

      <SandboxSectionComponent title="Kongponents (atoms)">
        <div class="demo-row">
          <KButton appearance="primary">
            Primary
          </KButton>
          <KButton appearance="secondary">
            Secondary
          </KButton>
          <KBadge appearance="success">
            Success
          </KBadge>
          <KInput placeholder="Themed input" />
        </div>
        <KCard
          class="demo-card"
          title="Themed card"
        >
          This card's surface, text, and border all come from <code>--kui-*</code> tokens.
        </KCard>
      </SandboxSectionComponent>

      <SandboxSectionComponent title="Teleported content (proves :root reach)">
        <div class="demo-row">
          <KButton @click="modalVisible = true">
            Open modal
          </KButton>
          <KButton @click="notify">
            Show toast
          </KButton>
        </div>
        <KModal
          title="Themed modal"
          :visible="modalVisible"
          @cancel="modalVisible = false"
          @proceed="modalVisible = false"
        >
          This modal is teleported to <code>&lt;body&gt;</code>, yet it follows the app theme because the
          tokens live on <code>:root</code>.
        </KModal>
      </SandboxSectionComponent>

      <SandboxSectionComponent title="Host-app / downstream component (raw token consumer)">
        <!-- Not a Kongponent: a plain element that consumes a design token directly. -->
        <div class="native-box">
          Plain <code>&lt;div&gt;</code> using <code>color: var(--kui-color-text)</code> and
          <code>border-color: var(--kui-color-border)</code>.
        </div>
      </SandboxSectionComponent>

      <SandboxTitleComponent
        is-subtitle
        title="Subtree theme (scoped via KThemeProvider)"
      />
      <p>
        This region is wrapped in <code>&lt;KThemeProvider :theme="scopedTheme"&gt;</code>, so it shows
        a different brand than the app theme above — without affecting anything outside it. The scoped
        theme automatically contrasts the active app theme so the difference is always visible.
      </p>
      <SandboxSectionComponent title="Scoped brand region">
        <KThemeProvider :theme="scopedTheme">
          <div class="scoped-surface">
            <div class="demo-row">
              <KButton appearance="primary">
                Portal brand
              </KButton>
              <KBadge appearance="success">
                Scoped
              </KBadge>
              <KInput placeholder="Scoped input" />
            </div>
          </div>
        </KThemeProvider>
      </SandboxSectionComponent>

      <SandboxTitleComponent
        is-subtitle
        title="Component-level branding"
      />
      <p>
        Each region below applies a <code>KThemeProvider</code> that sets a single
        <strong>component token</strong> — for example <code>--kui-button-border-radius-*: 999px</code> —
        leaving all other components to inherit their geometry from whichever app-level theme is active.
        Switch the app theme above to see how the active brand's colors and typography apply everywhere
        while the targeted component stays pill-shaped regardless.
      </p>
      <SandboxSectionComponent title="Component-level token demo">
        <div class="brand-compare-row">
          <div class="brand-panel">
            <p class="brand-panel-label">
              Pill buttons — inputs follow the active theme
            </p>
            <KThemeProvider :theme="pillButtonsDemo">
              <div class="scoped-surface">
                <div class="demo-row">
                  <KButton appearance="primary">
                    Primary
                  </KButton>
                  <KButton appearance="secondary">
                    Secondary
                  </KButton>
                  <KInput placeholder="Input (semantic)" />
                </div>
              </div>
            </KThemeProvider>
          </div>
          <div class="brand-panel">
            <p class="brand-panel-label">
              Pill inputs — buttons follow the active theme
            </p>
            <KThemeProvider :theme="pillInputsDemo">
              <div class="scoped-surface">
                <div class="demo-row">
                  <KButton appearance="primary">
                    Primary
                  </KButton>
                  <KButton appearance="secondary">
                    Secondary
                  </KButton>
                  <KInput placeholder="Pill input" />
                </div>
              </div>
            </KThemeProvider>
          </div>
        </div>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { KongponentsTheme } from '../../src'
import useSandboxToaster from '../composables/useSandboxToaster'
import { useSandboxTheme } from '../composables/useSandboxTheme'
import { SANDBOX_THEME_OPTIONS } from '../utils/sandboxThemes'

interface ThemeOption {
  /** Label shown on the switcher button. */
  label: string
  /** Theme to apply, or undefined to clear back to the design-token defaults. */
  theme: KongponentsTheme | undefined
}

const themeOptions: ThemeOption[] = Object.entries(SANDBOX_THEME_OPTIONS).map(([label, theme]) => ({ label, theme }))

const { activeThemeLabel: activeTheme, selectTheme } = useSandboxTheme()
const { toaster } = useSandboxToaster()

const modalVisible = ref<boolean>(false)

/**
 * Component-token demo themes for the always-visible comparison panel.
 * These are independent of the brand themes — they set per-component geometry
 * tokens only, leaving everything else (colors, fonts, spacing) to inherit from
 * whichever app-level theme is active on :root.
 *
 * Because the brand themes use semantic tokens (--kui-border-radius-*, etc.) and
 * these demo themes use component tokens (--kui-button-border-radius-*,
 * --kui-input-border-radius), both coexist without interference: component tokens
 * win over semantic tokens via the var() fallback chain.
 */
const pillButtonsDemo: KongponentsTheme = {
  '--kui-button-border-radius-small': '999px',
  '--kui-button-border-radius-medium': '999px',
  '--kui-button-border-radius-large': '999px',
}

const pillInputsDemo: KongponentsTheme = {
  '--kui-input-border-radius': '999px',
}

// Pick a non-active, non-Default theme to display in the scoped region so it always
// contrasts the active app theme. Derived entirely from SANDBOX_THEME_OPTIONS so adding
// or removing themes requires no changes here.
const scopedTheme = computed<KongponentsTheme>(() => {
  const candidates = Object.entries(SANDBOX_THEME_OPTIONS)
    .filter(([label, theme]) => theme !== undefined && label !== activeTheme.value)
  // Prefer a theme that isn't adjacent in the list (skip index 0 if active is also near top).
  const entry = candidates.find(([label]) => label !== 'Light') ?? candidates[0]
  return entry?.[1] ?? {}
})

const notify = (): void => {
  toaster.open({ message: 'This toast is themed too 🎨', appearance: 'success' })
}
</script>

<style lang="scss" scoped>
.ktheming-sandbox {
  .theme-switcher,
  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--kui-space-40, $kui-space-40);
    align-items: center;
  }

  .demo-card {
    margin-top: var(--kui-space-50, $kui-space-50);
    max-width: 480px;
  }

  .scoped-surface {
    background-color: var(--kui-color-background, $kui-color-background);
    border: 1px solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    padding: var(--kui-space-50, $kui-space-50);
  }

  .native-box {
    border: 1px solid var(--kui-color-border, $kui-color-border);
    color: var(--kui-color-text, $kui-color-text);
    background-color: var(--kui-color-background, $kui-color-background);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    padding: var(--kui-space-50, $kui-space-50);
    max-width: 480px;
  }

  .brand-compare-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--kui-space-60, $kui-space-60);
  }

  .brand-panel {
    flex: 1;
    min-width: 260px;
  }

  .brand-panel-label {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    margin-bottom: var(--kui-space-40, $kui-space-40);
    margin-top: 0;
  }
}
</style>
