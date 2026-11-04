<template>
  <div class="badge-appearance-catalog">
    <section
      v-for="group in groups"
      :key="group.title"
      class="badge-appearance-catalog__group"
    >
      <div class="badge-appearance-catalog__heading">
        <h4>{{ group.title }}</h4>
        <p>{{ group.description }}</p>
      </div>
      <ul class="badge-appearance-catalog__list">
        <li
          v-for="entry in group.entries"
          :key="entry.value"
          class="badge-appearance-catalog__item"
        >
          <KBadge :appearance="entry.value">
            {{ entry.label }}
          </KBadge>
          <code>{{ entry.value }}</code>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import KBadge from '../../../../src/components/KBadge/KBadge.vue'
import type { BadgeAppearance } from '../../../../src/types/badge'

interface AppearanceEntry {
  value: BadgeAppearance
  label: string
}

interface AppearanceGroup {
  title: string
  description: string
  entries: AppearanceEntry[]
}

const groups: AppearanceGroup[] = [
  {
    title: 'Standard',
    description: 'General labels and feedback.',
    entries: [
      { value: 'info', label: 'Info (default)' },
      { value: 'success', label: 'Success' },
      { value: 'warning', label: 'Warning' },
      { value: 'danger', label: 'Danger' },
      { value: 'decorative', label: 'Decorative' },
      { value: 'neutral', label: 'Neutral' },
    ],
  },
  {
    title: 'Methods',
    description: 'HTTP methods and custom operations.',
    entries: [
      { value: 'connect', label: 'Connect' },
      { value: 'custom', label: 'Custom' },
      { value: 'delete', label: 'Delete' },
      { value: 'get', label: 'Get' },
      { value: 'head', label: 'Head' },
      { value: 'options', label: 'Options' },
      { value: 'patch', label: 'Patch' },
      { value: 'post', label: 'Post' },
      { value: 'put', label: 'Put' },
      { value: 'trace', label: 'Trace' },
    ],
  },
  {
    title: 'Status codes',
    description: 'The five HTTP response classes.',
    entries: [
      { value: 'status-1xx', label: '1XX' },
      { value: 'status-2xx', label: '2XX' },
      { value: 'status-3xx', label: '3XX' },
      { value: 'status-4xx', label: '4XX' },
      { value: 'status-5xx', label: '5XX' },
    ],
  },
]
</script>

<style scoped>
.badge-appearance-catalog {
  display: grid;
  gap: 16px;
  margin: 24px 0 28px;
}

.badge-appearance-catalog__group {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 22px;
}

.badge-appearance-catalog__heading {
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  margin-bottom: 18px;
}

.badge-appearance-catalog__heading h4 {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.badge-appearance-catalog__heading p {
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin: 0;
}

.badge-appearance-catalog__list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(142px, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}

.badge-appearance-catalog__item {
  align-items: flex-start;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  margin: 0;
  min-height: 84px;
  padding: 13px 14px;
}

.badge-appearance-catalog__item code {
  background: none;
  color: var(--vp-c-text-2);
  font-size: 12px;
  padding: 0;
}

@media (max-width: 640px) {
  .badge-appearance-catalog__group { padding: 16px; }
}
</style>
