<template>
  <main
    class="home-page"
    :class="{ 'home-page--motion-ready': motionReady }"
  >
    <section
      aria-labelledby="home-title"
      class="home-hero"
    >
      <div class="home-hero__copy">
        <p class="eyebrow">
          <span class="eyebrow__dot" /> Kong design system <span class="eyebrow__divider">/</span> Vue 3 + Nuxt
        </p>
        <h1 id="home-title">
          Build interfaces<br><span>that feel connected.</span>
        </h1>
        <p class="home-hero__description">
          The component library behind Kong experiences. Build with Vue 3 components or use the Nuxt module for automatic setup, with flexible theming in either framework.
        </p>
        <div class="home-hero__actions">
          <KButton
            appearance="primary"
            size="large"
            to="/guide/quick-start"
          >
            Get started
          </KButton>
          <KButton
            appearance="secondary"
            size="large"
            to="/components/"
          >
            Explore components
          </KButton>
        </div>
        <div class="home-hero__frameworks">
          <span>Built for</span>
          <a
            class="home-hero__framework home-hero__framework--vue"
            href="/guide/frameworks#vue-3"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path
                class="vue-logo__outer"
                d="M24 1.61h-9.94L12 5.16 9.94 1.61H0L12 22.39Z"
              />
              <path
                class="vue-logo__inner"
                d="M19.84 1.61h-4.78L12 6.91 8.94 1.61H4.16L12 15.19Z"
              />
            </svg>
            Vue 3
          </a>
          <a
            class="home-hero__framework home-hero__framework--nuxt"
            href="/guide/frameworks#nuxt"
          >
            <svg
              aria-hidden="true"
              fill="currentColor"
              focusable="false"
              viewBox="0 0 24 24"
            ><path d="M13.464 19.83h8.922c.283 0 .562-.073.807-.21a1.6 1.6 0 0 0 .591-.574a1.53 1.53 0 0 0 .216-.783 1.53 1.53 0 0 0-.217-.782L17.792 7.414a1.6 1.6 0 0 0-.591-.573 1.65 1.65 0 0 0-.807-.21c-.283 0-.562.073-.807.21a1.6 1.6 0 0 0-.59.573L13.463 9.99L10.47 4.953a1.6 1.6 0 0 0-.591-.573 1.65 1.65 0 0 0-.807-.21c-.284 0-.562.073-.807.21a1.6 1.6 0 0 0-.591.573L.216 17.481a1.53 1.53 0 0 0-.217.782c0 .275.074.545.216.783a1.6 1.6 0 0 0 .59.574c.246.137.525.21.808.21h5.6c2.22 0 3.856-.946 4.982-2.79l2.733-4.593l1.464-2.457l4.395 7.382h-5.859Zm-6.341-2.46l-3.908-.002l5.858-9.842l2.923 4.921l-1.957 3.29c-.748 1.196-1.597 1.632-2.916 1.632" /></svg>
            Nuxt
          </a>
        </div>
        <div class="home-hero__meta">
          <span>Open source</span><span>TypeScript</span><span>Made by Kong</span>
        </div>
      </div>

      <div
        aria-label="Interactive preview built with Kongponents"
        class="showcase"
      >
        <div class="showcase__top">
          <span class="showcase__label">THE SYSTEM IN ACTION</span><span class="showcase__version">LIVE COMPONENTS</span>
        </div>
        <div class="showcase__window">
          <div class="showcase__window-bar">
            <div class="showcase__dots">
              <i /><i /><i />
            </div><span>Component preview</span><span class="showcase__window-spacer" />
          </div>
          <div class="showcase__content">
            <div class="showcase__intro">
              <span class="showcase__overline">YOUR WORKSPACE</span><span class="showcase__status"><i /> All systems ready</span>
            </div>
            <h2>Everything in its place.</h2>
            <p>Give every detail room to breathe.</p>
            <KInput
              v-model="workspaceName"
              class="showcase__input"
              label="Workspace name"
              maxlength="40"
            />
            <div class="showcase__row">
              <KBadge appearance="success">
                Active
              </KBadge><KBadge appearance="neutral">
                Production
              </KBadge><span class="showcase__row-line" />
            </div>
            <div class="showcase__buttons">
              <KButton
                appearance="tertiary"
                size="small"
                to="/components/"
              >
                View components
              </KButton>
              <KButton
                appearance="primary"
                :disabled="!workspaceName.trim()"
                size="small"
                @click="saveWorkspace"
              >
                {{ workspaceSaved ? 'Saved' : 'Save workspace' }}
              </KButton>
            </div>
            <p
              v-if="workspaceSaved"
              aria-live="polite"
              class="showcase__confirmation"
            >
              {{ savedWorkspaceName }} is ready to use.
            </p>
          </div>
        </div>
        <div class="showcase__bottom">
          <span>Clear by design. Flexible by nature.</span><span>© KONGPONENTS</span>
        </div>
      </div>
    </section>

    <section
      aria-labelledby="components-title"
      class="home-section home-section--components"
    >
      <div class="section-heading">
        <div>
          <p class="section-kicker">
            01 / THE LIBRARY
          </p><h2 id="components-title">
            Made for the work<br><span>inside the interface.</span>
          </h2>
          <p class="component-section__intro">
            Try a few of the controls teams use to configure, inspect, and understand Kong products.
          </p>
        </div><a
          class="section-link"
          href="/components/"
        >Browse all components</a>
      </div>
      <div class="component-list">
        <article class="component-row">
          <div class="component-row__copy">
            <span class="component-row__index">01 / CONTROL</span>
            <h3>Set a service state.</h3>
            <p>Give an on/off decision a clear label and show the result in the same place.</p>
            <div class="component-row__links">
              <a href="/components/input-switch">KInputSwitch</a>
              <a href="/components/badge">KBadge</a>
            </div>
          </div>
          <div class="component-row__demo component-row__demo--switch">
            <div class="component-demo__caption">
              SERVICE SETTINGS <span>LIVE</span>
            </div>
            <div class="component-demo__surface component-demo__surface--switch">
              <div>
                <strong>Payments API</strong>
                <span>Accepting traffic</span>
              </div>
              <KInputSwitch
                v-model="serviceEnabled"
                label="Enabled"
              />
            </div>
            <div class="component-demo__status">
              <span>Current state</span>
              <KBadge :appearance="serviceEnabled ? 'success' : 'neutral'">
                {{ serviceEnabled ? 'Active' : 'Paused' }}
              </KBadge>
            </div>
          </div>
        </article>

        <article class="component-row">
          <div class="component-row__copy">
            <span class="component-row__index">02 / EXPLORE</span>
            <h3>Change the view.</h3>
            <p>Let people move between useful perspectives without losing their place.</p>
            <div class="component-row__links">
              <a href="/components/segmented-control">KSegmentedControl</a>
            </div>
          </div>
          <div class="component-row__demo component-row__demo--segment">
            <div class="component-demo__caption">
              API ANALYTICS <span>LAST 24 HOURS</span>
            </div>
            <div class="component-demo__surface component-demo__surface--segment">
              <KSegmentedControl
                v-model="selectedMetric"
                :options="metricOptions"
              />
              <div class="component-demo__metric">
                <span>{{ currentMetric.label }}</span>
                <strong>{{ currentMetric.value }}</strong>
                <small>{{ currentMetric.description }}</small>
              </div>
            </div>
          </div>
        </article>

        <article class="component-row">
          <div class="component-row__copy">
            <span class="component-row__index">03 / RESPOND</span>
            <h3>Make feedback useful.</h3>
            <p>Show what happened and what the person needs to know next.</p>
            <div class="component-row__links">
              <a href="/components/alert">KAlert</a>
            </div>
          </div>
          <div class="component-row__demo component-row__demo--alert">
            <div class="component-demo__caption">
              DEPLOYMENT <span>JUST NOW</span>
            </div>
            <KAlert
              appearance="success"
              message="The new configuration is live across your service."
              title="Configuration published"
            />
          </div>
        </article>
      </div>
    </section>

    <section
      aria-labelledby="ai-title"
      class="home-section home-section--ai"
    >
      <div class="ai-section__copy">
        <p class="section-kicker">
          02 / AI + MCP
        </p>
        <h2 id="ai-title">
          Your agent can read<br>the design system.
        </h2>
        <p>Connect the local Kongponents MCP server to give your coding agent the component docs, props, source, and styles for the version installed in your project.</p>
        <KButton
          appearance="primary"
          size="large"
          to="/guide/mcp-server"
        >
          Set up MCP
        </KButton>
        <span class="ai-section__note">Local stdio server · Node.js 20+</span>
      </div>
      <div
        aria-label="Kongponents MCP setup and tools"
        class="ai-terminal"
      >
        <div class="ai-terminal__bar">
          <span><i /> KONGPONENTS MCP</span><span>LOCAL</span>
        </div>
        <div class="ai-terminal__body">
          <p class="ai-terminal__comment">
            # Run from your project
          </p>
          <code><span>$</span> pnpm exec kongponents-mcp</code>
          <div class="ai-terminal__divider" />
          <p class="ai-terminal__label">
            WHAT YOUR AGENT CAN ACCESS
          </p>
          <div class="ai-terminal__tool">
            <span>01</span><strong>Find the right component</strong><code>list_components</code>
          </div>
          <div class="ai-terminal__tool">
            <span>02</span><strong>Check props and examples</strong><code>get_component_docs</code>
          </div>
          <div class="ai-terminal__tool">
            <span>03</span><strong>Read component source</strong><code>get_component_source_code</code>
          </div>
          <div class="ai-terminal__tool">
            <span>04</span><strong>Check source styles</strong><code>get_component_source_styles</code>
          </div>
        </div>
        <a href="/guide/mcp-server#available-tools">See all MCP tools</a>
      </div>
    </section>

    <section
      aria-labelledby="start-title"
      class="home-section home-section--start"
    >
      <div>
        <p class="section-kicker">
          03 / GET MOVING
        </p><h2 id="start-title">
          From idea to interface<br><span>in a few lines.</span>
        </h2><p>Install the library, choose your theme, and start building with components made for real products.</p><a
          class="section-link"
          href="/guide/quick-start"
        >Read the getting started guide</a>
      </div><div class="install-panel">
        <div class="install-panel__bar">
          <span>TERMINAL</span><span>01 — INSTALL</span>
        </div><code><span>$</span> pnpm add @kong/kongponents</code><div class="install-panel__footer">
          <span class="install-panel__pulse" /> Ready for your next project
        </div>
      </div>
    </section>

    <section
      aria-labelledby="changelog-title"
      class="home-section home-section--changelog"
    >
      <div class="section-heading">
        <div>
          <p class="section-kicker">
            04 / WHAT'S NEW
          </p><h2 id="changelog-title">
            Always moving forward.
          </h2>
        </div><a
          class="section-link"
          href="/changelog"
        >Browse changelog</a>
      </div><div class="release-row">
        <span class="release-row__badge">LATEST RELEASE</span><div><strong>v9.66.0</strong><p>New MCP server support and continued improvements to the library.</p></div><span class="release-row__date">16 OCT 2026</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const workspaceName = ref('My API workspace')
const savedWorkspaceName = ref('')
const workspaceSaved = ref(false)
const motionReady = ref(false)
const serviceEnabled = ref(true)
const metricOptions = [
  { label: 'Traffic', value: 'traffic' },
  { label: 'Errors', value: 'errors' },
  { label: 'Latency', value: 'latency' },
]
const metricData: Record<string, { label: string, value: string, description: string }> = {
  traffic: { label: 'Traffic', value: '24.8M', description: 'requests served' },
  errors: { label: 'Errors', value: '0.02%', description: 'error rate' },
  latency: { label: 'Latency', value: '18ms', description: 'median response time' },
}
const selectedMetric = ref('traffic')
const currentMetric = computed(() => metricData[selectedMetric.value] ?? metricData.traffic)
let revealObserver: IntersectionObserver | undefined

watch(workspaceName, () => {
  workspaceSaved.value = false
})

function saveWorkspace(): void {
  const name = workspaceName.value.trim()
  if (!name) return
  savedWorkspaceName.value = name
  workspaceSaved.value = true
}

onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08 })

  document.querySelectorAll('.home-page .home-section').forEach((section) => revealObserver?.observe(section))
  motionReady.value = true
})

onUnmounted(() => revealObserver?.disconnect())
</script>
