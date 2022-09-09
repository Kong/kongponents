declare const _default: import("vue").DefineComponent<{
    /**
     * Title string if slot not used, also used for aria-label
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Pass body string in if slot not used
     */
    body: {
        type: StringConstructor;
        default: string;
    };
    /**
      * Set top border or no border. If neither set default will have border<br>
      * Options: [borderTop, noBorder]
      */
    borderVariant: {
        type: StringConstructor;
        default: string;
    };
    /**
      * Sets if card has hover state<br>
      */
    hasHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    hasShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Add small status text above the card title
     */
    status: {
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
    titleId: import("vue").ComputedRef<string>;
    contentId: import("vue").ComputedRef<string>;
    useStatusHatLayout: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Title string if slot not used, also used for aria-label
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Pass body string in if slot not used
     */
    body: {
        type: StringConstructor;
        default: string;
    };
    /**
      * Set top border or no border. If neither set default will have border<br>
      * Options: [borderTop, noBorder]
      */
    borderVariant: {
        type: StringConstructor;
        default: string;
    };
    /**
      * Sets if card has hover state<br>
      */
    hasHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    hasShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Add small status text above the card title
     */
    status: {
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
    body: string;
    title: string;
    status: string;
    testMode: boolean;
    borderVariant: string;
    hasHover: boolean;
    hasShadow: boolean;
}>;
export default _default;
