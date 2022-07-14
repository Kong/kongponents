<template>
  <div
    :style="widthStyle"
    class="k-select"
  >
    <KLabel
      v-if="label"
      :for="selectId"
      v-bind="labelAttributes"
      data-testid="k-select-label"
    >
      {{ label }}
    </KLabel>
    <div
      :id="selectId"
      data-testid="k-select-selected-item"
    >
      <div
        v-if="selectedItem && appearance === 'dropdown'"
        class="k-select-item-selection px-3 py-1"
      >
        <div
          class="selected-item-label"
        >
          {{ selectedItem.label }}
        </div>
        <button
          class="clear-selection-icon cursor-pointer non-visual-button"
          @click="clearSelection"
          @keyup.enter="clearSelection"
        >
          <KIcon
            color="var(--blue-200)"
            icon="clear"
          />
        </button>
      </div>
      <KToggle v-slot="{ toggle, isToggled }">
        <KPop
          v-bind="boundKPopAttributes"
          :on-popover-click="() => {
            toggle()
            return isToggled.value
          }"
          :position-fixed="positionFixed"
          :test-mode="testMode"
          :target="`[id='${selectInputId}']`"
          @opened="() => {
            filterStr = ''
            toggle()
          }"
          @closed="() => {
            if (selectedItem && appearance === 'select') {
              filterStr = selectedItem.label
            }
            if (isToggled.value) {
              toggle()
            }
          }"
        >
          <div
            v-if="appearance === 'button'"
            :id="selectInputId"
            class="k-select-button"
            data-testid="k-select-input"
            style="position: relative;"
            role="listbox"
          >
            <KButton
              :id="selectTextId"
              :style="widthStyle"
              :is-open="isToggled.value"
              :is-rounded="false"
              v-bind="$attrs"
              appearance="btn-link"
              @keyup="evt => triggerFocus(evt, isToggled)"
            >
              {{ selectButtonText }}
            </KButton>
          </div>
          <div
            v-else
            :id="selectInputId"
            :class="{ 'k-select-input': appearance === 'select'}"
            data-testid="k-select-input"
            style="position: relative;"
            role="listbox"
          >
            <KIcon
              v-if="appearance === 'select'"
              icon="chevronDown"
              color="var(--grey-500)"
              size="15"
            />
            <KInput
              :id="selectTextId"
              v-bind="$attrs"
              v-model="filterStr"
              :is-open="isToggled.value"
              :placeholder="placeholderText"
              class="k-select-input"
              autocomplete="off"
              autocapitalize="off"
              @keyup="evt => triggerFocus(evt, isToggled)"
            />
          </div>
          <template #content>
            <ul class="k-select-list ma-0 pa-0">
              <slot
                :items="items"
                :is-open="isToggled.value"
                name="items"
              >
                <KSelectItem
                  v-for="item in filteredItems"
                  :key="item.key"
                  :item="item"
                  @selected="handleItemSelect"
                >
                  <template #content>
                    <slot
                      :item="item"
                      name="item-template"
                    />
                  </template>
                </KSelectItem>
                <KSelectItem
                  v-if="!filteredItems.length"
                  key="k-select-empty-state"
                  :item="{ label: 'No results', value: 'no_results' }"
                  class="k-select-empty-item"
                />
              </slot>
            </ul>
          </template>
        </KPop>
      </KToggle>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, onBeforeMount, onMounted, PropType } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'

const defaultKPopAttributes = {
  popoverClasses: 'k-select-popover mt-0',
  popoverTimeout: 0,
  placement: 'bottomStart',
  hideCaret: true,
}

export interface SelectItem {
  label: string
  value: string | number
  key?: string
  selected?: boolean
}

export interface SelectFilterFnParams {
  items: SelectItem[]
  query: string
}

