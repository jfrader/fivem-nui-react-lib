/// <reference types="react" />
import { IAbortableFetch } from "../providers/NuiProvider";
export interface NuiContext {
    resource: string;
    callbackTimeout: number;
    send: (e: string, data?: unknown) => Promise<Response>;
    sendAbortable: (e: string, data: unknown) => IAbortableFetch;
}
export declare const NuiContext: import("react").Context<NuiContext>;
