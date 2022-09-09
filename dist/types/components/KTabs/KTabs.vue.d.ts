import { PropType } from 'vue';
export interface Tab {
    hash: string;
    title: string;
}
declare const _default: import("vue").DefineComponent<{
    /**
     * Array of Tab objects [{hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2'}]
     */
    tabs: {
        type: PropType<Tab[]>;
        required: true;
    };
    /**
     * A set tab hash to use as default
     */
    modelValue: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}, {
    activeTab: import("vue").Ref<string>;
    handleTabChange: (tab: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "changed"[], "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Array of Tab objects [{hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2'}]
     */
    tabs: {
        type: PropType<Tab[]>;
        required: true;
    };
    /**
     * A set tab hash to use as default
     */
    modelValue: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}>> & {
    onChanged?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
}>;
export default _default;
