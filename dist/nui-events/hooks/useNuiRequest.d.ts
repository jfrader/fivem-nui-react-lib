import { NuiContext } from "../context/NuiContext";
/**
 * Send requests to the client
 * @returns { send: (method: string) => void, sendAbortable: (method: string) => { abort: () => void, promise: Promise } }
 */
export declare const useNuiRequest: () => Pick<NuiContext, "send" | "sendAbortable">;