export default defineComponent({
  name: 'KSelect',
  components: {
    KButton,
    KIcon,
    KInput,
    KLabel,
    KPop,
    KSelectItem,
    KToggle,
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    kpopAttributes: {
      type: Object,
      default: () => ({
        popoverClasses: '',
      }),
    },
    label: {
      type: String,
      default: '',
    },
    labelAttributes: {
      type: Object,
      default: () => ({}),
    },
    /**
     * The width of the select and popover's min-width
     */
    width: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * The display style, can be either dropdown, select, or button
     */
    appearance: {
      type: String,
      default: 'dropdown',
      validator: (value: string) => ['dropdown', 'select', 'button'].includes(value),
    },
    /**
     * Override the text displayed on the button if `appearance` is `button` after an item
     * has been selected. By default display the selected item's label
     */
    buttonText: {
      type: String,
      default: '',
    },
    /**
     * Items are JSON objects with required 'label' and 'value'
     * {
     *  label: 'Item 1',
     *  value: 'item1'
     * }
     */
    items: {
      type: Array as PropType<SelectItem[]>,
      required: false,
      default: () => [],
      // Items must have a label & value
      validator: (items: SelectItem[]) => !items.length || items.some(i => !!i.label && !!i.value),
    },
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
      type: Boolean,
      default: true,
    },
    /**
     * Override default filter functionality of case-insensitive search on label
     */
    filterFunc: {
      type: Function,
      default: (params: SelectFilterFnParams) => params.items.filter((item: SelectItem) => item.label.toLowerCase().includes(params.query.toLowerCase())),
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selected', 'input', 'change', 'update:modelValue'],
  setup(props, { attrs, emit }) {
    const filterStr = ref('')
    const selectedItem = ref<SelectItem|null>(null)
    const selectId = computed((): string => props.testMode ? 'test-select-id-1234' : uuidv1())
    const selectInputId = computed((): string => props.testMode ? 'test-select-input-id-1234' : uuidv1())
    const selectTextId = computed((): string => props.testMode ? 'test-select-text-id-1234' : uuidv1())
    const selectItems: Ref<SelectItem[]> = ref([])

    const widthValue = computed(() => {
      let w = ''
      if (!props.width) {
        w = '205'
        if (props.appearance === 'button') {
          w = '230'
        }
      } else {
        w = props.width
      }

      if (w !== 'auto' && !w.endsWith('%') && !w.endsWith('px')) {
        w += 'px'
      }

      return w
    })

    const widthStyle = computed(() => {
      return {
        width: widthValue.value,
      }
    })

    const createKPopAttributes = computed(() => {
      return {
        ...defaultKPopAttributes,
        ...props.kpopAttributes,
        popoverClasses: `${defaultKPopAttributes.popoverClasses} ${props.kpopAttributes.popoverClasses} k-select-pop-${props.appearance}`,
        width: String(inputWidth.value),
        maxWidth: String(inputWidth.value),
        disabled: typeof attrs.disabled === 'boolean' ? attrs.disabled : false,
      }
    })

    // TypeScript complains if I bind the original object
    const boundKPopAttributes = computed(() => ({ ...createKPopAttributes.value }))

    const filteredItems = computed(() => props.filterFunc({ items: selectItems.value, query: filterStr.value }))

    const placeholderText = computed((): string => {
      if (props.placeholder) {
        return props.placeholder
      } else if (attrs.placeholder) {
        return attrs.placeholder as string
      }
      if (props.appearance === 'button') {
        return 'Select an item'
      }
      return 'Filter...'
    })

    const selectButtonText = computed((): string => {
      if (props.buttonText && selectedItem.value) {
        return props.buttonText
      } else if (selectedItem.value) {
        return selectedItem.value.label
      }
      return placeholderText.value
    })

    const handleItemSelect = (item: SelectItem) => {
      selectItems.value.forEach(anItem => {
        if (anItem.key === item.key) {
          anItem.selected = true
          anItem.key += '-selected'
          selectedItem.value = anItem
        } else if (anItem.selected) {
          delete anItem.selected
          anItem.key = anItem?.key?.split('-selected')[0]
        }
      })
      filterStr.value = props.appearance === 'dropdown' ? '' : item.label
      emit('selected', item)
      // this 'input' event must be emitted for v-model binding to work properly
      emit('input', item.value)
      emit('change', item)
      emit('update:modelValue', item.value)
    }

    const clearSelection = (): void => {
      selectItems.value.forEach(anItem => {
        delete anItem.selected
        anItem.key = anItem?.key?.split('-selected')[0]
      })
      selectedItem.value = null
      // this 'input' event must be emitted for v-model binding to work properly
      emit('input', null)
      emit('change', null)
      emit('update:modelValue', null)
    }

    const triggerFocus = (evt: any, isToggled: Ref<boolean>):void => {
      // Ignore `esc` key
      if (evt.keyCode === 27) {
        isToggled.value = false
        return
      }

      const inputElem = document.getElementById(selectTextId.value)
      if (!isToggled.value && inputElem) { // simulate click to trigger dropdown open
        inputElem.click()
      }
    }

    onBeforeMount(() => {
      // items need keys
      selectItems.value = props.items
      for (let i = 0; i < selectItems.value.length; i++) {
        selectItems.value[i].key = `${selectItems.value[i].label.replace(' ', '-')}-${i}`
        if (selectItems.value[i].value === props.modelValue || selectItems.value[i].selected) {
          selectItems.value[i].selected = true
          selectedItem.value = selectItems.value[i]
          selectItems.value[i].key += '-selected'

          if (props.appearance === 'select') {
            filterStr.value = selectedItem.value.label
          }
        }
      }
    })

    const inputWidth = ref(0)
    onMounted(() => {
      const inputElem = document.getElementById(selectInputId.value)

      if (inputElem) {
        inputWidth.value = inputElem.offsetWidth
      }
    })

    return {
      filterStr,
      selectedItem,
      selectId,
      selectInputId,
      selectTextId,
      selectItems,
      boundKPopAttributes,
      widthValue,
      widthStyle,
      filteredItems,
      placeholderText,
      selectButtonText,
      handleItemSelect,
      clearSelection,
      triggerFocus,
      inputWidth,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-select {
  width: fit-content; // necessary for correct placement of popup

  .k-select-item-selection {
    background-color: var(--blue-100);
    color: var(--blue-500);
    font-weight: 400;
    display: flex;
    border-radius: 4px;
    margin-bottom: 6px;

    .selected-item-label {
      align-self: center;
      font-size: var(--type-xs);
      line-height: 16px;
    }

    .clear-selection-icon {
      margin-left: auto;
      margin-top: auto;
      margin-bottom: auto;
      padding: 0;
      height: 24px;

      :deep(.kong-icon) {
        margin-left: auto;
      }
    }
  }

  .k-select-input {
    position: relative;
    display: inline-block;
    width: 100%;

    :deep(input.k-input) {
      padding: var(--spacing-xs);
      height: 100%;
      border-radius: 4px 4px 0 0;
    }

    :deep(.kong-icon) {
      position: absolute;
      top: 60%;
      right: 6px;
      transform: translateY(-50%);
      z-index: 9;
    }
  }

  .k-select-button .has-caret :deep(.kong-icon) {
    margin-left: auto;
  }

  .k-select-button {
    :deep(.k-button.btn-link):hover {
      text-decoration: none;
    }
  }

  :deep(.k-input) {      // need this so input takes the
    width: 100%;  // k-input-wrapper's width which uses this.width prop
  }

  .k-select-trigger:after {
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

  :deep(.k-select-popover) {
    box-sizing: border-box;
    // width: 100%;
    border-radius: 0 0 4px 4px;

    &.k-select-pop-button {
      --KPopPaddingY: var(--spacing-md);
      --KPopPaddingX: var(--spacing-xxs);
      border-radius: 4px;
      border: 1px solid var(--blue-200);
    }

    &.k-select-pop-dropdown {
      --KPopPaddingY: var(--spacing-md);
      --KPopPaddingX: var(--spacing-xxs);
      border: 1px solid var(--blue-200);
    }

    &.k-select-pop-select {
      --KPopPaddingY: var(--spacing-md);
      --KPopPaddingX: var(--spacing-xxs);
      border: 1px solid var(--black-10);
    }

    .k-select-empty-item button,
    .k-select-empty-item button:focus,
    .k-select-empty-item button:hover {
      font-style: italic;
      color: var(--grey-400);
    }

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
}
</style>
