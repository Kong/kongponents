declare const _default: import("vue").DefineComponent<{
    /**
     * Checks for valid icon name
     */
    icon: {
        type: StringConstructor;
        validator: (value: string) => boolean;
        required: true;
    };
    /**
     * Optional - Overrides default height and width with equal value
     */
    size: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Optional - Sets Fill color
     */
    color: {
        type: StringConstructor;
        default: null;
    };
    secondaryColor: {
        type: StringConstructor;
        default: null;
    };
    /**
     * Optional - Defines viewbox dimensions
     */
    viewBox: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Optional - Replaces default title attribute
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Optional - Prevents title from being shown on hover. Used by KTooltip
     */
    hideTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * If testMode enabled use the icon name for the title so we can test
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    icons: any;
    svgWrapper: import("vue").Ref<HTMLElement | undefined>;
    svgWithSlotIsHidden: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Checks for valid icon name
     */
    icon: {
        type: StringConstructor;
        validator: (value: string) => boolean;
        required: true;
    };
    /**
     * Optional - Overrides default height and width with equal value
     */
    size: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Optional - Sets Fill color
     */
    color: {
        type: StringConstructor;
        default: null;
    };
    secondaryColor: {
        type: StringConstructor;
        default: null;
    };
    /**
     * Optional - Defines viewbox dimensions
     */
    viewBox: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Optional - Replaces default title attribute
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Optional - Prevents title from being shown on hover. Used by KTooltip
     */
    hideTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * If testMode enabled use the icon name for the title so we can test
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    color: string;
    title: string;
    size: string;
    viewBox: string;
    secondaryColor: string;
    hideTitle: boolean;
    testMode: boolean;
}>;
export default _default;
