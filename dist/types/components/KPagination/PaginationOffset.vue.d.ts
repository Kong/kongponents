declare const _default: import("vue").DefineComponent<{
    prevButtonDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nextButtonDisabled: {
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
    getPrevOffset: () => void;
    getNextOffset: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("getPrevOffset" | "getNextOffset")[], "getPrevOffset" | "getNextOffset", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    prevButtonDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nextButtonDisabled: {
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
    onGetPrevOffset?: ((...args: any[]) => any) | undefined;
    onGetNextOffset?: ((...args: any[]) => any) | undefined;
}, {
    testMode: boolean;
    prevButtonDisabled: boolean;
    nextButtonDisabled: boolean;
}>;
export default _default;
