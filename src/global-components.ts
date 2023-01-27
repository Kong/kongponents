import type * as components from './components'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    KAlert: typeof components.KAlert
    KBadge: typeof components.KBadge
    KBreadcrumbs: typeof components.KBreadcrumbs
    KButton: typeof components.KButton
    KCard: typeof components.KCard
    KCatalog: typeof components.KCatalog
    KCatalogItem: typeof components.KCatalogItem
    KCheckbox: typeof components.KCheckbox
    KClipboardProvider: typeof components.KClipboardProvider
    KCodeBlock: typeof components.KCodeBlock
    KCollapse: typeof components.KCollapse
    KComponent: typeof components.KComponent
    KDateTimePicker: typeof components.KDateTimePicker
    KDropdownItem: typeof components.KDropdownItem
    KDropdownMenu: typeof components.KDropdownMenu
    KEmptyState: typeof components.KEmptyState
    KExternalLink: typeof components.KExternalLink
    KFileUpload: typeof components.KFileUpload
    KIcon: typeof components.KIcon
    KInlineEdit: typeof components.KInlineEdit
    KInput: typeof components.KInput
    KInputSwitch: typeof components.KInputSwitch
    KLabel: typeof components.KLabel
    KMenu: typeof components.KMenu
    KMenuItem: typeof components.KMenuItem
    KModal: typeof components.KModal
    KModalFullscreen: typeof components.KModalFullscreen
    KMultiselect: typeof components.KMultiselect
    Komponent: typeof components.Komponent
    Kooltip: typeof components.Kooltip
    KPagination: typeof components.KPagination
    KPop: typeof components.KPop
    KPrompt: typeof components.KPrompt
    KRadio: typeof components.KRadio
    Krumbs: typeof components.Krumbs
    KSegmentedControl: typeof components.KSegmentedControl
    KSelect: typeof components.KSelect
    KSkeleton: typeof components.KSkeleton
    KSkeletonBox: typeof components.KSkeletonBox
    KSlideout: typeof components.KSlideout
    KStepper: typeof components.KStepper
    KTable: typeof components.KTable
    KTabs: typeof components.KTabs
    KTextArea: typeof components.KTextArea
    KToaster: typeof components.KToaster
    KToggle: typeof components.KToggle
    KTooltip: typeof components.KTooltip
    KTreeList: typeof components.KTreeList
    KViewSwitcher: typeof components.KViewSwitcher
    ToastManager: typeof components.ToastManager
  }
}
