import { PropType } from 'vue';
export interface CatalogItem {
    title: string;
    description: string;
}
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<CatalogItem>;
        default: () => {};
    };
    truncate: {
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
    handleCardClick: (evt: Event, item: CatalogItem) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "clicked"[], "clicked", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<CatalogItem>;
        default: () => {};
    };
    truncate: {
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
    onClicked?: ((...args: any[]) => any) | undefined;
}, {
    item: CatalogItem;
    testMode: boolean;
    truncate: boolean;
}>;
export default _default;
