/**
 * @callback nuiEventHandler
 * @param {any} responseData
 */
/**
 * A hook to receive data from the client in the following schema:
 *
 * {
 *   "app": "app-name",
 *   "method": "method-name",
 *   "data": { anyValue: 1 }
 * }
 *
 * @param {string} app The app name which the client will emit to
 * @param {string} method  The specific `method` field that should be listened for.
 * @param {nuiEventHandler} handler The callback function that will handle the data received from the server
 *
 * @example
 * const [dataState, setDataState] = useState<boolean>();
 * useNuiEvent<boolean>("appname", "methodname", setDataState);
 **/
export declare const useNuiEvent: <D = unknown>(app: string, method: string, handler: (r: D) => void) => void;
