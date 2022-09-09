declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    overlayLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    characterLimit: {
        type: NumberConstructor;
        default: number;
        validator: (limit: number) => boolean;
    };
    disableCharacterLimit: {
        type: BooleanConstructor;
        default: boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    cols: {
        type: NumberConstructor;
        default: number;
    };
    hasError: {
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
    currValue: import("vue").Ref<string>;
    isFocused: import("vue").Ref<boolean>;
    isHovered: import("vue").Ref<boolean>;
    textAreaId: import("vue").ComputedRef<string>;
    charLimitExceeded: import("vue").ComputedRef<boolean>;
    inputHandler: (e: any) => void;
    getValue: () => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "update:modelValue" | "char-limit-exceeded")[], "input" | "update:modelValue" | "char-limit-exceeded", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    overlayLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    characterLimit: {
        type: NumberConstructor;
        default: number;
        validator: (limit: number) => boolean;
    };
    disableCharacterLimit: {
        type: BooleanConstructor;
        default: boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    cols: {
        type: NumberConstructor;
        default: number;
    };
    hasError: {
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
    onInput?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onChar-limit-exceeded"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    cols: number;
    testMode: boolean;
    modelValue: string;
    overlayLabel: boolean;
    labelAttributes: Record<string, any>;
    hasError: boolean;
    characterLimit: number;
    rows: number;
    disableCharacterLimit: boolean;
}>;
export default _default;
