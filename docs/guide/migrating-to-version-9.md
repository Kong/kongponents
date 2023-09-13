# Migrating to version `9`

This guide is primarily for users of Kongponents `v8` who want to browse the breaking changes they may encounter when upgrading to Kongponents `v9`.

This is not something you have to read from top to bottom before trying out the new version.

If you notice any breaking changes we missed, we invite you to [open an issue](https://github.com/Kong/kongponents/issues).

## General Breaking Changes

### Styles

Kongponents styles are no longer designed to be utilized standalone, separately from the Vue components. Any standalone imports of the exported styles or Sass variables and/or mixins are no longer supported.

## Breaking Component Changes

### KAlert


### KBadge


### KBreadcrumbs


### KButton


### KCard


### KCatalog


### KCheckbox


### KCodeBlock

- Added new `maxHeight` prop to control the `max-height` of the code block


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


### KModalFullscreen


### KMultiselect


### KPagination


### KPopover


### KPrompt


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

