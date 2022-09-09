declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    message: {
        type: StringConstructor;
        default: string;
    };
    actionButtonText: {
        type: StringConstructor;
        default: string;
    };
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Boolean to disable action buttons while a submission is occurring. Display
     * spinner on action button.
     */
    actionPending: {
        type: BooleanConstructor;
        default: boolean;
    };
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Use this prop to require a confirmation string be typed correctly
     * before the submit button will be enabled.
     */
    confirmationText: {
        type: StringConstructor;
        default: string;
    };
    preventProceedOnEnter: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    confirmationInput: import("vue").Ref<string>;
    displayTitle: import("vue").ComputedRef<string>;
    disableProceedButton: import("vue").ComputedRef<boolean>;
    handleKeydown: (e: any) => void;
    close: () => void;
    proceed: (evt: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("canceled" | "proceed")[], "canceled" | "proceed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    message: {
        type: StringConstructor;
        default: string;
    };
    actionButtonText: {
        type: StringConstructor;
        default: string;
    };
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Boolean to disable action buttons while a submission is occurring. Display
     * spinner on action button.
     */
    actionPending: {
        type: BooleanConstructor;
        default: boolean;
    };
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Use this prop to require a confirmation string be typed correctly
     * before the submit button will be enabled.
     */
    confirmationText: {
        type: StringConstructor;
        default: string;
    };
    preventProceedOnEnter: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onProceed?: ((...args: any[]) => any) | undefined;
    onCanceled?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    message: string;
    title: string;
    isVisible: boolean;
    actionButtonText: string;
    cancelButtonText: string;
    actionPending: boolean;
    confirmationText: string;
    preventProceedOnEnter: boolean;
}>;
export default _default;
