export interface IAbortableFetch {
    abort: () => void;
    promise: Promise<Response>;
}
declare const _default: {
    send(event: any, data?: {}): Promise<Response>;
    sendAbortable(event: any, data?: {}): IAbortableFetch;
};
export default _default;
