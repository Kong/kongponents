import { PropType, Ref } from 'vue';
export interface DropdownItem {
    label: string;
    to?: string | object;
    value?: string | number;
    selected?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    showCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    kpopAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    items: {
        type: PropType<DropdownItem[]>;
        default: () => never[];
        validator: (items: DropdownItem[]) => boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledTooltip: {
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
    boundKPopAttributes: {
        width: string | undefined;
        popoverClasses: string;
        hideCaret: boolean;
        popoverTimeout: number;
        positionFixed: boolean;
        placement: string;
    };
    selectedItem: Ref<{}>;
    handleSelection: (item: DropdownItem) => void;
    handleTriggerToggle: (isToggled: Ref<boolean>, toggle: () => void, isOpen: boolean) => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "toggleDropdown")[], "change" | "toggleDropdown", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    showCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    kpopAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    items: {
        type: PropType<DropdownItem[]>;
        default: () => never[];
        validator: (items: DropdownItem[]) => boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledTooltip: {
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
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onToggleDropdown?: ((...args: any[]) => any) | undefined;
}, {
    width: string;
    appearance: string;
    label: string;
    disabled: boolean;
    testMode: boolean;
    items: DropdownItem[];
    kpopAttributes: Record<string, any>;
    showCaret: boolean;
    disabledTooltip: string;
}>;
export default _default;
