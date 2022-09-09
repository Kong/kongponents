declare const _default: import("vue").DefineComponent<{
    /**
     * Sets whether the initial value passed in should be ignored.
     * Useful for times when you have placeholder text and don't want it passed
     * in as a value
     */
    ignoreValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * An object of css styles to override those plucked from the slot element.
     * Useful if you are styling the default content differently than how the
     * input should display
     */
    styleOverrides: {
        type: ObjectConstructor;
        default: () => {};
    };
}, {
    input: import("vue").Ref<null>;
    inputUuid: import("vue").ComputedRef<string>;
    isEditing: import("vue").Ref<boolean>;
    inputText: import("vue").Ref<string>;
    styles: import("vue").Ref<{}>;
    handleClick: (e: any) => Promise<void>;
    handleSave: () => void;
    onEnter: (e: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "changed"[], "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Sets whether the initial value passed in should be ignored.
     * Useful for times when you have placeholder text and don't want it passed
     * in as a value
     */
    ignoreValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * An object of css styles to override those plucked from the slot element.
     * Useful if you are styling the default content differently than how the
     * input should display
     */
    styleOverrides: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    onChanged?: ((...args: any[]) => any) | undefined;
}, {
    ignoreValue: boolean;
    styleOverrides: Record<string, any>;
}>;
export default _default;
