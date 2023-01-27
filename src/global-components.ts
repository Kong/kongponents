import type * as components from './components'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    KClipboardProvider: typeof components.KClipboardProvider
    KComponent: typeof components.KComponent
    Komponent: typeof components.Komponent
    KToggle: typeof components.KToggle
    KAlert: typeof components.KAlert
    KBadge: typeof components.KBadge
    KBreadcrumbs: typeof components.KBreadcrumbs
    Krumbs: typeof components.Krumbs
    KButton: typeof components.KButton
    KCard: typeof components.KCard
    KCatalog: typeof components.KCatalog
    KCatalogItem: typeof components.KCatalogItem
    KCheckbox: typeof components.KCheckbox
    KCodeBlock: typeof components.KCodeBlock
    KCollapse: typeof components.KCollapse
    KDateTimePicker: typeof components.KDateTimePicker
    KDropdownMenu: typeof components.KDropdownMenu
    KDropdownItem: typeof components.KDropdownItem
    KEmptyState: typeof components.KEmptyState
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
    KPagination: typeof components.KPagination
    KPop: typeof components.KPop
    KPrompt: typeof components.KPrompt
    KRadio: typeof components.KRadio
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
    ToastManager: typeof components.ToastManager
    KTooltip: typeof components.KTooltip
    Kooltip: typeof components.Kooltip
    KTreeList: typeof components.KTreeList
    KViewSwitcher: typeof components.KViewSwitcher
  }
}
