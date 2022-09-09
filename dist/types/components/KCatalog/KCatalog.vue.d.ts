import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    /**
     * A prop to pass in to display skeleton to indicate loading
     */
    isLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    cardSize: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Card catalog title
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Disable truncation of the KCard's 'description'
     */
    noTruncation: {
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
     * A prop to pass in a fetcher function to enable server-side pagination
     */
    fetcher: {
        type: FunctionConstructor;
        required: true;
    };
    /**
     * A prop to pass in a an object of intial params for the initial fetcher function call
     */
    initialFetcherParams: {
        type: ObjectConstructor;
        default: null;
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
    disablePagination: {
        type: BooleanConstructor;
        default: boolean;
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
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
}, {
    data: import("vue").Ref<any[]>;
    isCardLoading: import("vue").Ref<boolean>;
    page: import("vue").Ref<number>;
    pageChangeHandler: ({ page: newPage }: Record<string, number>) => void;
    pageSize: import("vue").Ref<number>;
    pageSizeChangeHandler: ({ pageSize: newPageSize }: Record<string, number>) => void;
    total: import("vue").Ref<number>;
    getTestIdString: (message: string) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("kcatalog-error-cta-clicked" | "kcatalog-empty-state-cta-clicked")[], "kcatalog-error-cta-clicked" | "kcatalog-empty-state-cta-clicked", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * A prop to pass in to display skeleton to indicate loading
     */
    isLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    cardSize: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Card catalog title
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Disable truncation of the KCard's 'description'
     */
    noTruncation: {
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
     * A prop to pass in a fetcher function to enable server-side pagination
     */
    fetcher: {
        type: FunctionConstructor;
        required: true;
    };
    /**
     * A prop to pass in a an object of intial params for the initial fetcher function call
     */
    initialFetcherParams: {
        type: ObjectConstructor;
        default: null;
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
    disablePagination: {
        type: BooleanConstructor;
        default: boolean;
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
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
}>> & {
    "onKcatalog-error-cta-clicked"?: ((...args: any[]) => any) | undefined;
    "onKcatalog-empty-state-cta-clicked"?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    testMode: string | boolean;
    hasError: boolean;
    isLoading: boolean;
    cardSize: string;
    noTruncation: boolean;
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
    initialFetcherParams: Record<string, any>;
    fetcherCacheKey: string;
    searchInput: string;
    paginationNeighbors: number;
    paginationPageSizes: number[];
    paginationTotalItems: number;
    disablePaginationPageJump: boolean;
    disablePagination: boolean;
    hidePaginationWhenOptional: boolean;
}>;
export default _default;
