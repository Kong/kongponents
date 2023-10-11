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


### KEmptyState


### KExternalLink


### KFileUpload


### KIcon


### KInlineEdit


### KInput

#### Structure

* `form-control` class has been removed
* `over-char-limit` class has been removed
* `has-error` class has been removed
* `help` class has been changed to `help-text`
* `input-error` class has been changed to `has-error`

#### Constants, Types & Interfaces

* `SizeArray` and `IconPositionArray` constants have been removed
* `Size` and `IconPosition` types have been removed

#### Props

* `overlayLabel` prop has been removed
* `size` prop has been removed (KInput only comes in 1 size now)
* `iconPosition` prop has been removed
* `testMode` prop has been removed

#### Slots

* `icon` slot has been removed. Instead, you can use new `before` and `after` slots

### KInputSwitch


### KLabel


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

### Krumbs

Removed as of `v9`. Use `KBreadcumbs` instead.


### KSegmentedControl


### KSelect


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

