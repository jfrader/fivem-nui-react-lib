export declare const useNuiRequest: () => {
    send: (e: string, data?: unknown) => Promise<Response>;
    sendAbortable: (e: string, data: unknown) => import("../..").IAbortableFetch;
};
