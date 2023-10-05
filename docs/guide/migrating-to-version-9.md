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
  * `outline` is no longer supported (we suggest using `secondary` instead)
  * `creation` is no longer supported
  * `btn-link` is no longer accepted (we suggest using `tertiary` instead)
  * `btn-link-danger` is no longer supported
  * `action-active` is no longer supported
* `showCaret` prop is removed
* `caretColor` prop is removed
* `isRounded` prop is removed
* `icon` prop is removed (TODO: [beta])

#### Slots

* `icon` slot is removed (TODO: [beta])

#### Events

No changes.

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

* `form-control` class is gone

#### Constants, Types & Interfaces

* `SizeArray` and `IconPositionArray` constants are no longer exported
* `Size` and `IconPosition` types are no longer exported

#### Props

* `overlayLabel` prop is no longer supported
* `size` prop is no longer supported
* `iconPosition` prop is no longer supported

#### Slots

* `icon` slot is no longer supported. Instead, you can use new `before` and `after` slots

#### Events

No changes.

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

