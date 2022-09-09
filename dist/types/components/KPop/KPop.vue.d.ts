export declare const placements: {
    auto: string;
    top: string;
    topStart: string;
    topEnd: string;
    left: string;
    leftStart: string;
    leftEnd: string;
    right: string;
    rightStart: string;
    rightEnd: string;
    bottom: string;
    bottomStart: string;
    bottomEnd: string;
};
declare const _default: import("vue").DefineComponent<{
    /**
     * The target element to append the popper to
     */
    target: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The tag to wrap the popover around
     */
    tag: {
        type: StringConstructor;
        default: string;
    };
    /**
     * If not using the default slot, the text on the button
     * that triggers the popover
     */
    buttonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The title of the Popover header
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The position of the popover
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
        type: StringConstructor;
        validator: (value: string) => boolean;
        default: string;
    };
    /**
     * How the Popover will trigger
     * 'click' | 'hover'
     */
    trigger: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * The width of the Popover body
     */
    width: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the max-width of the popover
     */
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The maxHeight of the Popover body - undocumented and only used within KSelect
     */
    maxHeight: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Custom classes that will be applied to the popover
     */
    popoverClasses: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Custom transition names that will be applied to the popover
     */
    popoverTransitions: {
        type: StringConstructor;
        default: string;
    };
    /**
    * Custom popover timeout setting
     */
    popoverTimeout: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * An optional flag passed in to trigger the Popover to hide - useful for external events like zooming or panning
     */
    hidePopover: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A flag for disabling the popover
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
    * A flag indicating whether or not the element in the slot will be an SVG element
    */
    isSvg: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A flag to hide the triangle pointing to the trigger element
     */
    hideCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A custom callback function to call when the popover is already opened and an element inside has been clicked
     */
    onPopoverClick: {
        type: FunctionConstructor;
        default: null;
    };
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
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
}, unknown, {
    popper: null;
    reference: null;
    isOpen: boolean;
    popoverId: string;
    targetId: string;
}, {
    popoverStyle: () => {
        width: string;
        maxWidth: string;
        maxHeight: string;
    };
    popoverClassObj: () => (string | {
        'hide-caret': boolean;
        'pb-0'?: undefined;
    } | {
        'pb-0': import("vue").Slot | undefined;
        'hide-caret'?: undefined;
    })[];
}, {
    hidePopper(): void;
    showPopper(): void;
    updatePopper(): void;
    createInstance(): Promise<void>;
    handleClick(e: any): void;
    bindEvents(): void;
    destroy(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("closed" | "opened")[], "closed" | "opened", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * The target element to append the popper to
     */
    target: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The tag to wrap the popover around
     */
    tag: {
        type: StringConstructor;
        default: string;
    };
    /**
     * If not using the default slot, the text on the button
     * that triggers the popover
     */
    buttonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The title of the Popover header
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The position of the popover
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
        type: StringConstructor;
        validator: (value: string) => boolean;
        default: string;
    };
    /**
     * How the Popover will trigger
     * 'click' | 'hover'
     */
    trigger: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * The width of the Popover body
     */
    width: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the max-width of the popover
     */
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The maxHeight of the Popover body - undocumented and only used within KSelect
     */
    maxHeight: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Custom classes that will be applied to the popover
     */
    popoverClasses: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Custom transition names that will be applied to the popover
     */
    popoverTransitions: {
        type: StringConstructor;
        default: string;
    };
    /**
    * Custom popover timeout setting
     */
    popoverTimeout: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * An optional flag passed in to trigger the Popover to hide - useful for external events like zooming or panning
     */
    hidePopover: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A flag for disabling the popover
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
    * A flag indicating whether or not the element in the slot will be an SVG element
    */
    isSvg: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A flag to hide the triangle pointing to the trigger element
     */
    hideCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * A custom callback function to call when the popover is already opened and an element inside has been clicked
     */
    onPopoverClick: {
        type: FunctionConstructor;
        default: null;
    };
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
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
    onClosed?: ((...args: any[]) => any) | undefined;
    onOpened?: ((...args: any[]) => any) | undefined;
}, {
    width: string;
    maxHeight: string;
    maxWidth: string;
    title: string;
    target: string;
    disabled: boolean;
    tag: string;
    testMode: boolean;
    hidePopover: boolean;
    buttonText: string;
    placement: string;
    trigger: string;
    popoverClasses: string;
    popoverTransitions: string;
    popoverTimeout: number;
    isSvg: boolean;
    hideCaret: boolean;
    onPopoverClick: Function;
    positionFixed: boolean;
}>;
export default _default;
