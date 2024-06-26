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

* `alertMessage` prop has been changed to `message`
* `isShowing` prop has been removed. You can use Vue native `v-if` binging to control whether alert is shown or hidden
* `type` prop has been removed. KAlert only comes in form of themed-color (defined by `appearance` prop) container
* `dismissType` prop has been removed. KAlert can only be dismissed by clicking on close icon text to title, which is either hidden or visible depending on value of new `dismissible` prop
* `size` prop has been removed
* `icon, iconSize, iconColor` props has been removed. You can use `icon` slot to override default icon
* `description` prop has been removed
* `isBordered, hasTopBorder, hasRightBorder, hasBottomBorder, hasLeftBorder` props has been removed. KAlert does not have a border by default
* `isFixed` prop has been removed

#### Slots

* `alertMessage` slot has been removed. You can use the `default` slot to pass alert message content
* `title` slot has been removed
* `description` slot has been removed
* `actionButtons` slot has been removed

#### Events

* `closed` event has been renamed to `dismiss`
* `proceed` event has been been removed

#### Structure

* `k-alert-icon-container` class has been replaced with `alert-icon-container`
* `k-alert-msg-text` class has been replaced with `alert-content`
* `k-alert-title` class has been replaced with `alert-title`
* `k-alert-msg` class has been replaced with `alert-message`

#### Constants, Types & Interfaces

* `AlertSize` type has been removed
* `AlertType` type has been removed
* `AlertDismissType` type has been removed
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
* `hidden` prop has been removed

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

#### Props

* `emphasis` prop has been removed

#### Structure

* `k-breadcrumbs-item` class has been replaced with `breadcrumbs-item-container`
* `k-breadcrumb-icon-wrapper` class has been replaced with `breadcrumbs-icon-container`
* `k-breadcrumb-text` class has been replaced with `breadcrumbs-text`
* `k-breadcrumb-divider` class has been replaced with `kbreadcrumbs-divider`

#### Constants, Types & Interfaces

* `icon` property has been removed from `BreadcrumbItem` interface

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
* `icon` prop has changed to `boolean`. Use it when only content you're passing to KButton is an icon to make KButton square

#### Slots

* `icon` slot has been deprecated. Please use `default` slot instead

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

#### Props

* `isLoading` prop has been removed and replaced with `loading` prop
* `noTruncation` prop has been removed and replaced with `truncateDescription` prop
* `emptyStateActionButtonIcon` prop has been removed. You can use the new `empty-state-action-icon` slot instead
* `emptyStateIcon` prop has been removed. You can use the new `emptyStateIconVariant` prop instead
* `hasError` prop has been removed and replaced with `error` prop
* `emptyStateIconColor` prop has been removed
* `emptyStateIconSize` prop has been removed
* `errorStateIcon` prop has been removed
* `errorStateIconColor` prop has been removed
* `errorStateIconSize` prop has been removed
* `testMode` prop has been removed

#### Slots

* `cardTitle` props has been renamed to `card-title`
  * same change applies to KCatalogItem component
* `cardActions` prop has been renamed to `card-actions`
  * same change applies to KCatalogItem component
* `cardBody` prop has been renamed to `card-body`
  * same change applies to KCatalogItem component

#### Events

* `card:click` event has been renamed to `card-click`
* in KCatalogItem component `card:click` event has been renamed to `click`
* `kcatalog-error-cta-clicked` event has been renamed to `error-action-click`
* `kcatalog-empty-state-cta-clicked` event has been renamed to `empty-state-action-click`

#### Structure

* `k-card-catalog` class has been replaced with `k-catalog`
* `k-card-catalog-title` class has been replaced with `catalog-title`
* `k-catalog-title` `data-testid` property has been replaced with `catalog-title`
* `k-catalog-toolbar` class and `data-testid` attribute has been replaced with `catalog-toolbar`
* `k-skeleton-grid` class has been replaced with `catalog-skeleton-loader`
* `k-catalog-skeleton` `data-testid` attribute has been replaced with `catalog-skeleton-loader`
* `k-catalog-error-state` class has been replaced with `catalog-error-state`
* `k-card-catalog-error-state` `data-testid` attribute has been replaced with `catalog-error-state`
* `k-catalog-empty-state` class has been replaced with `catalog-empty-state`
* `k-card-catalog-empty-state` `data-testid` attribute has been replaced with `catalog-empty-state`
* `k-catalog-page` class has been replaced with `catalog-page`
* `k-card-[small | medium | large]` classes were replaced with `card-[small | medium | large]`
* `k-catalog-pagination` class and `data-testid` attribute has been replaced with `catalog-pagination`
* `k-card-catalog-item` class has been replaced with `k-catalog-item`

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

