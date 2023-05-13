import { NuiContext } from "../context/NuiContext";
declare type UseNuiRequestOptions = {
    resource?: string;
};
/**
 * @typedef {Object} useNuiRequestResponse
 * @property {number} send - Method to send an event to the server
 * @property {number} sendAbortable - Same as send but able to abort mission :)
 *
 * @function sendFn
 * @param {string} event
 * @param {any} data
 *
 * @function sendAbortableFn
 * @param {string} event
 * @param {any} data
 */
/**
 * Send requests to the client
 * @param {Object} [options]
 * @param {string} [options.resource] override the provider resource name with the resource name to send the event to
 * @returns {useNuiRequestResponse} object with send event method
 * @example
 * const { send } = useNuiRequest();
 * const { send: sendToAnotherResource } = useNuiRequest("another-resource");
 *
 * return <NuiProvider resource="phone-resource">
 *   <Button onClick={() => send({ resourceOneArgument: 1 })}>Send to Phone Resource</Button>
 *   <Button onClick={() => sendToAnotherResource({ resourceTwoArgument: 2 })}>Send to Another Resource</Button>
 * </NuiProvider>
 *
 */
export declare const useNuiRequest: ({ resource }?: UseNuiRequestOptions) => Pick<NuiContext, "send" | "sendAbortable">;
export {};
