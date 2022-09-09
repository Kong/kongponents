import { Ref, PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    totalCount: {
        type: NumberConstructor;
        default: number;
    };
    pageSizes: {
        type: PropType<number[]>;
        default: () => number[];
        validator: (pageSizes: number[]) => boolean;
    };
    initialPageSize: {
        type: NumberConstructor;
        default: null;
    };
    neighbors: {
        type: NumberConstructor;
        default: number;
    };
    searchTriggered: {
        type: BooleanConstructor;
        default: boolean;
    };
    currentPage: {
        type: NumberConstructor;
        default: null;
    };
    disablePageJump: {
        type: BooleanConstructor;
        default: boolean;
    };
    paginationType: {
        type: PropType<"offset" | "default">;
        default: string;
        validator: (value: string) => boolean;
    };
    offsetPrevButtonDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    offsetNextButtonDisabled: {
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
    kpopAttrs: {
        placement: string;
    };
    currentPageSize: Ref<number>;
    pageCount: Ref<number>;
    pageSizeOptions: {
        label: string;
        key: string;
        value: number;
    }[];
    backDisabled: Ref<boolean>;
    forwardDisabled: Ref<boolean>;
    pageSizeText: Ref<string>;
    pagesVisible: Ref<number | number[]>;
    firstDetached: Ref<boolean>;
    lastDetached: Ref<boolean>;
    startCount: import("vue").ComputedRef<number>;
    endCount: import("vue").ComputedRef<number>;
    pagesString: import("vue").ComputedRef<string>;
    pageCountString: import("vue").ComputedRef<string>;
    currentlySelectedPage: import("vue").ComputedRef<number>;
    pageForward: () => void;
    pageBack: () => void;
    changePage: (page: number) => void;
    updatePage: () => void;
    updatePageSize: (event: any) => void;
    getNextOffset: () => void;
    getPrevOffset: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("getPrevOffset" | "getNextOffset" | "pageChanged" | "pageSizeChanged")[], "getPrevOffset" | "getNextOffset" | "pageChanged" | "pageSizeChanged", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    totalCount: {
        type: NumberConstructor;
        default: number;
    };
    pageSizes: {
        type: PropType<number[]>;
        default: () => number[];
        validator: (pageSizes: number[]) => boolean;
    };
    initialPageSize: {
        type: NumberConstructor;
        default: null;
    };
    neighbors: {
        type: NumberConstructor;
        default: number;
    };
    searchTriggered: {
        type: BooleanConstructor;
        default: boolean;
    };
    currentPage: {
        type: NumberConstructor;
        default: null;
    };
    disablePageJump: {
        type: BooleanConstructor;
        default: boolean;
    };
    paginationType: {
        type: PropType<"offset" | "default">;
        default: string;
        validator: (value: string) => boolean;
    };
    offsetPrevButtonDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    offsetNextButtonDisabled: {
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
    onPageChanged?: ((...args: any[]) => any) | undefined;
    onPageSizeChanged?: ((...args: any[]) => any) | undefined;
}, {
    testMode: boolean;
    items: unknown[];
    totalCount: number;
    pageSizes: number[];
    initialPageSize: number;
    neighbors: number;
    searchTriggered: boolean;
    currentPage: number;
    disablePageJump: boolean;
    paginationType: "offset" | "default";
    offsetPrevButtonDisabled: boolean;
    offsetNextButtonDisabled: boolean;
}>;
export default _default;
