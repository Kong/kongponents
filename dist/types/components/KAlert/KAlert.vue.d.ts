export declare const appearances: {
    info: string;
    success: string;
    danger: string;
    warning: string;
};
declare const _default: import("vue").DefineComponent<{
    /**
    * Message to show in alert
    */
    alertMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set whether or not the alert box is shown.
     */
    isShowing: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Fixes alert to top
     */
    isFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set whether or not alert has full border is visible
     */
    isBordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has left border
     */
    hasLeftBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has right border
     */
    hasRightBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has top border
     */
    hasTopBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has bottom border
     */
    hasBottomBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Center text inside alert
     */
    isCentered: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set alert box icon size
     */
    iconSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set alert box type of icon
     */
    icon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set alert box icon color
     */
    iconColor: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Alert message title
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
    * Alert message description
    */
    description: {
        type: StringConstructor;
        default: string;
    };
    /**
      * Base styling of the button<br>
      * One of [ info, danger, warning, success ]
      */
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Set whether alert box is the default size or small for context (under form fields, etc),
     */
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Set whether alert box has icon/button to dismiss or none
     */
    dismissType: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Set whether alert box is alert or banner
     */
    type: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, {
    hasActionButtons: import("vue").ComputedRef<boolean>;
    dismissAlert: () => void;
    proceed: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("closed" | "proceed")[], "closed" | "proceed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
    * Message to show in alert
    */
    alertMessage: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set whether or not the alert box is shown.
     */
    isShowing: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Fixes alert to top
     */
    isFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set whether or not alert has full border is visible
     */
    isBordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has left border
     */
    hasLeftBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has right border
     */
    hasRightBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has top border
     */
    hasTopBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Sets whether or not alert has bottom border
     */
    hasBottomBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Center text inside alert
     */
    isCentered: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set alert box icon size
     */
    iconSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set alert box type of icon
     */
    icon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set alert box icon color
     */
    iconColor: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Alert message title
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
    * Alert message description
    */
    description: {
        type: StringConstructor;
        default: string;
    };
    /**
      * Base styling of the button<br>
      * One of [ info, danger, warning, success ]
      */
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Set whether alert box is the default size or small for context (under form fields, etc),
     */
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Set whether alert box has icon/button to dismiss or none
     */
    dismissType: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Set whether alert box is alert or banner
     */
    type: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}>> & {
    onClosed?: ((...args: any[]) => any) | undefined;
    onProceed?: ((...args: any[]) => any) | undefined;
}, {
    description: string;
    type: string;
    appearance: string;
    title: string;
    size: string;
    icon: string;
    iconColor: string;
    alertMessage: string;
    isShowing: boolean;
    isFixed: boolean;
    isBordered: boolean;
    hasLeftBorder: boolean;
    hasRightBorder: boolean;
    hasTopBorder: boolean;
    hasBottomBorder: boolean;
    isCentered: boolean;
    iconSize: string;
    dismissType: string;
}>;
export default _default;
