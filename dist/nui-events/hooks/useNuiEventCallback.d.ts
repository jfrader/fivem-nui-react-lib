declare type UseNuiEventCallbackResponse<I, R> = [
    (d?: I) => void,
    {
        loading: boolean;
        error: unknown;
        response: R;
    }
];
export declare const useNuiEventCallback: <I = unknown, R = unknown>(app: string, method: string, handler?: (res: R) => void, errHandler?: (err: unknown) => void) => UseNuiEventCallbackResponse<I, R>;
export {};
