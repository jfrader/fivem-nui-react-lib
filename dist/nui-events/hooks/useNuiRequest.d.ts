import { NuiContext } from "../context/NuiContext";
/**
 * Send requests to the client
 * @returns {{ send: function, sendAbortable: function }}
 */
export declare const useNuiRequest: () => Pick<NuiContext, "send" | "sendAbortable">;
