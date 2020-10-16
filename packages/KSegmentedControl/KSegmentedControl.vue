<template>
  <div class="segmented-control d-flex" >
    <KButton
      v-for="item in options"
      :key="label(item)"
      :name="value(item)"
      :disabled="disabled(item)"
      :appearance="appearance(item)"
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
      return this.selected === this.value(item) ? 'primary' : 'outline-primary'
    },
    disabled (item) {
      return item.disabled || this.isDisabled
    }
  }
}
</script>
<style scoped>
.segmented-control .k-button {
  border-radius: 0;
  flex: 1;
  margin-left: -1px;
  color: var(--blue-600);
  --KButtonPrimaryBase: var(--blue-100);
  --KButtonPrimaryHover: var(--blue-100);
}
.segmented-control .k-button.primary {
  z-index: 1;
  border-color: var(--blue-600);
}
.segmented-control .k-button:hover {
  z-index: 2;
  border-color: var(--blue-600);
}.segmented-control .k-button:active {
  z-index: 2;
  border-color: var(--blue-600);
}
.segmented-control .k-button:focus {
  z-index: 3;
  border-color: var(--blue-600);
  box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--blue-600);
}
.segmented-control .k-button:first-child {
  border-radius: 3px 0 0 3px;
  margin-left: 0;
}
.segmented-control .k-button:last-child {
  border-radius: 0 3px 3px 0;
}
.segmented-control .k-button:only-child {
  border-radius: 3px;
  margin-left: 0;
}
</style>
