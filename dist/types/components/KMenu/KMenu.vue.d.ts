import { PropType } from 'vue';
import type { MenuItem } from './KMenuItem.vue';
export interface KMenuItemType extends MenuItem {
    expandable: boolean;
    type: 'string' | 'number' | 'divider';
}
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<KMenuItemType[]>;
        required: false;
        default: () => never[];
    };
    actionButton: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    widthStyle: import("vue").ComputedRef<Record<string, string>>;
    hasActionButton: import("vue").ComputedRef<boolean>;
    proceed: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "proceed"[], "proceed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<KMenuItemType[]>;
        required: false;
        default: () => never[];
    };
    actionButton: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onProceed?: ((...args: any[]) => any) | undefined;
}, {
    width: string;
    testMode: boolean;
    items: KMenuItemType[];
    actionButton: string;
}>;
export default _default;
