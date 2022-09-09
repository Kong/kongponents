declare const _default: import("vue").DefineComponent<{
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * The dismiss icon is visible by default when using the `header-image` slot.
     * Set to true to hide the 'x' dismiss button
     */
    hideDismissIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Controls whether the dismiss button is light or dark shade.
     */
    dismissButtonTheme: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    /**
     * Set the text of the body content
     */
    content: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the alignment for the title and content
     */
    textAlign: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set to not render the cancel button
     */
    hideCancelButton: {
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
    hasHeaderImage: import("vue").ComputedRef<boolean>;
    dismissButtonColor: import("vue").ComputedRef<string>;
    close: (force?: boolean, event?: any) => void;
    proceed: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("canceled" | "proceed")[], "canceled" | "proceed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * The dismiss icon is visible by default when using the `header-image` slot.
     * Set to true to hide the 'x' dismiss button
     */
    hideDismissIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Controls whether the dismiss button is light or dark shade.
     */
    dismissButtonTheme: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    /**
     * Set the text of the body content
     */
    content: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the alignment for the title and content
     */
    textAlign: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set to not render the cancel button
     */
    hideCancelButton: {
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
    onProceed?: ((...args: any[]) => any) | undefined;
    onCanceled?: ((...args: any[]) => any) | undefined;
}, {
    content: string;
    textAlign: string;
    hideTitle: boolean;
    testMode: boolean;
    isVisible: boolean;
    hideDismissIcon: boolean;
    dismissButtonTheme: string;
    actionButtonText: string;
    actionButtonAppearance: string;
    cancelButtonText: string;
    cancelButtonAppearance: string;
    hideCancelButton: boolean;
}>;
export default _default;
