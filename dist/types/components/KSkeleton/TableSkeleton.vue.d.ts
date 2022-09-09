declare const _default: import("vue").DefineComponent<{
    rows: {
        type: NumberConstructor;
        default: number;
    };
    columns: {
        type: NumberConstructor;
        default: number;
    };
}, {
    calcWidth: (cell: any, columns: number) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    rows: {
        type: NumberConstructor;
        default: number;
    };
    columns: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    columns: number;
    rows: number;
}>;
export default _default;
