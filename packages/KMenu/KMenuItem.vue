<template>
  <li
    :key="item.key"
    :data-testid="`k-menu-item-${item.value}`"
  >
    <div
      class="menu-title"
      @click="isOpen = !isOpen">
      <span class="span-menu-title">
        <slot name="menu-title"> {{ item.title }}
        </slot>
      </span>
      <span class="icon-container">
        <KIcon
          v-if="!expandable"
          :icon="isOpen ? 'chevronUp' : 'chevronDown'"
          color="#B6B6BD"
          size="16"
        />
      </span>
    </div>
    <div
      :class="isOpen ? 'd-block' : 'd-none'"
      class="menu-content">
      <slot name="menu-content"> {{ item.content }}</slot>
    </div>

  </li>
</template>

<script>
import KMenuDivider from './KMenuDivider.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KMenuItem',
  components: { KMenuDivider, KIcon },
  props: {
    item: {
      type: Object,
      default: null
    },
    expandable: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

li {
  margin: 0;
  // padding: 20px 7px 16px 24px;
  white-space: nowrap;
  font-family: Maison Neue;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #6F7787;

  &:last-child div {
    border-bottom: none;
  }
}

.menu-title {
  border-bottom: none;
  position: relative;
  height: 20px;
  padding: 8px 0;
  text-align: center;
  padding-bottom: 8px;
}

.menu-title::after {
  content: " ";
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-56%);
  bottom: 0;
  width: 90%;
  height: 1px;
  background-color: #E7E7EC;
}

.menu-title {
  width: 100%;
  display: flex;
}

.icon-container {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 23px;
  height: 24px;
  width: 24px;
}
</style>
