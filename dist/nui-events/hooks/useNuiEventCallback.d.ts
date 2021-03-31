declare type UseNuiEventCallbackResponse<I, R> = [
    (d?: I) => void,
    {
        loading: boolean;
        error: any;
        response: R;
    }
];
export declare const useNuiEventCallback: <I = unknown, R = unknown>(app: string, method: string, handler?: (res: R) => void, errHandler?: Function) => UseNuiEventCallbackResponse<I, R>;
export {};
