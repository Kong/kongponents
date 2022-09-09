import { PropType } from 'vue';
export interface SegmentedControlOption {
    label?: string;
    value: string | number | boolean;
    disabled?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        required: true;
    };
    options: {
        type: PropType<string[] | SegmentedControlOption[]>;
        required: true;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    selectedValue: import("vue").Ref<string | number | boolean>;
    label: (option: SegmentedControlOption | string) => string | number | boolean | SegmentedControlOption;
    value: (option: SegmentedControlOption | string) => string | number | boolean | SegmentedControlOption;
    appearance: (option: SegmentedControlOption | string) => 'primary' | 'outline';
    disabled: (option: SegmentedControlOption | string) => boolean;
    handleClick: (evt: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        required: true;
    };
    options: {
        type: PropType<string[] | SegmentedControlOption[]>;
        required: true;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    isDisabled: boolean;
}>;
export default _default;
