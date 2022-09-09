declare const _default: import("vue").DefineComponent<{
    width: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    width: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}>>, {
    height: string;
    width: string;
}>;
export default _default;
