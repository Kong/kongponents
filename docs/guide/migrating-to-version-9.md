# Migrating to version `9`

This guide is primarily for users of Kongponents `v8` who want to browse the breaking changes they may encounter when upgrading to Kongponents `v9`.

This is not something you have to read from top to bottom before trying out the new version.

If you notice any breaking changes we missed, we invite you to [open an issue](https://github.com/Kong/kongponents/issues).

## General Breaking Changes

### Styles

Kongponents styles are no longer designed to be utilized standalone, separately from the Vue components. Any standalone imports of the exported styles or Sass variables and/or mixins are no longer supported.

## Breaking Component Changes

### KAlert

#### Constants, Types & Interfaces

* `appearances` const is no longer exported by the KAlert component. Instead, you can import `AlertAppearances` from `@kong/kongponents` directly.


### KBadge


### KBreadcrumbs


### KButton

#### Structure

* `icon-btn` class has been renamed to `icon-button`

#### Constants, Types & Interfaces

* `appearances` and `sizes` constants are no longer exported by the KButton component. Instead, you can import `ButtonAppearances` and `ButtonSizes` from `@kong/kongponents` directly

#### Props

* `showCaret` prop is removed
* `caretColor` prop is removed
* `isRounded` prop is removed
* `icon` prop is removed

#### Slots

* `icon` slot is removed (instead, you can use the new `before` and `after` slots)

#### Events

No changes.

### KCard


### KCatalog


### KCheckbox


### KCodeBlock

- Added new `maxHeight` prop to control the `max-height` of the code block. Defaults to `none`.


### KCollapse


### KDateTimePicker


### KDropdownMenu


### KEmptyState


### KExternalLink


### KFileUpload


### KIcon


### KInlineEdit


### KInput


### KInputSwitch


### KLabel


### KMenu


### KMethod Badge


### KModal

- Added new `maxWidth` prop to control the `max-width` of the modal. Defaults to `500px`.


### KModalFullscreen


### KMultiselect


### KPagination


### KPopover


### KPrompt

- Added new `maxHeight` prop to control the `max-height` of the prompt. Defaults to `400px`.


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

