<template>
  <a
    v-if="href"
    class="k-external-link"
    :href="href"
    rel="noopener"
    target="_blank"
  >
    <slot />
    <KIcon
      v-if="!hideIcon"
      color="var(--blue-500)"
      icon="externalLink"
      size="12"
    />
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
    validator: function(value:string) {
      const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

      return !!urlPattern.test(value)
    },
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-external-link {
  align-items: center;
  color: color(blue-500);
  display: flex;
  font-weight: 400;
  text-decoration: none;

  .kong-icon {
    margin-left: auto;
  }
}
</style>
