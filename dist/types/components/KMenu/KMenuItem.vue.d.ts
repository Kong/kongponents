import { PropType } from 'vue';
export interface MenuItem {
    title: string;
    description?: string;
}
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<MenuItem>;
        default: null;
    };
    expandable: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    lastMenuItem: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    isOpen: import("vue").Ref<boolean>;
    menuItemId: import("vue").ComputedRef<string>;
    toggleMenuItem: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "clicked"[], "clicked", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<MenuItem>;
        default: null;
    };
    expandable: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    lastMenuItem: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClicked?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    item: MenuItem;
    testMode: boolean;
    expandable: boolean;
    lastMenuItem: boolean;
}>;
export default _default;
