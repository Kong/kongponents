import { Ref } from 'vue';
import { IConfig } from 'swrv';
import { AxiosResponse, AxiosError } from 'axios';
import { IKey, fetcherFn } from 'swrv/dist/types';
export default function useUtilities(): {
    useRequest: <Data = unknown, Error_1 = {
        message: string;
    }>(key: IKey, fn?: fetcherFn<AxiosResponse<Data, any>> | undefined, config?: IConfig) => {
        data: import("vue").ComputedRef<Data | undefined>;
        response: Ref<AxiosResponse<Data, any> | undefined>;
        error: Ref<AxiosError<Error_1, any> | undefined>;
        isValidating: Ref<boolean>;
        revalidate: (data?: fetcherFn<AxiosResponse<Data, any>> | undefined, opts?: import("swrv/dist/types").revalidateOptions | undefined) => Promise<void>;
    };
    useDebounce: (initialQuery: string, delay?: number) => {
        query: Ref<string>;
        search: (q: string) => void;
    };
    clientSideSorter: (key: string, previousKey: string, sortOrder: string, items: []) => {
        previousKey: string;
        sortOrder: string;
    };
    useSwrvStates: (response: Ref<any>, error: Ref<any>, isValidating: Ref<boolean>) => {
        state: Ref<string>;
        swrvState: {
            VALIDATING: string;
            VALIDATING_HAS_DATA: string;
            PENDING: string;
            SUCCESS: string;
            SUCCESS_HAS_DATA: string;
            ERROR: string;
            STALE_IF_ERROR: string;
        };
    };
    getSizeFromString: (sizeStr: string) => string;
};
