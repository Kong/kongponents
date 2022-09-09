declare const _default: import("vue").DefineComponent<{
    /**
     * Sets whether or not toggle is checked
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
        required: true;
    };
    /**
     * Overrides default on/off label text
     */
    label: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Should the switch be positioned to the left or right of the label
     */
    labelPosition: {
        type: StringConstructor;
        default: string;
        validator: (position: string) => boolean;
    };
    /**
     * Tooltip text to be displayed if the switch is disabled
     */
    disabledTooltipText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Sets whether or not to display a check icon if the switch is enabled
     */
    enabledIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    toggleText: import("vue").ComputedRef<string>;
    handleChange: (e: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "change" | "update:modelValue")[], "input" | "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Sets whether or not toggle is checked
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
        required: true;
    };
    /**
     * Overrides default on/off label text
     */
    label: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Should the switch be positioned to the left or right of the label
     */
    labelPosition: {
        type: StringConstructor;
        default: string;
        validator: (position: string) => boolean;
    };
    /**
     * Tooltip text to be displayed if the switch is disabled
     */
    disabledTooltipText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Sets whether or not to display a check icon if the switch is enabled
     */
    enabledIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    labelPosition: string;
    disabledTooltipText: string;
    enabledIcon: boolean;
}>;
export default _default;
