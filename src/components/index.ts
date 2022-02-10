// Export all components
// NOTE: The 'create-kongponent' CLI automatically appends exports to the bottom of the list

// Renderless
export { default as KComponent } from './KComponent'
export { default as Komponent } from './KComponent' // Komponent alias (backwards-compatible with console warning)
export { default as KToggle } from './KToggle'
// Regular Kongponents (ensure you import from '*.vue`)
export { default as KIcon } from './KIcon/KIcon.vue'
export { default as KButton } from './KButton/KButton.vue'
export { default as KCard } from './KCard/KCard.vue'
export { default as KAlert } from './KAlert/KAlert.vue'
export { default as KModal } from './KModal/KModal.vue'
export { default as KPop } from './KPop/KPop.vue'
export { default as KInput } from './KInput/KInput.vue'
export { default as KLabel } from './KLabel/KLabel.vue'
export { default as KTooltip } from './KTooltip/KTooltip.vue'
export { default as Kooltip } from './Kooltip' // KTooltip alias (backwards-compatible with console warning)
export { default as KBreadcrumbs } from './KBreadcrumbs/KBreadcrumbs.vue'
export { default as Krumbs } from './Krumbs' // KBreadcrumbs alias (backwards-compatible with console warning)
export { default as KBadge } from './KBadge/KBadge.vue'
export { default as KClipboardProvider } from './KClipboardProvider'
export { default as KToaster } from './KToaster/KToaster.vue'
