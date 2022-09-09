import { Toast } from './KToaster.vue';
import { Ref } from 'vue';
export default class ToastManager {
    toasters: Ref<Toast[]>;
    timeout: number;
    appearance: string;
    id: string;
    constructor(id?: string, timeout?: number, appearance?: string);
    mount(): void;
    setTimer(key: any, timeout: number): number;
    open(args: Record<string, any> | string): void;
    close(key: any): void;
    closeAll(): void;
}
