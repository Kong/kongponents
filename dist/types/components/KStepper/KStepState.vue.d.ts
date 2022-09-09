import { PropType } from 'vue';
export declare type StepperState = '' | 'default' | 'pending' | 'completed' | 'error';
declare const _default: import("vue").DefineComponent<{
    state: {
        type: PropType<StepperState>;
        default: string;
        validator: (value: StepperState) => boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    state: {
        type: PropType<StepperState>;
        default: string;
        validator: (value: StepperState) => boolean;
    };
}>>, {
    state: StepperState;
}>;
export default _default;
