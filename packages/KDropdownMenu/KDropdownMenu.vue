<template>
  <div class="k-dropdown">
    <KToggle v-slot="{toggle, isToggled}">
      <KPop
        v-bind="boundKPopAttributes"
        :on-popover-click="() => {
          toggle();
          return isToggled
        }"
        @opened="toggle"
        @closed="toggle"
      >
        <div class="d-flex">
          <component
            :is="!!disabledTooltip ? 'Kooltip' : 'div'"
            :label="disabledTooltip"
            :position="!!disabledTooltip ? 'bottom' : undefined"
            :position-fixed="!!disabledTooltip ? true : undefined"
            :max-width="!!disabledTooltip ? '240' : undefined"
          >
            <slot
              :is-open="isToggled"
              name="default"
            >
              <KButton
                v-if="btnText"
                :disabled="disabled"
                appearance="primary"
                class="k-dropdown-btn"
                @click="toggle"
              >
                {{ btnText }}
              </KButton>
            </slot>
          </component>
        </div>
        <template #content>
          <ul class="k-dropdown-list dropdown-list">
            <slot
              :items="items"
              :is-open="isToggled"
              name="items"
            >
              <KDropdownItem
                v-for="(item, idx) in items"
                :key="`${item.label.replace(' ', '-')}-${idx}`"
                :item="item"
              />
            </slot>
          </ul>
        </template>
      </KPop>
    </KToggle>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import Kooltip from '@kongponents/kooltip/KoolTip.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KToggle from '@kongponents/ktoggle/KToggle'
import KDropdownItem from './KDropdownItem.vue'

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-dropdown-popover mt-1',
  popoverTimeout: 0,
  positionFixed: true
}

export default {
  name: 'KDropdownMenu',
  components: {
    KButton,
    KDropdownItem,
    Kooltip,
    KPop,
    KToggle
  },
  props: {
    btnText: {
      type: String,
      default: ''
    },
    // kpopAttributes is used to pass properties directly to the wrapped KPop component.
    // Commonly-overridden properties include:
    // - width
    // - placement
    // - popoverClasses
    // - target
    kpopAttributes: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledTooltip: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      boundKPopAttributes: {
        ...defaultKPopAttributes,
        ...this.kpopAttributes,
        popoverClasses: `${defaultKPopAttributes.popoverClasses} ${this.kpopAttributes.popoverClasses}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-dropdown {
  .drodpown-trigger:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: var(--spacing-xs, spacing(xs));
    vertical-align: middle;
    content: "";
    border-top: 0.325em solid;
    border-right: 0.325em solid transparent;
    border-left: 0.325em solid transparent;
  }

  .k-dropdown-list.dropdown-list {
    min-width: 148px;
  }
}
</style>

<style lang="scss">
@import '~@kongponents/styles/variables';

.k-popover.k-dropdown-popover {
  --KPopPaddingY: var(--spacing-sm);
  --KPopPaddingX: 0;
  border: 1px solid var(--black-10);

  ul {
    margin: 0;
    padding: 0;
  }

  a {
    flex: 1;
    color: var(--black-70);

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }
}
</style>
