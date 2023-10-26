# Migrating to version `9`

This guide is primarily for users of Kongponents `v8` who want to browse the breaking changes they may encounter when upgrading to Kongponents `v9`.

This is not something you have to read from top to bottom before trying out the new version.

If you notice any breaking changes we missed, we invite you to [open an issue](https://github.com/Kong/kongponents/issues).

## General Breaking Changes

### Styles

Kongponents styles are no longer designed to be utilized standalone, separately from the Vue components. Any standalone imports of the exported styles or Sass variables and/or mixins are no longer supported.

## Breaking Component Changes

### KAlert

#### Structure

#### Constants, Types & Interfaces

* `appearances` const is no longer exported by the KAlert component. Instead, you can import `AlertAppearances` from `@kong/kongponents` directly.

#### Props

#### Slots

#### Events

### KBadge

#### Structure

#### Constants, Types & Interfaces

#### Props

#### Slots

### KBreadcrumbs


### KButton

#### Structure

* `icon-btn` class has been renamed to `icon-button`

#### Constants, Types & Interfaces

* `appearances` and `sizes` constants are no longer exported by the KButton component. Instead, you can import `ButtonAppearances` and `ButtonSizes` from `@kong/kongponents` directly

#### Props

* some values `appearance` prop accepts were changed:
  * `outline` has been removed (we suggest using `secondary` instead)
  * `creation` has been removed
  * `btn-link` is no longer accepted (we suggest using `tertiary` instead)
  * `btn-link-danger` has been removed
  * `action-active` has been removed
* `showCaret` prop is removed
* `caretColor` prop is removed
* `isRounded` prop is removed
* `icon` prop is removed (TODO: [beta])

#### Slots

* `icon` slot is removed (TODO: [beta])

### KCard


### KCatalog


### KCheckbox


### KCodeBlock

#### Structure

#### Constants, Types & Interfaces

#### Props

* New `maxHeight` prop to control the `max-height` of the code block. Defaults to `none`

#### Slots

#### Events


### KCollapse


### KDateTimePicker


### KDropdownMenu

Component has been renamed to `KDropdown`

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

#### Props

* `label` prop has been deprecated in favor of the new `trigger-text` prop (usage is the same)
* `appearance` prop has been changed in favor of the `selectionMenu` prop for the selection menu functionality. `appearance` now controls the underlying `KButton` `appearance` prop (note that default `appearance` for component when `selectionMenu` is `true` changed from `tertiary` to `primary`)
* `buttonAppearance` prop has been removed in favor of `appearance`, still controlling the `KButton` `appearance` prop
* `testMode` prop has been removed
* `icon` prop is removed (TODO: [beta])
* `caretColor` prop is removed
* `isDangerous` `KDropdownItem` prop has been deprecated in favor of `danger`

#### Slots

#### Events

### KEmptyState


### KExternalLink


### KFileUpload


### KIcon


### KInlineEdit


### KInput

#### Structure

* `form-control` class has been removed
* `over-char-limit` class has been removed
* `help` class has been changed to `help-text`

#### Constants, Types & Interfaces

* `SizeArray` and `IconPositionArray` constants have been removed
* `Size` and `IconPosition` types have been removed
* `help` property was removed from `LabelAttributes` interface (TODO: after KLabel is reskinned)

#### Props

* `overlayLabel` prop has been removed
* `size` prop has been removed (KInput only comes in 1 size now)
* `iconPosition` prop has been removed
* `testMode` prop has been removed
* `help` property was removed from `labelAttributes` prop (TODO: after KLabel is reskinned)
* `hasError` prop has been deprecated in favor of `error`

#### Slots

* `icon` slot has been removed. Instead, you can use new `before` and/or `after` slots to provide icons on the left/right, inside the input.

#### Events

* `icon:click` event has been removed. Instead, when using `before` and/or `after` slots, you can provide your custom click handlers bound to clicks on slotted content. See KInput's [slots](/components/input#after) for more details.

### KInputSwitch


### KLabel

#### Structure

* `k-input-label` class has been renamed to `k-label`

#### Constants, Types & Interfaces

#### Props

* `help` prop has been removed
* `testMode` prop has been removed

### KMenu


### KMethod Badge


### KModal

#### Structure

#### Constants, Types & Interfaces

#### Props

* New `maxWidth` prop to control the `max-width` of the modal. Defaults to `500px`

#### Slots

#### Events


### KModalFullscreen


### KMultiselect


### KPagination


### KPopover


### KPrompt

#### Constants, Types & Interfaces

#### Props

* New `maxHeight` prop to control the `max-height` of the prompt. Defaults to `400px`

#### Slots

#### Events



### Komponent

Removed as of `v9`. Use `KComponent` instead.

### Kooltip

Removed as of `v9`. Use `KTooltip` instead.

### KRadio

#### Structure

* `k-input` class on the `input[type="radio"]` has been changed to `radio-input`
* `k-radio-default` class has been removed
* `k-radio-card` class has been changed to `radio-card`
* `k-radio-label` class has been changed to `radio-label`
* `k-radio-description` class has been changed to `radio-description`

#### Constants, Types & Interfaces

#### Props

* `testMode` prop has been removed
* `type` prop has been deprecated in favor of `card` prop

#### Slots

#### Events

### Krumbs

Removed as of `v9`. Use `KBreadcumbs` instead.


### KSegmentedControl


### KSelect

#### Structure


#### Constants, Types & Interfaces


#### Props

* `testMode` prop has been removed

#### Slots


#### Events


### KSkeleton


### KSlideout


### KStepper


### KTable


### KTabs


### KTextarea


### KToaster


### KTooltip


### KTree List


### KTruncate


### KView Switcher

