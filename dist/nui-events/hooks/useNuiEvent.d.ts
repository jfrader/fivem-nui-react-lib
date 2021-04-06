/**
 * A hook to receive data from the client in the following schema:
 *
 * {
 *   "app": "app-name",
 *   "method": "method-name",
 *   "data": { anyValue: 1 }
 * }
 *
 * @param app The app name which the client will emit to
 * @param method The specific `method` field that should be listened for.
 * @param handler The callback function that will handle data received from the client
 **/
export declare const useNuiEvent: <D = unknown>(app: string, method: string, handler: (r: D) => void) => void;
