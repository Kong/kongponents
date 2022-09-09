import { PropType } from 'vue';
export interface BreadcrumbItem {
    to: object | string;
    text?: string;
    title?: string;
    icon?: string;
    key?: string;
    maxWidth?: string;
}
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<BreadcrumbItem[]>;
        default: BreadcrumbItem[];
        required: true;
        validator: (items: BreadcrumbItem[]) => boolean;
    };
    itemMaxWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<BreadcrumbItem[]>;
        default: BreadcrumbItem[];
        required: true;
        validator: (items: BreadcrumbItem[]) => boolean;
    };
    itemMaxWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>>, {
    items: BreadcrumbItem[];
    itemMaxWidth: string;
}>;
export default _default;
