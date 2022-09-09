declare const _default: import("vue").DefineComponent<{
    item: {
        type: ObjectConstructor;
        default: null;
        validator: (item: Record<string, number | string>) => boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    handleClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "selected"[], "selected", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: ObjectConstructor;
        default: null;
        validator: (item: Record<string, number | string>) => boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onSelected?: ((...args: any[]) => any) | undefined;
}, {
    item: Record<string, any>;
    disabled: boolean;
}>;
export default _default;
