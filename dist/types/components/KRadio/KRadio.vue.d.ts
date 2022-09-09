declare const _default: import("vue").DefineComponent<{
    /**
     * Sets whether or not radio is selected
     */
    modelValue: {
        type: (ObjectConstructor | StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: string;
        required: true;
    };
    /**
     * The value emitted from the radio on change if selected
     */
    selectedValue: {
        type: (ObjectConstructor | StringConstructor | BooleanConstructor | NumberConstructor)[];
        required: true;
    };
}, {
    isSelected: import("vue").ComputedRef<boolean>;
    handleClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Sets whether or not radio is selected
     */
    modelValue: {
        type: (ObjectConstructor | StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: string;
        required: true;
    };
    /**
     * The value emitted from the radio on change if selected
     */
    selectedValue: {
        type: (ObjectConstructor | StringConstructor | BooleanConstructor | NumberConstructor)[];
        required: true;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string | number | boolean | Record<string, any>;
}>;
export default _default;
