declare const _default: import("vue").DefineComponent<{
    /**
     * Set the text of the title, if using title slot
     */
    title: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Set the title in the body
     */
    bodyHeader: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Text to display as a description of the body's title
     */
    bodyHeaderDescription: {
        type: StringConstructor;
        default: string;
    };
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
        type: StringConstructor;
        default: string;
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
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
      *  Pass the type of icon for the header on the left
      */
    iconString: {
        type: StringConstructor;
        default: string;
    };
}, {
    isOpen: import("vue").ComputedRef<boolean>;
    modalBodyContent: import("vue").Ref<null>;
    handleKeydown: (e: any) => void;
    close: () => void;
    proceed: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("canceled" | "proceed")[], "canceled" | "proceed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Set the text of the title, if using title slot
     */
    title: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Set the title in the body
     */
    bodyHeader: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Text to display as a description of the body's title
     */
    bodyHeaderDescription: {
        type: StringConstructor;
        default: string;
    };
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
        type: StringConstructor;
        default: string;
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
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
      *  Pass the type of icon for the header on the left
      */
    iconString: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onProceed?: ((...args: any[]) => any) | undefined;
    onCanceled?: ((...args: any[]) => any) | undefined;
}, {
    isVisible: boolean;
    actionButtonText: string;
    actionButtonAppearance: string;
    cancelButtonText: string;
    cancelButtonAppearance: string;
    bodyHeader: string;
    bodyHeaderDescription: string;
    iconString: string;
}>;
export default _default;
