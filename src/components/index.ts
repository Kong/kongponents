// Export all components
// NOTE: The 'create-kongponent' CLI automatically appends exports to the bottom of the list

// Renderless
export { default as KClipboardProvider } from './KClipboardProvider'
export { default as KComponent } from './KComponent'
export { default as Komponent } from './KComponent' // Komponent alias (backwards-compatible with console warning)
export { default as KToggle } from './KToggle'

// Regular Kongponents (ensure you import from '*.vue` unless the component is "special" with an index.ts file, etc.)
export { default as KAlert } from './KAlert/KAlert.vue'
export { default as KBadge } from './KBadge/KBadge.vue'
export { default as KBreadcrumbs } from './KBreadcrumbs/KBreadcrumbs.vue'
export { default as Krumbs } from './Krumbs' // KBreadcrumbs alias (backwards-compatible with console warning)
export { default as KButton } from './KButton/KButton.vue'
export { default as KCard } from './KCard/KCard.vue'
export { default as KCatalog } from './KCatalog/KCatalog.vue'
export { default as KCatalogItem } from './KCatalog/KCatalogItem.vue'
export { default as KCheckbox } from './KCheckbox/KCheckbox.vue'
export { default as KDropdownMenu } from './KDropdownMenu/KDropdownMenu.vue'
export { default as KDropdownItem } from './KDropdownMenu/KDropdownItem.vue'
export { default as KEmptyState } from './KEmptyState/KEmptyState.vue'
export { default as KIcon } from './KIcon/KIcon.vue'
export { default as KInlineEdit } from './KInlineEdit/KInlineEdit.vue'
export { default as KInput } from './KInput/KInput.vue'
export { default as KInputSwitch } from './KInputSwitch/KInputSwitch.vue'
export { default as KLabel } from './KLabel/KLabel.vue'
export { default as KMenu } from './KMenu/KMenu.vue'
export { default as KMenuItem } from './KMenu/KMenuItem.vue'
export { default as KModal } from './KModal/KModal.vue'
export { default as KModalFullscreen } from './KModalFullscreen/KModalFullscreen.vue'
export { default as KPagination } from './KPagination/KPagination.vue'
export { default as KPop } from './KPop/KPop.vue'
export { default as KPrompt } from './KPrompt/KPrompt.vue'
export { default as KRadio } from './KRadio/KRadio.vue'
export { default as KSegmentedControl } from './KSegmentedControl/KSegmentedControl.vue'
export { default as KSelect } from './KSelect/KSelect.vue'
export { default as KSkeleton } from './KSkeleton/KSkeleton.vue'
export { default as KSkeletonBox } from './KSkeleton/KSkeletonBox.vue'
export { default as KSlideout } from './KSlideout/KSlideout.vue'
export { default as KTable } from './KTable/KTable.vue'
export { default as KTabs } from './KTabs/KTabs.vue'
export { default as KTextArea } from './KTextArea/KTextArea.vue'
export { default as KToaster } from './KToaster/KToaster.vue'
export { default as ToastManager } from './KToaster/ToastManager'
export { default as KTooltip } from './KTooltip/KTooltip.vue'
export { default as Kooltip } from './Kooltip' // KTooltip alias (backwards-compatible with console warning)
export { default as KViewSwitcher } from './KViewSwitcher/KViewSwitcher.vue'