* new `maxHeight` prop to control the `max-height` of the code block. Defaults to `none`
* `isSearchable` prop has been removed and replaced with `searchable`
* `isProcessing` prop has been removed and replaced with `processing`
* `isSingleLine` prop has been removed and replaced with `singleLine`

#### Structure

* `k-code-block-actions` class has been changed to `code-block-actions`
* `k-code-block-search-results` class has been changed to `code-block-search-results`
* `k-code-block-search-results-has-query` class has been changed to `code-block-search-results-has-query`
* `k-search-container` class has been changed to `search-container`
* `k-search-icon` class has been changed to `code-block-search-icon`
* `k-code-block-search-icon` `data-testid` attribute has been replaced with `code-block-search-icon`
* `k-code-block-search-input` class and `data-testid` attribute has been changed to `code-block-search-input`
* `k-code-block-search-error` class has been changed to `code-block-search-error`
* `k-is-processing-icon` class has been changed to `processing-icon`
* `k-code-block-is-processing-icon` `data-testid` attribute has been replaced with `processing-icon`
* `k-clear-query-button` and `k-clear-icon` classes changed to `clear-query-button`
* `k-code-block-clear-query-button` and `k-code-block-clear-icon` `data-testid` attributes were replaced with `clear-query-button`
* `k-search-actions` class has been changed to `code-block-search-actions`
* `k-regexp-mode-button` class has been changed to `regexp-mode-button`
* `k-code-block-regexp-mode-button` `data-testid` attribute has been replaced with `regexp-mode-button`
* `k-filter-mode-button` class has been changed to `filter-mode-button`
* `k-code-block-filter-mode-button` `data-testid` attribute has been replaced with `filter-mode-button`
* `k-previous-match-button` class has been changed to `previous-match-button`
* `k-code-block-previous-match-button` `data-testid` attribute has been replaced with `previous-match-button`
* `k-next-match-button` class has been changed to `next-match-button`
* `k-code-block-next-match-button` `data-testid` attribute has been replaced with `next-match-button`
* `k-code-block-content` class has been changed to `code-block-content`
* `k-filtered-code-block` class has been changed to `filtered-code-block`
* `k-code-block-filtered-code-block` `data-testid` attribute has been replaced with `filtered-code-block`
* `k-line-number-rows` class has been changed to `line-number-rows`
* `k-line` class has been changed to `line`
* `k-line-anchor` class has been changed to `line-anchor`
* `k-highlighted-code-block` class has been changed to `highlighted-code-block`
* `k-code-block-highlighted-code-block` `data-testid` attribute has been replaced with `highlighted-code-block`
* `is-single-line` class has been changed to `single-line`
* `k-line-number-rows` class has been changed to `line-number-rows`
* `k-line-is-match` class has been changed to `line-is-match`
* `k-line-is-highlighted-match` class has been changed to `line-is-highlighted-match`
* `k-line-anchor` class has been changed to `line-anchor`
* `k-code-block-secondary-actions` class has been changed to `code-block-secondary-actions`
* `k-code-block-copy-button` class and `data-testid` attribute has been changed to `code-block-copy-button`
* `k-matched-term` `class` has been replaced with `matched-term`

### KCollapse

#### Events

* `toggled` event was renamed to `toggle`

#### Structure

* `k-collapse-heading` class has been replaced with `collapse-heading`
* `k-collapse-title` class and `data-testid` attribute has been replaced with `collapse-title`
* `k-collapse-trigger` class has been replaced with `collapse-trigger` 
* `k-collapse-trigger-content` class and `data-testid` attribute has been replaced with `collapse-trigger-content`
* `k-collapse-trigger-label` class and `data-testid` attribute has been replaced with `collapse-trigger-label`
* `k-collapse-trigger-chevron` class has been replaced with `collapse-trigger-icon`
* `k-collapse-trigger-icon` class and `data-testid` attribute has been replaced with `collapse-trigger-icon`
* `k-collapse-visible-content` class and `data-testid` attribute has been replaced with `collapse-visible-content`
* `k-collapse-hidden-content` class and `data-testid` attribute has been replaced with `collapse-hidden-content`

