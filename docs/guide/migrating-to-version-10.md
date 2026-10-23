# Migrating to version `10`

This guide is for users of Kongponents `v9` who are upgrading to Kongponents `v10`.

Kongponents `v10` removes every component, prop, slot, type and compatibility shim that was deprecated during the `v9` lifecycle. Most of them already printed a deprecation warning in the browser console, so you can find what needs updating by looking for those warnings while running your app on the latest `v9` release.

If you notice any breaking changes we missed, we invite you to [open an issue](https://github.com/Kong/kongponents/issues).

## Removed Components

### KTable

KTable has been removed. Use [KTableData](/components/table-data) instead, or [KTableView](/components/table-view) if you fetch data yourself.

The `TableHeader` interface has been removed as well. Use `TableDataHeader` (or `TableViewHeader`) instead.

### KModalFullscreen

KModalFullscreen has been removed. Use [KModal](/components/modal) instead.

### KDropdownMenu

The `KDropdownMenu` alias has been removed. Use [KDropdown](/components/dropdown) instead.

```html
<!-- Before -->
<KDropdownMenu trigger-text="Actions" :items="items" />

<!-- After -->
<KDropdown trigger-text="Actions" :items="items" />
```

## Breaking Component Changes

### KButton

#### Slots

* `icon` slot has been removed. Place the icon in the `default` slot, and set the `icon` prop if the button only contains an icon

```html
<!-- Before -->
<KButton>
  <template #icon>
    <AddIcon />
  </template>
</KButton>

<!-- After -->
<KButton icon>
  <AddIcon />
</KButton>
```

#### Props

* `icon` prop only accepts a boolean. String values (a `v8` leftover) no longer print a warning
* An invalid `appearance` value falls back to `primary`. The invalid value is no longer added to the element as an extra class

### KDropdown

#### Props

* `label` prop has been removed. Use `triggerText` instead
* Passing the legacy `menu` or `selectionMenu` values to `appearance` no longer prints a warning. Use the `selectionMenu` boolean prop instead

#### Constants, Types & Interfaces

* `label` has been removed from the `DropdownProps` interface

### KDropdownItem

#### Props

* `isDangerous` prop has been removed. Use `danger` instead

### KInput

#### Props

* `hasError` prop has been removed. Use `error` instead
* `labelAttributes.help` has been removed. Use `labelAttributes.info` instead (see [KLabel](#klabel))

### KTextArea

#### Props

* `hasError` prop has been removed. Use `error` instead
* `isResizable` prop has been removed. Use `resizable` instead
* `labelAttributes.help` has been removed. Use `labelAttributes.info` instead (see [KLabel](#klabel))

#### Constants, Types & Interfaces

* `TextAreaLimitExceed` type has been removed. Use `LimitExceededData` instead

### KLabel

#### Props

* `help` prop has been removed. Use `info` instead

```html
<!-- Before -->
<KLabel help="Helpful information">Label</KLabel>
<KInput label="Label" :label-attributes="{ help: 'Helpful information' }" />

<!-- After -->
<KLabel info="Helpful information">Label</KLabel>
<KInput label="Label" :label-attributes="{ info: 'Helpful information' }" />
```

This applies everywhere `labelAttributes` is accepted, including KInput, KTextArea, KCheckbox, KRadio, KSelect and KMultiselect.

#### Constants, Types & Interfaces

* `help` has been removed from the `LabelProps` interface and the `LabelAttributes` type

### KRadio

#### Props

* `type` prop has been removed. Use the `card` boolean prop instead

```html
<!-- Before -->
<KRadio v-model="value" type="card" selected-value="a" label="Option A" />

<!-- After -->
<KRadio v-model="value" card selected-value="a" label="Option A" />
```

#### Constants, Types & Interfaces

* `RadioTypes` type and `RadioTypesArray` const have been removed

### KTooltip

#### Props

* `label` prop has been removed. Use `text` instead

#### Constants, Types & Interfaces

* `label` has been removed from the `TooltipAttributes` type

### KPop

#### Props

* `placement` no longer converts camelCase values. Use the kebab-case values listed in [`PopPlacementsArray`](/components/popover#placement) (e.g. `top-start` instead of `topStart`)

#### Constants, Types & Interfaces

* `Placement` and `PopPlacements` types have been removed. Use `PopPlacement` instead

### KTabs

#### Props

* `anchorTabindex` prop has been removed. Tab buttons always have `tabindex="0"` (`-1` when the tab is disabled). Use the tab's `to` property for links instead of slotting anchors

### KToaster

#### Props

* `zIndex` prop has been removed from KToaster. It was already ignored. Set the z-index through `ToasterOptions` when you create the `ToastManager`: `new ToastManager({ zIndex: 10001 })`

### KSelect

#### Props

* `dropdownFooterTextPosition` prop has been removed. Use `dropdownFooterPosition` instead
* The `group` property on items has been removed. Use `SelectGroup` entries instead. Groups now render in the order you provide them, not alphabetically. Items that still have a `group` property render as ungrouped items

```ts
// Before
const items: SelectItem[] = [
  { label: 'Salmon', value: 'salmon', group: 'Fish' },
  { label: 'Duck', value: 'duck', group: 'Birds' },
]

// After
const items: SelectEntry[] = [
  { label: 'Birds', items: [{ label: 'Duck', value: 'duck' }] },
  { label: 'Fish', items: [{ label: 'Salmon', value: 'salmon' }] },
]
```

#### Slots

* `dropdown-footer-text` slot has been removed. Use the `dropdown-footer` slot instead

#### Constants, Types & Interfaces

* `SelectDropdownFooterTextPosition` type has been removed. Use `SelectDropdownFooterPosition` instead
* `SelectItemWithGroup` interface has been removed
* `group` has been removed from the `SelectItem` interface

### KMultiselect

#### Props

* `dropdownFooterTextPosition` prop has been removed. Use `dropdownFooterPosition` instead
* The `group` property on items has been removed. Use `MultiselectGroup` entries instead (see [KSelect](#kselect) for an example)

#### Slots

* `dropdown-footer-text` slot has been removed. Use the `dropdown-footer` slot instead

#### Constants, Types & Interfaces

* `DropdownFooterTextPosition` type has been removed. Use `DropdownFooterPosition` instead
* `group` has been removed from the `MultiselectItem` interface

### KDateTimePicker

#### Constants, Types & Interfaces

* `TimepickerMode` type and const have been removed. Use `DateTimePickerModes` (enum) or `DateTimePickerMode` (string union) instead
* `Mode` type has been removed. Use `DateTimePickerMode` instead
* `CSSProperties` interface has been removed. Use `import type { CSSProperties } from 'vue'` instead

## Nuxt Module

`KTable`, `KModalFullscreen` and `KDropdownMenu` were never auto-imported by the Nuxt module. They have been removed from its exclude list. If your Nuxt config lists them in `exclude`, remove them from that list.
