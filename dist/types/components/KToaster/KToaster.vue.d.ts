import { PropType } from 'vue';
export declare const toasterAppearances: {
    info: string;
    success: string;
    danger: string;
    warning: string;
};
export interface Toast {
    key?: any;
    appearance?: string;
    message: string;
    timer?: any;
    timeoutMilliseconds?: number;
}
declare const _default: import("vue").DefineComponent<{
    toasterState: {
        type: PropType<Toast[]>;
        default: Toast[];
        required: true;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    toasterState: {
        type: PropType<Toast[]>;
        default: Toast[];
        required: true;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    toasterState: Toast[];
}>;
export default _default;
