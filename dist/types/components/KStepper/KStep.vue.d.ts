import { PropType } from 'vue';
import { StepperState } from '@/components/KStepper/KStepState.vue';
declare const _default: import("vue").DefineComponent<{
    label: {
        type: StringConstructor;
        required: true;
    };
    state: {
        type: PropType<StepperState>;
        default: string;
        validator: (value: StepperState) => boolean;
    };
    maxLabelWidth: {
        type: StringConstructor;
        default: string;
    };
}, {
    labelStyle: import("vue").ComputedRef<{
        maxWidth: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        required: true;
    };
    state: {
        type: PropType<StepperState>;
        default: string;
        validator: (value: StepperState) => boolean;
    };
    maxLabelWidth: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    state: StepperState;
    maxLabelWidth: string;
}>;
export default _default;
