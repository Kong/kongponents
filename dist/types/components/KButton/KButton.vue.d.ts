export declare const appearances: {
    primary: string;
    secondary: string;
    danger: string;
    creation: string;
    outline: string;
    btnLink: string;
};
export declare const sizes: {
    small: string;
    medium: string;
    large: string;
};
declare const _default: import("vue").DefineComponent<{
    /**
      * Base styling of the button
      * One of ['primary, secondary, 'danger', 'creation', 'outline, btn-link' ]
      */
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
      * Size variations
      * One of ['default', 'small', 'medium', 'large' ]
      */
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Route object or path. If object will render <router-link>, if string
     will render <a>
     */
    to: {
        type: (ObjectConstructor | StringConstructor)[];
        default: null;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    isOpen: {
        type: BooleanConstructor;
        default: undefined;
    };
    isRounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
}, {
    caretClasses: import("vue").ComputedRef<string | null>;
    hasText: import("vue").ComputedRef<boolean>;
    hasIcon: import("vue").ComputedRef<boolean>;
    buttonType: import("vue").ComputedRef<string>;
    iconColor: import("vue").ComputedRef<string>;
    strippedAttrs: import("vue").ComputedRef<{
        [x: string]: unknown;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
      * Base styling of the button
      * One of ['primary, secondary, 'danger', 'creation', 'outline, btn-link' ]
      */
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
      * Size variations
      * One of ['default', 'small', 'medium', 'large' ]
      */
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Route object or path. If object will render <router-link>, if string
     will render <a>
     */
    to: {
        type: (ObjectConstructor | StringConstructor)[];
        default: null;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    isOpen: {
        type: BooleanConstructor;
        default: undefined;
    };
    isRounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    type: string;
    appearance: string;
    size: string;
    icon: string;
    to: string | Record<string, any>;
    isOpen: boolean;
    isRounded: boolean;
}>;
export default _default;
