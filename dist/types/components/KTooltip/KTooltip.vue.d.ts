declare const _default: import("vue").DefineComponent<{
    /**
     * Text to show in tooltip
     */
    label: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    /**
     * Define which side the tooltip displays<br>
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the max-width of the ktooltip
     */
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    className: import("vue").Ref<string>;
    computedClass: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Text to show in tooltip
     */
    label: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    /**
     * Define which side the tooltip displays<br>
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the max-width of the ktooltip
     */
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    maxWidth: string;
    label: string;
    testMode: boolean;
    placement: string;
    positionFixed: boolean;
}>;
export default _default;
