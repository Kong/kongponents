export declare const appearances: {
    default: string;
    success: string;
    danger: string;
    info: string;
    warning: string;
    custom: string;
};
export declare const shapes: {
    rounded: string;
    rectangular: string;
};
declare const _default: import("vue").DefineComponent<{
    /**
      * Base styling<br>
      * One of [danger, warning, success etc.]
      */
    appearance: {
        type: StringConstructor;
        required: false;
        validator: (value: string) => boolean;
        default: string;
    };
    shape: {
        type: StringConstructor;
        required: false;
        validator: (value: string) => boolean;
        default: string;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    backgroundColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
      * Base styling<br>
      * One of [danger, warning, success etc.]
      */
    appearance: {
        type: StringConstructor;
        required: false;
        validator: (value: string) => boolean;
        default: string;
    };
    shape: {
        type: StringConstructor;
        required: false;
        validator: (value: string) => boolean;
        default: string;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    backgroundColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>>, {
    appearance: string;
    backgroundColor: string;
    color: string;
    shape: string;
}>;
export default _default;
