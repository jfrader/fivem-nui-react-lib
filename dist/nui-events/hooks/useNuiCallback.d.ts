declare type UseNuiCallbackFetchOptions = {
    timeout: number | false;
};
declare type UseNuiCallbackFetch<I> = (input?: I, options?: UseNuiCallbackFetchOptions) => void;
declare type UseNuiCallbackResponse<I, R> = [UseNuiCallbackFetch<I>, {
    loading: boolean;
    error: unknown;
    response: R;
}];
/**
 * @callback nuiEventHandler
 * @param {any} responseData
 *
 * @callback nuiEventErrorHandler
 * @param {any} responseError
 *
 * @function nuiFetchFn
 * @param {any} data - Request body
 * @param {Object} options - Fetch options
 * @param {string} options.timeout - Timeout to stop waiting for callback response in milliseconds.
 */
/**
 * Make a callback to "myEvent" by sending back "myEventSuccess" or "myEventError" from the client
 * @param {string} app needs to be the same here and in the success and error response events
 * @param {string} method the event name which is sent to client
 * @param {nuiEventHandler} [handler] receive the data sent by the client when success
 * @param {nuiEventErrorHandler} [errHandler]  receive the data sent by the client when errored
 * @returns {[nuiFetchFn, { loading, error, response }]} [fetchFn, { loading, error, response }]
 * @example
 * const [user, setUser] = useState<IUser>(null)
 * const [fetchUser, { loading, error, response }] = useNuiCallback<number, IUser>("appname", "fetchUser", setUser);
 * useEffect(() => {
 *  fetchUser(11);
 * }, [fetchUser]);
 */
export declare const useNuiCallback: <I = unknown, R = unknown>(app: string, method: string, handler?: (res: R) => void, errHandler?: (err: unknown) => void) => UseNuiCallbackResponse<I, R>;
export {};
