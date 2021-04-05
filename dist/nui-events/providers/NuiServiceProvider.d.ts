/// <reference types="react" />
export interface IAbortableFetch {
    abort: () => void;
    promise: Promise<Response>;
}
export declare const NuiServiceProvider: ({ resource, children, }: {
    resource: string;
    children: JSX.Element;
}) => JSX.Element;
