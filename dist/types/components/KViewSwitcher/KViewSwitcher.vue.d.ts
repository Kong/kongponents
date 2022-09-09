declare const _default: import("vue").DefineComponent<{
    view: {
        type: StringConstructor;
        default: string;
        required: true;
        validator: (val: string) => boolean;
    };
}, {
    isPaused: import("vue").Ref<boolean>;
    toggleView: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "view-changed"[], "view-changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    view: {
        type: StringConstructor;
        default: string;
        required: true;
        validator: (val: string) => boolean;
    };
}>> & {
    "onView-changed"?: ((...args: any[]) => any) | undefined;
}, {
    view: string;
}>;
export default _default;
