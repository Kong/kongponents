declare const _default: import("vue").DefineComponent<{
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    handleClose: (e: any, forceClose?: boolean) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    isVisible: boolean;
}>;
export default _default;
