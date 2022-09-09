declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Overlay the label on the input's border
     */
    overlayLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    help: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    hasError: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorMessage: {
        type: StringConstructor;
        default: string;
    };
    characterLimit: {
        type: NumberConstructor;
        default: null;
        validator: (limit: number) => boolean;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    currValue: import("vue").Ref<string>;
    modelValueChanged: import("vue").Ref<boolean>;
    isFocused: import("vue").Ref<boolean>;
    isHovered: import("vue").Ref<boolean>;
    isDisabled: import("vue").ComputedRef<boolean>;
    isReadonly: import("vue").ComputedRef<boolean>;
    inputId: import("vue").ComputedRef<string>;
    charLimitExceeded: import("vue").ComputedRef<boolean>;
    charLimitExceededError: import("vue").ComputedRef<string>;
    modifiedAttrs: import("vue").ComputedRef<{
        [x: string]: unknown;
    }>;
    handleInput: ($event: any) => void;
    getValue: () => string | number;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "update:modelValue" | "char-limit-exceeded")[], "input" | "update:modelValue" | "char-limit-exceeded", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Overlay the label on the input's border
     */
    overlayLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    help: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    hasError: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorMessage: {
        type: StringConstructor;
        default: string;
    };
    characterLimit: {
        type: NumberConstructor;
        default: null;
        validator: (limit: number) => boolean;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onInput?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onChar-limit-exceeded"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    size: string;
    help: string;
    testMode: boolean;
    modelValue: string | number;
    overlayLabel: boolean;
    labelAttributes: Record<string, any>;
    hasError: boolean;
    errorMessage: string;
    characterLimit: number;
}>;
export default _default;
