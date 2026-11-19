<template>
  <a
    class="github-stars"
    href="https://github.com/Kong/kongponents"
    rel="noopener noreferrer"
    target="_blank"
    :title="count === null ? 'Kongponents on GitHub' : `${formattedCount} GitHub stars`"
  >
    <svg
      aria-hidden="true"
      class="github-stars__mark"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.1c-3.22.7-3.9-1.37-3.9-1.37-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.27-1.29-5.27-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.4-2.7 5.39-5.28 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.2.67.79.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
    <svg
      aria-hidden="true"
      class="github-stars__star"
      fill="none"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m12 2.5 2.9 6 6.6 1-4.75 4.65 1.12 6.6L12 17.65l-5.87 3.1 1.12-6.6L2.5 9.5l6.6-1Z" />
    </svg>
    <span
      aria-live="polite"
      class="github-stars__count"
    >{{ formattedCount }}</span>
    <span class="visually-hidden">GitHub stars for Kongponents</span>
  </a>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const CACHE_KEY = 'kongponents-github-stars'
const CACHE_AGE = 60 * 60 * 1000
const count = ref<number | null>(null)
const formattedCount = computed(() => count.value === null ? '—' : new Intl.NumberFormat('en-US').format(count.value))

onMounted(async () => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (typeof cached?.count === 'number') count.value = cached.count
    if (typeof cached?.timestamp === 'number' && Date.now() - cached.timestamp < CACHE_AGE) return
  } catch {
    // An unavailable cache should not prevent a fresh request.
  }

  try {
    const response = await fetch('https://api.github.com/repos/Kong/kongponents', {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!response.ok) return

    const repository = await response.json()
    if (typeof repository.stargazers_count !== 'number') return

    count.value = repository.stargazers_count
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ count: count.value, timestamp: Date.now() }))
    } catch {
      // The current count still appears when storage is unavailable.
    }
  } catch {
    // Retain the cached count if the network is unavailable.
  }
})
</script>

<style scoped>
.github-stars {
  align-items: center;
  color: var(--vp-c-text-1);
  display: none;
  gap: 7px;
  height: 36px;
  margin-left: 9px;
  text-decoration: none;
  white-space: nowrap;
}

.github-stars:hover { color: var(--vp-c-brand-1); }

.github-stars__mark { height: 20px; width: 20px; }

.github-stars__star { height: 14px; margin-left: 3px; width: 14px; }

.github-stars__count { font-size: 12px; font-variant-numeric: tabular-nums; font-weight: 650; min-width: 2ch; }

.visually-hidden { clip: rect(0, 0, 0, 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px; }

@media (min-width: 1280px) {
  .github-stars { display: inline-flex; }
}
</style>
