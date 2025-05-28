<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSlider"
  >
    <div class="kslider-sandbox">
      <KSlider
        label="How likely are you to recommend Kong to a friend or a colleague?"
        :marks="[{ label: 'Extremely unlikely', value: 0 }, { label: 'Neither likely nor unlikely', value: 5 }, { label: 'Extremely likely', value: 10 }]"
      />
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
</script>