### KDateTimePicker

#### Props

* `v-model` Single date and time picker's seed value (string in ISO date format) has been changed to a `TimeRange` object whose `start` value will be set to a Date ISO string; `end` value will be set to `null`. See KDateTimePickers's [v-model](/components/datetime-picker#v-model) for more details

#### Events

* `change`, `update:modelValue` – a Single date and time picker will no longer emit an ISO date format string. Instead, a `TimeRange` object with a Date ISO string `start` value, and a null `end` value will be emitted. See KDateTimePickers's [Single date time picker events](/components/datetime-picker#single-date-time-picker) for more details

#### Structure

* `timepicker-input` class has been changed to `datetime-picker-trigger`
* `k-datetime-picker-input` `data-testid` attribute has been changed to `datetime-picker-trigger`
* `timepicker-display` class has been changed to `datetime-picker-display`
* `k-datetime-picker-display` `data-testid` attribute has been changed to `datetime-picker-display`
* `k-datetime-picker-toggle` `data-testid` attribute has been changed to `datetime-picker-toggle`
* `k-datetime-picker-clear` `data-testid` attribute has been changed to `datetime-picker-clear`
* `k-datetime-picker-submit` `data-testid` attribute has been changed to `datetime-picker-submit`
* `timeframe-btn` class has been changed to `timeframe-button`
* `action-btn` class has been changed to `action-button`

#### Constants, Types & Interfaces

* `TimeRange` - `start` and `end` keys are now defined as `Date | null`
* `hidePopover` property in `DateTimePickerState` interface has been renamed to `popoverOpen`

### KDropdownMenu

Component has been renamed to `KDropdown`

#### Props

* `label` prop has been deprecated in favor of the new `triggerText` prop (usage is the same)
* `appearance` prop has been changed in favor of the `selectionMenu` prop for the selection menu functionality. `appearance` now controls the underlying `KButton` `appearance` prop (note that default `appearance` for component when `selectionMenu` is `true` changed from `tertiary` to `primary`)
* `buttonAppearance` prop has been removed in favor of `appearance`, still controlling the `KButton` `appearance` prop
* `testMode` prop has been removed
* `icon` prop is removed
* `caretColor` prop is removed
* `isDangerous` `KDropdownItem` prop has been deprecated in favor of `danger`

#### Structure

* `k-dropdown-menu` class has been removed (`k-dropdown` class remains)
* `k-dropdown-menu-popover` `data-testid` attribute has been renamed to `dropdown-popover`
* `k-dropdown-trigger` class has been removed
* `k-dropdown-trigger` `data-testid` attribute has been renamed to `dropdown-trigger`
* `k-dropdown-btn` class has been renamed to `dropdown-trigger-button`
* `k-dropdown-btn` `data-testid` attribute has been renamed to `dropdown-trigger-button`
* `k-dropdown-list` class has been removed
* `k-dropdown-list` `data-testid` attribute has been renamed to `dropdown-list`
* `k-dropdown-selected-option` class has been renamed to `dropdown-selected-option`
* `k-dropdown-item-trigger` class has been renamed to `dropdown-item-trigger`
* `k-dropdown-item-trigger-label` class has been renamed to `dropdown-item-trigger-label`
* dynamic `k-dropdown-item` `data-testid` attribute has been renamed to `dropdown-item`

#### Constants, Types & Interfaces

* `AppearanceArray` const has been removed
* `Appearance` type has been removed

### KEmptyState

#### Props

* `isError` prop has been removed. You can use the new `iconVariant` prop instead. For more details check out component documentation
* `iconSize` prop has been removed
* `icon` prop has been removed and replaced with `iconVariant` prop. You can also use the new `icon` slot to provide your custom icon
* `ctaIsHidden` prop has been removed and replaced with `actionButtonVisible` prop
* `ctaText` prop has been removed and replaced with `actionButtonText` prop
* `handleClick` prop has been removed. You can bind your action button click handler function to new `click-action` event
* `iconColor` prop has been removed
* `iconSecondaryColor` prop has been removed

#### Slots

* `message` slot has been renamed to `default`
* `cta` slot has been renamed to `action`

#### Structure

* `empty-state-wrapper` class has been changed to `k-empty-state`
* `k-empty-state-icon` class has been changed to `empty-state-icon`
* `k-empty-state-title-header` class has been changed to `empty-state-title`
* `k-empty-state-message` class has been changed to `empty-state-message`
* `k-empty-state-cta` class has been changed to `empty-state-action`

### KExternalLink

No breaking changes.

### KFileUpload

#### Props

* `testMode` prop has been removed
* `buttonAppearance` prop has been removed. Default button appearance has been changed to `tertiary`
* `fileModel` prop has been removed
* `removable` prop has been removed. Component allows to clear input by default
* `iconSize` prop has been removed
* `iconColor` prop has been removed
* `icon` prop has been removed
* `hasError` prop has been renamed to `error`
* `type` prop has been removed
* default value for `errorMessage` has been changed to `''`

#### Structure

* `k-file-upload-btn` class has been changed to `file-upload-button`
* `k-file-upload-button` `data-testid` attribute has been changed to `file-upload-button`

#### Constants, Types & Interfaces

* `FileUploadType` type has been removed

### KIcon

This component has been removed.

### KInlineEdit

This component has been removed.

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
* `k-input-wrapper` class has been changed to `k-input`
* `input.k-input` element class has been changed to `.input`

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

#### Constant, Types & Interfaces

* `positionFixed` parameter was removed from `TooltipAttributes` interface

### KMenu

This component has been removed.

### KMethodBadge

This component has been removed. Please refer to KBadge component which has been updated to support method appearances.

#### Constants, Types & Interfaces

* `MethodShape`, `Method` and `MethodBadgeColors` types have been removed
* `MethodsArray` const has been removed

### KModal

#### Props

* new `maxWidth` prop to control the width of the modal. Defaults to `500px`
* `testMode` prop has been removed
* `hideTitle` prop has been removed
* `hideDismissIcon` prop has been removed and replaced with `hideCloseIcon`
* `dismissButtonTheme` prop has been removed
* `textAlign` prop has been removed
* `isVisible` prop has been removed and replaced with `visible` prop
* `content` prop has been removed. You can use the `default` slot instead

#### Slots

* `header-image` slot has been removed. You can use `content` to pass custom content to KModal
* `header-content` slot has been removed
* `body-content` slot had been removed. You can use the `default` slot instead
* `footer-content` slot has been changed to `footer`
* `action-buttons` slot has been changed to `footer-actions`

#### Events

* `canceled` event has been renamed to `cancel`

#### Structure

* `k-modal-backdrop` class has been removed and replaced with `modal-backdrop`
* `k-modal-dialog` class has been removed and replaced with `modal-container`
* `k-modal-content` class has been removed and replaced with `modal-content`
* `k-modal-footer` class has been removed and replaced with `modal-footer`
  
#### Constants, Types & Interfaces

* `DismissButtonThemeArray` const has been removed
* `DismissButtonTheme` type has been removed
* `TextAlignArray` const has been removed
* `TextAlign` type has been removed


### KModalFullscreen

This component is deprecated and will be removed in the next major release.

### KMultiselect

#### Props

* `testMode` prop has been removed
* `filterFunc` prop name has been changed to `filterFunction`
* `disabledTooltipText` property of object passed through `items` prop is no longer supported
* default value of `collapsedContext` prop has changed to `true`
* default value of `selectedRowCount` prop has changed to `1`
* `expandSelected` prop has been removed
* `positionFixed` prop has been removed

#### Events

* `item:added` event was renamed to `item-added`
* `item:removed` event was renamed to `item-removed`

#### Structure

* `k-multiselect-item` class has been changed to `multiselect-item`
* `k-multiselect-item-container` class has been changed to `multiselect-item-container`
* `k-multiselect-item-label` class has been changed to `multiselect-item-label`
* `k-multiselect-group-container` class has been changed to `multiselect-group-container`
* `k-multiselect-group-title` class has been changed to `multiselect-group-title`
* `k-multiselect-label` `data-testid` attribute has been changed to `multiselect-label`
* `k-multiselect-container` `data-testid` attribute has been changed to `multiselect-container`
* `k-multiselect-wrapper` class has been changed to `multiselect-wrapper`
* `k-multiselect-trigger` class and `data-testid` attribute has been changed to `multiselect-trigger`
* `k-multiselect-selections` class and `data-testid` attribute has been changed to `selection-badges-container`
* `k-multiselect-selection-badge` class has been changed to `multiselect-selection-badge`
* `k-multiselect-icon` class has been changed to `multiselect-icons-container`
* `k-multiselect-clear-icon` class and `data-testid` attribute has been changed to `multiselect-clear-icon`
* `k-multiselect-input` class and `data-testid` attribute has been changed to `multiselect-input`
* `k-multiselect-list` class has been changed to `multiselect-list`
* `k-multiselect-new-item` class has been changed to `multiselect-add-item`
* `k-multiselect-empty-item` class and `data-testid` attribute has been changed to `multiselect-empty-item`
* `k-multiselect-dropdown-footer-text` class has been changed to `dropdown-footer`
* `k-multiselect-popover` class has been changed to `multiselect-popover`
* `k-multiselect-chevron-icon` class has been changed to `multiselect-chevron-icon`

#### Constants, Types & Interfaces

* `MultiselectFilterFnParams` interface has been renamed to `MultiselectFilterFunctionParams`

### KPagination

KPagination now uses [KDropdown](/components/dropdown) instead of [KSelect](/components/select) as the underlying component for page size selection.

#### Props

* `testMode` prop has been removed
* `paginationType` prop has been removed. You can use the new `offset` prop instead
* `offsetPrevButtonDisabled` prop has been renamed to `offsetPreviousButtonDisabled`

#### Events

* `pageChanged` event has been renamed to `pageChange`
* `pageSizeChanged` event has been renamed to `pageSizeChange`
* `getPrevOffset` event has been renamed to `getPreviousOffset`

#### Structure

* `card-pagination-bar` has been removed and replaced with `k-pagination`
* `k-pagination-container` has been replaced with `k-pagination`
* `prev-btn` `data-testid` attribute has been changed to `previous-button`
* `*-btn` part in various `data-testid` attributes has been updated to `*-button`

#### Constants, Types & Interfaces

* `PageChangedData` interface has been renamed to `PageChangeData`
* `PageSizeChangedData` interface has been renamed to `PageSizeChangeData`
* `PaginationType` type has been removed

### KPop

#### Props

* `isSvg` prop has been removed
* default value of `buttonText` prop has changed
* `popoverTransitions` prop has been removed
* `testMode` prop has been removed
* `onPopoverClick` prop has been removed. You can a combination of new `closeOnPopoverClick` prop and `popover-click` event instead
* `placement` prop options have changed, see _Constants, Types & Interfaces_ section for more details
* `hidePopover` prop has been removed. Instead, you can use exposed by the component `hidePopover` method
* `target` prop has been removed (popover element is always mounted to `.k-popover` element)
* `positionFixed` prop has been removed (popover element always uses `position: fixed`)

#### Slots

* `actions` slot has been removed

#### Events

* `opened` event has been renamed to `open`
* `closed` event has been renamed to `close`

#### Structure

* `kpop-button` ... has been replaced with `popover-button`
* `k-popover-header` class has been replaced with `popover-header`
* `k-popover-title` class has been replaced with `popover-title`
* `k-popover-content` class has been replaced with `popover-content`
* `k-popover-footer` class has been replaced with `popover-footer`
* `k-popover` class has been replaced with `popover` (instead, `k-popover` class has been given to outer-most element)

#### Constants, Types & Interfaces

* format of most placement options in `PopPlacementsArray` has changed: `topStart` -> `top-start`, `rightEnd` -> `right-end`, etc.
  * same applies to `PopPlacements` type

### KPrompt

#### Props

* `isVisible` prop has been removed and replaced with `visible` prop
* `type` prop has been removed. You can use `actionButtonAppearance` prop to modify appearance of action button instead
* `actionPending` prop has been removed. We suggest using `actionButtonDisabled` prop instead
* `preventProceedOnEnter` prop has been removed
* `tabbableOptions` has been removed. You can use new `modalAttributes` prop to pass value to `tabbableOptions` prop in KModal
  
#### Slots

* `header-content` slot has been removed
* `body-content` slot has been changed to `default`
* `action-buttons` slot has been removed. If you need to slot in custom action buttons, check out KModal component

#### Events

* `canceled` event has been renamed to `cancel`

#### Structure

* `k-prompt-confirm-text` class has been changed to `prompt-confirmation-text`
* `k-prompt-cancel` class has been removed. For testing, use `[data-testid='modal-cancel-button']` instead.
* `k-prompt-proceed` class has been removed. For testing, use `[data-testid='modal-action-button']` instead.

#### Constants, Types & Interfaces

* `PromptVariantsArray` const has been removed
* `PromptVariants` type has been removed

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

#### Props

* `allowPointerEvents` prop has been removed
* `isDisabled` prop has been changed to `disabled`

#### Structure

* `name="option.value"` attribute has been removed and replaced with `data-testid="option.value-option"` attribute

#### Constants, Types & Interfaces

* `value` property in `SegmentedControlOption` type no longer accepts `boolean`

### KSelect

#### Props

* `appearance` prop has been removed. KSelect comes in one appearance (what previously was `select` appearance). If you need an element that behaves like a select but looks like a button, check out KDropdown's [selectionMenu prop](/components/dropdown#selectionmenu)
* `buttonText` prop has been removed
* `testMode` prop has been removed
* `overlayLabel` prop has been removed
* `filterFunc` prop has been renamed to `filterFunction`
* `autosuggest` prop has been removed and replaced with `enableFiltering` prop. Should you want to simply enable default component-handled filtering or perform async fetching behind the scenes, you can use this prop in combination with`@query-change` event to achieve that
* `positionFixed` prop has been removed

#### Events

* `item:added` event has been changed to `item-added`
* `item:removed` event has been changed to `item-removed`
  
#### Structure

* `k-select-input` `data-testid` attribute has been changed to `select-input`
* dynamic `k-select-item-*` `data-testid` attribute has been changed to `select-item-*`
* `k-select-dropdown-footer-text` class has been changed to `dropdown-footer`
* `k-select-item-label` class has been changed to `select-item-label`
* `k-select-item` class has been changed to `select-item`
* `k-select-loading` class has been changed to `select-loading`
* `k-select-loading` `data-testid` attribute has been changed to `select-loading`
* `k-select-group-title` class has been changed to `select-group-title`
* `k-select-selected-item` `data-testid` attribute has been changed to `selected-item`
* `k-select-list` class has been changed to `select-items-container`
* `k-select-label` `data-testid` attribute has been changed to `select-label`
* `k-select-new-item` `data-testid` attribute and class has been changed to `select-add-item`

#### Constants, Types & Interfaces

* `SelectAppearanceArray` const has been removed
* `SelectAppearance` type has been removed
* `SelectFilterFnParams` interface has been renamed to `SelectFilterFunctionParams`

### KSkeleton

#### Props

* `tableColumns` prop default value has changed

#### Structure

* `k-skeleton-container` class has been replaced with `k-skeleton`
* `box` class has been replaced with `skeleton-box`

### KSlideout

#### Props

* `isVisible` prop has been changed to `visible`
* `preventCloseOnBlur` prop has been removed in favor of new `closeOnBlur` prop
* `closeButtonAlignment` prop has been removed

#### Slots

* `before-title` slot has been removed (you can use the newly added `title` slot instead)
* `after-title` slot has been removed (you can use the newly added `title` slot instead)

#### Structure

* `panel` class has been replaced with `slideout-container` class
* `slideout-panel` `data-testid` attribute has been replaced with `slideout-container`
* `k-slideout-header-content` class has been replaced with `slideout-header` class
* `close-button-start` and `close-button-end` `data-testid` attributes have been removed. Use the `slideout-close-icon` `data-testid` attribute instead.
* `k-slideout-main-title` class and `k-slideout-title` class and `data-testid` attribute were been replaced with `slideout-title`
* `content` class has been replaced with `slideout-content` class
* `content-card` class has been removed

### KStepper

#### Structure

* `k-step-container` class has been replaced with `step-container`
* `k-step` class has been replaced with `step`
* `k-step-label` class has been replaced with `step-label`

### KTable

#### Props

* `hasHover` prop has been removed and replaced with `rowHover` prop
* `hasSideBorder` prop has been removed
* `hasError` prop has been removed and replaced with `error` prop
* `isLoading` prop has been removed and replaced with `loading` prop
* `disableSorting` prop has been removed and replaced with `sortable` prop (defaults to `true`)
* `enableClientSort` prop has been removed and replaced with `clientSort` prop
* `sortHandlerFn` prop has been removed and replaced with `sortHandlerFunction` prop
* `emptyStateIcon` prop has been removed. You can use the new `emptyStateIconVariant` prop instead
* `emptyStateIconColor` prop has been removed
* `emptyStateIconSize` prop has been removed
* `emptyStateActionButtonIcon` prop has been removed. You can use the new `empty-state-action-icon` slot instead
* `errorStateIcon` prop has been removed
* `errorStateIconColor` prop has been removed
* `errorStateIconSize` prop has been removed
* `options` prop (deprecated) has been removed
* `sortOrder` prop (deprecated) has been removed
* `testMode` prop has been removed
* `paginationType` prop has been removed. You can use new `paginationOffset` prop instead

#### Events

* `ktable-error-cta-clicked` event has been renamed to `error-action-click`
* `ktable-empty-state-cta-clicked` event has been renamed to `empty-state-action-click`

#### Structure

* `k-table-container` class has been changed to `k-table`
* `k-table-toolbar` class and `data-testid` attribute has been changed to `table-toolbar`
* `k-table-skeleton` `data-testid` attribute has been changed to `table-skeleton`
* `k-table-error-state` class and `data-testid` attribute has been changed to `table-error-state`
* `k-table-empty-state` class and `data-testid` attribute has been changed to `table-empty-state`
* `k-table-wrapper` class has been changed to `table-wrapper`
* `table.k-table` class has been changed to `table`
* `k-table-headers` class has been changed to `table-headers`
* `k-table-header-*` `data-testid` attribute has been changed to `table-header-*`
* `k-table-pagination` class and `data-testid` attribute has been changed to `table-pagination`
* `caret` class has been changed to `sort-icon`

#### Constants, Types & Interfaces

* `useSortHandlerFn` parameter in `TableHeader` interface has been renamed to `useSortHandlerFunction`
* `TableSortOrderArray` const has been removed
* `TableSortOrder` type has been removed
* `TableTestModeArray` const has been removed
* `TableTestMode` type has been removed
* `TablePaginationTypeArray` const has been removed
* `TablePaginationType` type has been removed 

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

#### Structure

* `toaster-container-outer` class has been replaced with `k-toaster`
* `toaster-item` class has been replaced with `toaster`
* `message` and `k-alert-msg` classes has been replaced with `toaster-message`

#### Constants, Types & Interfaces

* `toasterAppearances` constant has been renamed to `ToasterAppearances`
* `Toast` interface changes:
  * `title` property has been added
  * `message` property became optional
  * `appearances` property is no longer an instance of `AlertAppearance` type - instead it is an instance of new `ToasterAppearance` type

### KTooltip

#### Props

* `testMode` prop has been removed
* `label` prop has been deprecated in favor of `text` prop
* `positionFixed` prop has been removed

#### Structure

* `k-tooltip-top` class has been changed to `tooltip-top`
* `k-tooltip-right` class has been changed to `tooltip-right`
* `k-tooltip-bottom` class has been changed to `tooltip-bottom`
* `k-tooltip-left` class has been changed to `tooltip-left`

### KTreeList

#### Props

* `icon` property has been removed from `items` prop. You can use the `item-icon` slot to provide your custom icon or use new `hideIcons` prop to hide the icon

#### Constants, Types & Interfaces

* `icon` property has been removed from `TreeListItem` interface

#### Structure

* `k-tree-draggable` class has been changed to `tree-draggable`
* `k-tree-item-container` class has been changed to `tree-item-container`
* `k-tree-list-grabbing` class has been changed to `tree-list-grabbing`
* `k-tree-item-grabbing` class has been changed to `tree-item-grabbing`
* `k-tree-item-dragged` class has been changed to `tree-item-dragged`
* `k-tree-item` class has been changed to `tree-item`
* `k-tree-item-icon` class has been changed to `tree-item-icon`
* `k-tree-item-label` class has been changed to `tree-item-label`

### KTruncate

#### Props

* `isTextContent` prop has been changed to `truncateText`
* `isExpanded` prop has been changed to `expanded`

#### Structure

* `k-truncate-content` class has been changed to `truncate-content`
* `k-truncate-text` class has been changed to `truncate-text`
* `k-truncate-expand-controls` class has been changed to `truncate-expand-controls`
* `k-truncate-container` class has been changed to `truncate-container`
* `k-truncate-collapse-controls` class has been changed to `truncate-collapse-controls`

### KViewSwitcher

This component has been removed.

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
