export declare type FetchData = Record<string, any> | boolean | null | undefined | string | number;
declare type UseNuiFetchResponse<I, R> = [
    (data?: I) => void,
    {
        response: R;
        error: Error | unknown;
        loading: boolean;
    }
];
export declare function useNuiFetch<I = FetchData, R = FetchData>(event: string, handler?: (d?: R) => void): UseNuiFetchResponse<I, R>;
export {};
