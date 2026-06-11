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
            @click="selectTheme(option)"
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
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import {
  useTheme,
  lightTheme,
  darkTheme,
  brandATheme,
  brandBTheme,
  type KongponentsTheme,
} from '../../src'
import useSandboxToaster from '../composables/useSandboxToaster'

const STORAGE_KEY = 'kong-sandbox-theme'

interface ThemeOption {
  /** Label shown on the switcher button. */
  label: string
  /** Theme to apply, or undefined to clear back to the design-token defaults. */
  theme: KongponentsTheme | undefined
}

const themeOptions: ThemeOption[] = [
  { label: 'Default', theme: undefined },
  { label: 'Light', theme: lightTheme },
  { label: 'Dark', theme: darkTheme },
  { label: 'Brand A', theme: brandATheme },
  { label: 'Brand B', theme: brandBTheme },
]

const { setTheme } = useTheme()
const { toaster } = useSandboxToaster()

// Restore the active label from storage for button highlighting — the theme
// itself is already applied by sandbox/index.ts before the app mounted.
const savedLabel = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null

const activeTheme = ref<string>(savedLabel ?? 'Default')
const modalVisible = ref<boolean>(false)

// Always contrast the app theme so the scoped region is visually distinct.
const scopedTheme = computed(() => activeTheme.value === 'Brand A' ? brandBTheme : brandATheme)

const selectTheme = (option: ThemeOption): void => {
  activeTheme.value = option.label
  setTheme(option.theme)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, option.label)
  }
}

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
}
</style>
