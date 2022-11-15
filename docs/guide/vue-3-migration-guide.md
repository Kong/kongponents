# Vue 3 Migration Guide

This guide is primarily for users of Kongponents `v6/v7` (for Vue 2) who want to browse the breaking changes they may encounter when upgrading to Kongponents `v8` for Vue 3.

This is not something you have to read from top to bottom before trying out the new version of Kongponents.

## Breaking Changes

If you notice other breaking changes we missed, we invite you to [open an issue](https://github.com/Kong/kongponents/issues).

### KBreadcrumbs

- New component name; previously known as `Krumbs`

### KCheckbox

- `v-model` is now mapped to `modelValue` prop instead of `value` prop
- Emits `input`, `change`, and `update:modelValue` events

### KComponent

- New component name; previously known as `Komponent`

### Krumbs

- Renamed to `KBreadcrumbs`


### KInput

- `v-model` is now mapped to `modelValue` prop instead of `value` prop
- Emits `input` and `update:modelValue` events
- Default font size is now `16px` for accessibility and to prevent page zoom in some browsers
- `.k-input-medium + .has-error` font-size is now `11px`
- `.k-input-small + .has-error` font-size is now `11px`

### KInputSwitch

- `v-model` is now mapped to `modelValue` prop instead of `value` prop
- Emits `input`, `change`, and `update:modelValue` events
- Added the following CSS rule for label alignment
    ```scss
    &.has-label-left {
      margin-right: 0;
      margin-left: 1rem;
    }
    ```

### KMenu

- Added type interface for `items` prop

### KMenuItem

- Added type interface for `items` prop

### Komponent

- Renamed to `KComponent`

### Kooltip

- Renamed to `KTooltip`

### KPagination

- Added new CSS theming variables

    | Variable | Purpose
    |:-------- |:-------
    | `--KPaginationColor`| KPagination button text color
    | `--KPaginationBackgroundColor`| KPagination button background color
    | `--KPaginationBorderColor`| KPagination button border color
    | `--KPaginationPageSizeColor`| KPagination page size button text color
    | `--KPaginationActiveColor`| KPagination active button text color
    | `--KPaginationActiveBackgroundColor`| KPagination active button background color
    | `--KPaginationActiveBorderColor`| KPagination active button border color
    | `--KPaginationDisabledColor`| KPagination disabled button text color

### KPrompt

- Added `autcomplete="off"` and `autocapitalize="off"` to the confirmation text input

### KRadio

- `v-model` is now mapped to `modelValue` prop instead of `value` prop
- `value` prop has been renamed to `selectedValue`
- Emits `change` and `update:modelValue` events

### KSegmentedControl

- `v-model` is now mapped to `modelValue` prop instead of `selected` prop
- Added type interface for `options` prop

### KSelect

- `v-model` is now mapped to `modelValue` prop instead of `value` prop
- Emits `input`, `change`, and `update:modelValue` events
- `positionFixed` now defaults to `true`

### KSkeleton

- Renamed internal component from `Skeleton` to `SkeletonBase`
- `delayMilliseconds` prop now defaults to `0`

### KSlideout

- Changed `isVisible` class to `is-visible`

### KTable

- `fetcher` is now a required prop

### KTabs

- `v-model` is now mapped to `modelValue` prop instead of `value` prop
- Added type interface for `tabs` prop

### KTextArea

- `v-model` is now mapped to `modelValue` prop instead of `value` prop
- Emits `input`, `update:modelValue`, and `char-limit-exceeded` events
- Default font size is now `16px` for accessibility and to prevent page zoom in some browsers

### KTooltip

- New component name; previously known as `Kooltip`
