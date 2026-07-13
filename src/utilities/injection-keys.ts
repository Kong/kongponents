import type { ComputedRef, InjectionKey } from 'vue'

/**
 * Provided by container components (KModal, KSlideout) with their `zIndex` so a nested KPop can
 * elevate its popover above them. Necessary because a teleported popover leaves the parent's DOM
 * subtree, so it can't be raised via CSS — but `provide`/`inject` follows the component tree
 * (unaffected by `<Teleport>`), letting KPop resolve a z-index above its logical parent.
 */
export const POPOVER_PARENT_ZINDEX_KEY: InjectionKey<ComputedRef<number>> = Symbol('popover-parent-zindex')
