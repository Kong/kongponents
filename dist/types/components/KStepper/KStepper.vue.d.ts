import { PropType } from 'vue';
import type { StepperState } from './KStepState.vue';
export interface StepItem {
    label: string;
    state?: StepperState;
}
declare const _default: import("vue").DefineComponent<{
    /**
     * Array of steps to display
     */
    steps: {
        type: PropType<StepItem[]>;
        required: true;
        validator: (items: StepItem[]) => boolean;
    };
    /**
     * Maximum width of each step's label
     */
    maxLabelWidth: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Array of steps to display
     */
    steps: {
        type: PropType<StepItem[]>;
        required: true;
        validator: (items: StepItem[]) => boolean;
    };
    /**
     * Maximum width of each step's label
     */
    maxLabelWidth: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    maxLabelWidth: string;
}>;
export default _default;
