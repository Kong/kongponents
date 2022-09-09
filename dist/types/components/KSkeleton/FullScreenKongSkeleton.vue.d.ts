declare const _default: import("vue").DefineComponent<{
    progress: {
        type: NumberConstructor;
        default: null;
    };
}, {
    timer: import("vue").Ref<number>;
    progressInternal: import("vue").Ref<number>;
    progression: import("vue").ComputedRef<number>;
    loaderImage: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    progress: {
        type: NumberConstructor;
        default: null;
    };
}>>, {
    progress: number;
}>;
export default _default;
