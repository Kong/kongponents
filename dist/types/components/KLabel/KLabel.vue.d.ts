declare const _default: import("vue").DefineComponent<{
    help: {
        type: StringConstructor;
        default: undefined;
    };
    info: {
        type: StringConstructor;
        default: undefined;
    };
    tooltipAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    help: {
        type: StringConstructor;
        default: undefined;
    };
    info: {
        type: StringConstructor;
        default: undefined;
    };
    tooltipAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    help: string;
    testMode: boolean;
    info: string;
    tooltipAttributes: Record<string, any>;
}>;
export default _default;
