<template>
  <div class="empty-state-wrapper">
    <div class="empty-state-title">
      <h5><slot name="title">Empty state title</slot></h5>
    </div>
    <div class="empty-state-content">
      <p><slot name="message">Empty state message</slot></p>
      <p>
        <a :href="cta.url">
          <KButton :class="cta.appearance">
          {{ cta.text }}
          </KButton>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton'

export default {
  name: 'KEmptyState',
  components: { KButton },
  props: {
    cta: {
      type: Object,
      default: () => {
        return {
          url: '',
          text: 'CTA Action',
          appearance: 'primary'
        }
      }
    }
  }
}
</script>

<style scoped>
  .empty-state-wrapper {
    font-family: 'Roboto';
    font-weight: 400;
    text-align: center;
    padding: 2rem 0;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.03);
  }
  .empty-state-wrapper h5 {
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 .5rem;
  }
  .empty-state-wrapper p {
    font-size: 15px;
    line-height: 22px;
    font-weight: 400;
    color: #636c72;
    margin: 0 0 1rem;
  }
</style>
