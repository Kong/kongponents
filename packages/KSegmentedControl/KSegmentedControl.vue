<template>
  <div class="segmented-control d-flex" >
    <KButton
      v-for="item in options"
      :key="label(item)"
      :name="value(item)"
      :disabled="disabled(item)"
      :appearance="appearance(item)"
      size="small"
      class="justify-content-center"
      v-on="listeners"
    >
      {{ label(item) }}
    </KButton>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'

export default {
  name: 'KSegmentedControl',
  components: { KButton },
  model: {
    prop: 'selected',
    event: 'click'
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: {
      type: [String, Number, Boolean],
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedValue: this.selected
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        click: e => {
          this.$emit('click', e.target.name)
        }
      }
    }
  },
  methods: {
    label (item) {
      return item.label || item
    },
    value (item) {
      return item.value || item
    },
    appearance (item) {
      return this.selected === this.value(item) ? 'primary' : 'outline'
    },
    disabled (item) {
      return item.disabled || this.isDisabled
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.segmented-control .k-button {
  --KButtonPrimaryBase: var(--blue-100);
  --KButtonPrimaryHover: var(--blue-100);

  color: var(--KSegementedControlPrimary, var(--blue-500, color(blue-500)));
  border-radius: 0;
  margin-left: -1px;
  flex: 1;

  &.primary {
    z-index: 1;
    border-color: var(--blue-500);
  }
  &:hover {
    z-index: 2;
  }
  &:active {
    z-index: 2;
  }
  &:focus {
    z-index: 3;
    box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--blue-500);
  }
  &:first-child {
    border-radius: 3px 0 0 3px;
    margin-left: 0;
  }
  &:last-child {
    border-radius: 0 3px 3px 0;
  }
  &:only-child {
    border-radius: 3px;
    margin-left: 0;
  }
  &:disabled {
    border-color: var(--grey-500);
  }
}
</style>
