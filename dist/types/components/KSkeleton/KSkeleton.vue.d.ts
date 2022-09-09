declare const _default: import("vue").DefineComponent<{
    delayMilliseconds: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    progress: {
        type: NumberConstructor;
        required: false;
        default: null;
    };
    cardCount: {
        type: NumberConstructor;
        default: number;
    };
    tableColumns: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    tableRows: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}, {
    isVisible: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    delayMilliseconds: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    progress: {
        type: NumberConstructor;
        required: false;
        default: null;
    };
    cardCount: {
        type: NumberConstructor;
        default: number;
    };
    tableColumns: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    tableRows: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}>>, {
    type: string;
    progress: number;
    cardCount: number;
    delayMilliseconds: number;
    tableColumns: number;
    tableRows: number;
}>;
export default _default;
