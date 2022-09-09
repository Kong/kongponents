import { Ref, PropType } from 'vue';
/**
 * @deprecated
 * @param {String} key - the current key to sort by
 * @param {String} previousKey - the previous key used to sort by
 * @param {String} sortOrder - either ascending or descending
 * @param {Array} items - the list of items to sort
 * @return {Object} an object containing the previousKey and sortOrder
 */
export declare const defaultSorter: (key: string, previousKey: string, sortOrder: string, items: []) => Record<string, any>;
export interface TableHeader {
    key: string;
    label: string;
    sortable?: boolean;
    hideLabel?: boolean;
    useSortHandlerFn?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    /**
     * @deprecated in favor of the "fetcher" prop
     * Object containing data which creates rows and columns.
     * @param {Object} options - Options to initialize the component with
     * @param {Array} options.headers - Array of Objects defining Table Headers
     * @param {Array} options.data - Array of Objects defining column data
     */
    options: {
        type: ObjectConstructor;
        default: () => null;
        required: false;
    };
    /**
     * Enable client side sort - only do this if using a fetcher
     * that returns static data
     */
    enableClientSort: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Enables hover highlighting to table rows
     */
    hasHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @deprecated
     * the sort order for the table.
     */
    sortOrder: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * @deprecated
     * the key of the column that's currently being sorted
     */
    sortKey: {
        type: StringConstructor;
        default: string;
    };
    sortHandlerFn: {
        type: FunctionConstructor;
        default: () => {};
    };
    /**
     * A function that conditionally specifies row attributes on each row
     */
    rowAttrs: {
        type: FunctionConstructor;
        default: () => {};
    };
    /**
     * A prop that enables a side border with a themable color to it.
     */
    hasSideBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A function that conditionally specifies cell attributes
     */
    cellAttrs: {
        type: FunctionConstructor;
        default: () => {};
    };
    /**
     * A prop that enables a loading skeleton
     */
    isLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A prop to pass in a custom empty state title
     */
    emptyStateTitle: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state message
     */
    emptyStateMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state action route
     */
    emptyStateActionRoute: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionButtonIcon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state icon
     */
    emptyStateIcon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a color for the empty state icon
     */
    emptyStateIconColor: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a size for the empty state icon
     */
    emptyStateIconSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop that enables the error state
     */
    hasError: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A prop to pass in a custom error state title
     */
    errorStateTitle: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom error state message
     */
    errorStateMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom error state action route
     */
    errorStateActionRoute: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * A prop to pass in a custom error state action message
     */
    errorStateActionMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom error state icon
     */
    errorStateIcon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a color for the error state icon
     */
    errorStateIconColor: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a size for the error state icon
     */
    errorStateIconSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a fetcher function to enable server-side search, sort
     * and pagination
     */
    fetcher: {
        type: FunctionConstructor;
        default: undefined;
        required: true;
    };
    /**
     * A prop to trigger a revalidate of the fetcher function. Modifying this value
     * will trigger a manual refetch of the table data.
     */
    fetcherCacheKey: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a search string for server-side search
     */
    searchInput: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a an array of headers for the table
     */
    headers: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /**
     * A prop to pass in a an object of intial params for the initial fetcher function call
     */
    initialFetcherParams: {
        type: ObjectConstructor;
        default: null;
    };
    /**
     * A prop to pass in a the number of pagination neighbors used by the pagination component
     */
    paginationNeighbors: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * A prop to pass in an array of page sizes used by the pagination component
     */
    paginationPageSizes: {
        type: PropType<number[]>;
        default: () => number[];
        validator: (pageSizes: number[]) => boolean;
    };
    /**
     * A prop to pass the total number of items in the set for the pagination text
     */
    paginationTotalItems: {
        type: NumberConstructor;
        default: null;
    };
    disablePaginationPageJump: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableSorting: {
        type: BooleanConstructor;
        default: boolean;
    };
    disablePagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    paginationType: {
        type: PropType<"offset" | "default">;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * A prop to pass to hide pagination for total table records is less than or equal to pagesize
     */
    hidePaginationWhenOptional: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * for testing only, strips out generated ids and avoid loading state in tests.
     * 'true' - no id's no loading
     * 'loading' - no id's but allow loading
     */
    testMode: {
        type: PropType<"loading" | "true">;
        default: string;
        validator: (val: string) => boolean;
    };
}, {
    data: Ref<never[]>;
    isScrolled: Ref<boolean>;
    isTableLoading: Ref<boolean>;
    page: Ref<number>;
    pageChangeHandler: ({ page: newPage }: Record<string, number>) => void;
    pageSizeChangeHandler: ({ pageSize: newPageSize }: Record<string, number>) => void;
    pageSize: Ref<number>;
    scrollHandler: (event: any) => void;
    sortClickHandler: (header: TableHeader) => void;
    sortColumnKey: Ref<string>;
    sortColumnOrder: Ref<string>;
    isClickable: Ref<boolean>;
    tableHeaders: Ref<TableHeader[]>;
    tdlisteners: import("vue").ComputedRef<(entity: any, rowData: any) => any>;
    total: Ref<number>;
    tableId: import("vue").ComputedRef<string>;
    getTestIdString: (message: string) => string;
    getNextOffsetHandler: () => void;
    getPrevOffsetHandler: () => void;
    previousOffset: import("vue").ComputedRef<string | null>;
    offset: Ref<string | null>;
    shouldShowPagination: import("vue").ComputedRef<boolean | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("sort" | "ktable-error-cta-clicked" | "ktable-empty-state-cta-clicked" | "row-click" | "cell-click")[], "sort" | "ktable-error-cta-clicked" | "ktable-empty-state-cta-clicked" | "row-click" | "cell-click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @deprecated in favor of the "fetcher" prop
     * Object containing data which creates rows and columns.
     * @param {Object} options - Options to initialize the component with
     * @param {Array} options.headers - Array of Objects defining Table Headers
     * @param {Array} options.data - Array of Objects defining column data
     */
    options: {
        type: ObjectConstructor;
        default: () => null;
        required: false;
    };
    /**
     * Enable client side sort - only do this if using a fetcher
     * that returns static data
     */
    enableClientSort: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Enables hover highlighting to table rows
     */
    hasHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @deprecated
     * the sort order for the table.
     */
    sortOrder: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * @deprecated
     * the key of the column that's currently being sorted
     */
    sortKey: {
        type: StringConstructor;
        default: string;
    };
    sortHandlerFn: {
        type: FunctionConstructor;
        default: () => {};
    };
    /**
     * A function that conditionally specifies row attributes on each row
     */
    rowAttrs: {
        type: FunctionConstructor;
        default: () => {};
    };
    /**
     * A prop that enables a side border with a themable color to it.
     */
    hasSideBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A function that conditionally specifies cell attributes
     */
    cellAttrs: {
        type: FunctionConstructor;
        default: () => {};
    };
    /**
     * A prop that enables a loading skeleton
     */
    isLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A prop to pass in a custom empty state title
     */
    emptyStateTitle: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state message
     */
    emptyStateMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state action route
     */
    emptyStateActionRoute: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionButtonIcon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom empty state icon
     */
    emptyStateIcon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a color for the empty state icon
     */
    emptyStateIconColor: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a size for the empty state icon
     */
    emptyStateIconSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop that enables the error state
     */
    hasError: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A prop to pass in a custom error state title
     */
    errorStateTitle: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom error state message
     */
    errorStateMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom error state action route
     */
    errorStateActionRoute: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * A prop to pass in a custom error state action message
     */
    errorStateActionMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a custom error state icon
     */
    errorStateIcon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a color for the error state icon
     */
    errorStateIconColor: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a size for the error state icon
     */
    errorStateIconSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a fetcher function to enable server-side search, sort
     * and pagination
     */
    fetcher: {
        type: FunctionConstructor;
        default: undefined;
        required: true;
    };
    /**
     * A prop to trigger a revalidate of the fetcher function. Modifying this value
     * will trigger a manual refetch of the table data.
     */
    fetcherCacheKey: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a search string for server-side search
     */
    searchInput: {
        type: StringConstructor;
        default: string;
    };
    /**
     * A prop to pass in a an array of headers for the table
     */
    headers: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /**
     * A prop to pass in a an object of intial params for the initial fetcher function call
     */
    initialFetcherParams: {
        type: ObjectConstructor;
        default: null;
    };
    /**
     * A prop to pass in a the number of pagination neighbors used by the pagination component
     */
    paginationNeighbors: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * A prop to pass in an array of page sizes used by the pagination component
     */
    paginationPageSizes: {
        type: PropType<number[]>;
        default: () => number[];
        validator: (pageSizes: number[]) => boolean;
    };
    /**
     * A prop to pass the total number of items in the set for the pagination text
     */
    paginationTotalItems: {
        type: NumberConstructor;
        default: null;
    };
    disablePaginationPageJump: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableSorting: {
        type: BooleanConstructor;
        default: boolean;
    };
    disablePagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    paginationType: {
        type: PropType<"offset" | "default">;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * A prop to pass to hide pagination for total table records is less than or equal to pagesize
     */
    hidePaginationWhenOptional: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * for testing only, strips out generated ids and avoid loading state in tests.
     * 'true' - no id's no loading
     * 'loading' - no id's but allow loading
     */
    testMode: {
        type: PropType<"loading" | "true">;
        default: string;
        validator: (val: string) => boolean;
    };
}>> & {
    onSort?: ((...args: any[]) => any) | undefined;
    "onKtable-error-cta-clicked"?: ((...args: any[]) => any) | undefined;
    "onKtable-empty-state-cta-clicked"?: ((...args: any[]) => any) | undefined;
    "onRow-click"?: ((...args: any[]) => any) | undefined;
    "onCell-click"?: ((...args: any[]) => any) | undefined;
}, {
    options: Record<string, any>;
    headers: unknown[];
    testMode: "loading" | "true";
    hasHover: boolean;
    hasError: boolean;
    paginationType: "offset" | "default";
    isLoading: boolean;
    emptyStateTitle: string;
    emptyStateMessage: string;
    emptyStateActionRoute: string | Record<string, any>;
    emptyStateActionMessage: string;
    emptyStateActionButtonIcon: string;
    emptyStateIcon: string;
    emptyStateIconColor: string;
    emptyStateIconSize: string;
    errorStateTitle: string;
    errorStateMessage: string;
    errorStateActionRoute: string | Record<string, any>;
    errorStateActionMessage: string;
    errorStateIcon: string;
    errorStateIconColor: string;
    errorStateIconSize: string;
    fetcher: Function;
    initialFetcherParams: Record<string, any>;
    fetcherCacheKey: string;
    searchInput: string;
    paginationNeighbors: number;
    paginationPageSizes: number[];
    paginationTotalItems: number;
    disablePaginationPageJump: boolean;
    disablePagination: boolean;
    hidePaginationWhenOptional: boolean;
    enableClientSort: boolean;
    sortOrder: string;
    sortKey: string;
    sortHandlerFn: Function;
    rowAttrs: Function;
    hasSideBorder: boolean;
    cellAttrs: Function;
    disableSorting: boolean;
}>;
export default _default;
