# Migrating to version `9`

This guide is primarily for users of Kongponents `v8` who want to browse the breaking changes they may encounter when upgrading to Kongponents `v9`.

This is not something you have to read from top to bottom before trying out the new version.

If you notice any breaking changes we missed, we invite you to [open an issue](https://github.com/Kong/kongponents/issues).

## General Breaking Changes

### Styles

Kongponents styles are no longer designed to be utilized standalone, separately from the Vue components. Any standalone imports of the exported styles or Sass variables and/or mixins are no longer supported.

## Breaking Component Changes

### KAlert

#### Props

#### Slots

#### Events

#### Structure

#### Constants, Types & Interfaces

* `appearances` const is no longer exported by the KAlert component. Instead, you can import `AlertAppearances` from `@kong/kongponents` directly.

### KBadge

#### Props

* `appearance` prop no longer accepts `default` and `custom` values (defaults to `info` now)
* `isBordered` prop has been removed
* `shape` prop has been removed (now KBadge only comes in one what used to be `rectangular` shape)
* `borderColor` prop has been removed
* `backgroundColor` prop has beed removed
* `color` prop has been removed
* `dismissable` prop has been removed. You can now pass a clickable close icon (remember to add `role="button"` and `tabindex="0"` attributes) through the `icon` slot and handle KBadge showing/hiding from your host app
* `hoverColor` prop has been removed
* `truncationTooltip` prop has been changed to `boolean`. When used in conjunction with new `tooltip` prop, KBadge will only show the tooltip when content passed through the `default` slot needs truncation. Otherwise, if `tooltip` prop is used without `truncationTooltip` prop - tooltip will be shown regardless of whether truncation is needed
* `forceTooltip` prop has been removed

#### Structure

* dynamic `k-badge-*` classes have been removed
* `k-badge-text` class has been changed to `badge-content-wrapper`
* KIcon element that previously contained class `k-badge-dismiss-button` has been removed 

#### Constants, Types & Interfaces

* `BadgeAppearances` const no longer contains `default` and `custom` values
* `BadgeAppearance` type no longer contains `default` and `custom` values
* `BadgeShapes` const has been removed
* `BadgeShape` type has been removed
* `BadgeShapeRecord` type has been removed

#### Events

* `dismissed` even has been removed

### KBreadcrumbs

### KButton

#### Props

* some values `appearance` prop accepts were changed:
  * `outline` has been removed (we suggest using `secondary` instead)
  * `creation` has been removed (we suggest using `primary` instead)
  * `btn-link` is no longer accepted (we suggest using `tertiary` instead)
  * `btn-link-danger` has been removed
  * `action-active` has been removed
* `showCaret` prop is removed
* `caretColor` prop is removed
* `isRounded` prop is removed
* `icon` prop has changed to boolean (TODO: [beta])

#### Slots

* `icon` slot is removed (TODO: [beta])

#### Structure

* `icon-btn` class has been renamed to `icon-button`

#### Constants, Types & Interfaces

* `appearances` and `sizes` constants are no longer exported by the KButton component. Instead, you can import `ButtonAppearances` and `ButtonSizes` from `@kong/kongponents` directly

### KCard

#### Props

* `testMode` prop has been removed
* `body` prop has been removed. Use `default` slot instead
* `borderVariant` prop has been removed. KCard has a border by default
* `hasHover` prop has been removed
* `hasShadow` prop has been removed. KCard does not have a box-shadow by default
* `status` prop has been removed

#### Slots

* `statusHat` slot has been removed
* `body` slot has been removed. Use the `default` slot instead
* `notifications` slot has been removed

#### Structure

* `kong-card` class has been changed to `k-card`
* `hover` class has been removed
* `kcard-shadow` class has been removed
* `k-card-header` class has been changed to `card-header`
* `has-status` class has been removed
* `k-card-status-hat` class has been removed
* `k-card-title` class has been changed to `card-title`
* `k-card-actions` class has been changed to `card-actions`
* `k-card-content` class has been changed to `card-content`
* `k-card-body` class has been removed
* `k-card-notifications` class has been removed

#### Constants, Types & Interfaces

* `BorderVariantsArray` constant has been removed
* `BorderVariant` type has been removed

### KCatalog


### KCheckbox

#### Props

* `testMode` prop has been removed
* `help` property of `labelAttributes` prop has been deprecated in favor of `info`

#### Structure

* `k-input` class has been changed to `checkbox-input`
* `k-checkbox-label` class has been changed to `checkbox-label`
* `k-checkbox-description` class has been changed to `checkbox-description`
* `has-desc` class has been been changed to `has-description`

### KCodeBlock

#### Props

* New `maxHeight` prop to control the `max-height` of the code block. Defaults to `none`

#### Slots

#### Events

#### Structure

#### Constants, Types & Interfaces

### KCollapse


### KDateTimePicker

#### Props

* `v-model` Single date and time picker's seed value (string in ISO date format) has been changed to a `TimeRange` object whose `start` value will be set to a Date ISO string; `end` value will be set to `null`.

  See KDateTimePickers's [v-model](/components/datetime-picker#v-model) for more details

#### Events

* `change`, `update:modelValue` – a Single date and time picker will no longer emit an ISO date format string. Instead, a `TimeRange` object with a Date ISO string `start` value, and a null `end` value will be emitted.
  
  See KDateTimePickers's [Single date time picker events](/components/datetime-picker#single-date-time-picker) for more details

#### Constants, Types & Interfaces

* `TimeRange` - `start` and `end` keys are now defined as `Date | null`

### KDropdownMenu

Component has been renamed to `KDropdown`

#### Props

* `label` prop has been deprecated in favor of the new `triggerText` prop (usage is the same)
* `appearance` prop has been changed in favor of the `selectionMenu` prop for the selection menu functionality. `appearance` now controls the underlying `KButton` `appearance` prop (note that default `appearance` for component when `selectionMenu` is `true` changed from `tertiary` to `primary`)
* `buttonAppearance` prop has been removed in favor of `appearance`, still controlling the `KButton` `appearance` prop
* `testMode` prop has been removed
* `icon` prop is removed (TODO: [beta])
* `caretColor` prop is removed
* `isDangerous` `KDropdownItem` prop has been deprecated in favor of `danger`

#### Structure

* `k-dropdown-menu` class has been removed (`k-dropdown` class remains)
* `k-dropdown-menu-popover` `testid` data attribute has been renamed to `k-dropdown-popover`
* `k-dropdown-trigger` class has been removed
* `k-dropdown-trigger` `testid` data attribute has been renamed to `dropdown-trigger`
* `k-dropdown-btn` class has been renamed to `dropdown-trigger-button`
* `k-dropdown-btn` `testid` data attribute has been renamed to `dropdown-trigger-button`
* `k-dropdown-list` class has been removed
* `k-dropdown-list` `testid` data attribute has been renamed to `dropdown-list`
* `k-dropdown-selected-option` class has been renamed to `dropdown-selected-option`
* `k-dropdown-item-trigger` class has been renamed to `dropdown-item-trigger`
* `k-dropdown-item-trigger-label` class has been renamed to `dropdown-item-trigger-label`
* dynamic `k-dropdown-item` `testid` data attribute has been renamed to `dropdown-item`

#### Constants, Types & Interfaces

* `AppearanceArray` const has been removed
* `Appearance` type has been removed

### KEmptyState


### KExternalLink


### KFileUpload


### KIcon


### KInlineEdit


### KInput

#### Props

* `overlayLabel` prop has been removed
* `size` prop has been removed (KInput only comes in 1 size now)
* `iconPosition` prop has been removed
* `testMode` prop has been removed
* `help` property of `labelAttributes` prop has been deprecated in favor of `info`
* `hasError` prop has been deprecated in favor of `error`

#### Slots

* `icon` slot has been removed. Instead, you can use new `before` and/or `after` slots to provide icons on the left/right, inside the input

#### Events

* `icon:click` event has been removed. Instead, when using `before` and/or `after` slots, you can provide your custom click handlers bound to clicks on slotted content. See KInput's [slots](/components/input#after) for more details

#### Structure

* `form-control` class has been removed
* `over-char-limit` class has been removed
* `help` class has been changed to `help-text`

#### Constants, Types & Interfaces

* `SizeArray` and `IconPositionArray` constants have been removed
* `Size` and `IconPosition` types have been removed

### KInputSwitch

#### Props

* `labelPosition` prop has been removed. Please use `labelBefore` prop instead
* `enabledIcon` prop has been removed

#### Structure

* `k-switch` class has been removed
* `switch-with-icon` class has been removed
* `has-label-right` and `has-label-left` classes were removed

### KLabel

#### Props

* `help` prop has been deprecated in favor of `info`
* `testMode` prop has been removed

#### Structure

* `k-input-label` class has been renamed to `k-label`
* `is-required` class has been renamed to `required`

### KMenu

### KMethodBadge

This component has been removed. Please refer to KBadge component which has been updated to support method appearances.

#### Constants, Types & Interfaces

* `MethodShape`, `Method` and `MethodBadgeColors` types have been removed
* `MethodsArray` const has been removed

### KModal

#### Props

* New `maxWidth` prop to control the `max-width` of the modal. Defaults to `500px`

#### Slots

#### Events

#### Structure

#### Constants, Types & Interfaces


### KModalFullscreen


### KMultiselect


### KPagination


### KPopover


### KPrompt

#### Props

* New `maxHeight` prop to control the `max-height` of the prompt. Defaults to `400px`

#### Slots

#### Events

#### Constants, Types & Interfaces

### Komponent

Removed as of `v9`. Use `KComponent` instead.

### Kooltip

Removed as of `v9`. Use `KTooltip` instead.

### KRadio

#### Props

* `testMode` prop has been removed
* `type` prop has been deprecated in favor of `card` prop
* `help` property of `labelAttributes` prop has been deprecated in favor of `info`

#### Structure

* `k-input` class on the `input[type="radio"]` has been changed to `radio-input`
* `k-radio-default` class has been removed
* `k-radio-card` class has been changed to `radio-card`
* `k-radio-label` class has been changed to `radio-label`. If you were using `k-radio-label` to leverage preconfigured KRadio styles we suggest passing the label content through the `label` prop
* `k-radio-description` class has been changed to `radio-description`. If you were using `k-radio-description` to leverage preconfigured KRadio styles we suggest passing the label content through the `description` prop

### Krumbs

Removed as of `v9`. Use `KBreadcumbs` instead.

### KSegmentedControl


### KSelect


### KSkeleton


### KSlideout


### KStepper


### KTable


### KTabs

#### Props

* `hasPanels` prop has been renamed to `hidePanels`. the default value for this prop has also been changed to `false`

#### Events

* `changed` event has been rename to `change`

### KTextArea

#### Props

* `testMode` prop is removed
* `isResizable` prop is deprecated in favor of `resizable` prop
* `hasError` prop is deprecated in favor of `error` prop
* `cols` prop has been removed (use CSS to control the width of the textarea)
* `disableCharacterLimit` prop has been removed. You can pass a boolean `false` to `characterLimit` prop to disable character limit

#### Structure

* `k-input-wrapper` class has been changed to `k-textarea`
* `has-error` class has been changed to `input-error`
* `k-input` class has been changed to `input-textarea`
* `form-control` class has been removed
* `is-resizable` class has been changed to `resizable`

### KToaster


### KTooltip


### KTree List


### KTruncate


### KView Switcher

<style lang="scss" scoped>
  // Add a border above component headings
  h4 + h3,
  p + h3,
  ul + h3 {
    position: relative;

    &:before {
      content: '';
      top: -10px;
      width: 100%;
      height: 1px;
      background: var(--vp-c-divider);
      position: absolute;
    }
}
</style>
