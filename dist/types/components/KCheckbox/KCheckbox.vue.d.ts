declare const _default: import("vue").DefineComponent<{
    /**
     * Sets whether or not checkbox is checked
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
        required: true;
    };
}, {
    handleChange: (e: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "change" | "update:modelValue")[], "input" | "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Sets whether or not checkbox is checked
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
        required: true;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
