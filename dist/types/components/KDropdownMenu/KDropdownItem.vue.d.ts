import { PropType } from 'vue';
import { DropdownItem } from './KDropdownMenu.vue';
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<DropdownItem>;
        default: null;
        validator: (item: DropdownItem) => boolean;
    };
    /**
     * Use this prop to add a divider above the item.
     */
    hasDivider: {
        type: BooleanConstructor;
        default: boolean;
    };
    isDangerous: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    selected: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Internal use only - for tracking selection in conjunction with items prop.
     */
    selectionMenuChild: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClick: {
        type: FunctionConstructor;
        default: undefined;
    };
}, {
    type: import("vue").ComputedRef<"default" | "link" | "button">;
    label: import("vue").ComputedRef<string>;
    to: import("vue").ComputedRef<string | object | undefined>;
    handleClick: (evt: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "click")[], "change" | "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<DropdownItem>;
        default: null;
        validator: (item: DropdownItem) => boolean;
    };
    /**
     * Use this prop to add a divider above the item.
     */
    hasDivider: {
        type: BooleanConstructor;
        default: boolean;
    };
    isDangerous: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    selected: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Internal use only - for tracking selection in conjunction with items prop.
     */
    selectionMenuChild: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClick: {
        type: FunctionConstructor;
        default: undefined;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    item: DropdownItem;
    disabled: boolean;
    onClick: Function;
    selected: boolean;
    hasDivider: boolean;
    isDangerous: boolean;
    selectionMenuChild: boolean;
}>;
export default _default;
