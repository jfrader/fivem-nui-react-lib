import { useCallback, useContext, useRef, useState } from "react";
import { NuiContext } from "../context/NuiContext";
import { IAbortableFetch } from "../providers/NuiProvider";
import { eventNameFactory } from "../utils/eventNameFactory";
import { useNuiEvent } from "./useNuiEvent";

type UseNuiCallbackFetchOptions = {
  timeout: number | false;
};

type UseNuiCallbackFetch<I> = (input?: I, options?: UseNuiCallbackFetchOptions) => void;

type UseNuiCallbackResponse<I, R> = [UseNuiCallbackFetch<I>, { loading: boolean; error: unknown; response: R }];

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
export const useNuiCallback = <I = unknown, R = unknown>(
  app: string,
  method: string,
  handler?: (res: R) => void,
  errHandler?: (err: unknown) => void
): UseNuiCallbackResponse<I, R> => {
  const { sendAbortable, callbackTimeout } = useContext(NuiContext);

  const fetchRef = useRef<IAbortableFetch>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  // These are Refs to avoid re renders.
  // We dont care if "app" and "method" arguments change.
  const eventNameRef = useRef<string>(eventNameFactory(app, method));
  const methodNameRef = useRef<string>(method);
  const appNameRef = useRef<string>(app);

  // has timed out
  const [timedOut, setTimedOut] = useState<boolean>(false);

  // has failed at network or browser level
  const [failed, setFailed] = useState<boolean>(false);

  // is waiting for server callback response event
  const [loading, setLoading] = useState<boolean>(false);

  // returned error from server callback event or network failure
  const [error, setError] = useState<unknown>(null);

  // response from server callback event
  const [response, setResponse] = useState<R>(null);

  const onSuccess = useCallback(
    (data: R) => {
      if (!loading) {
        return;
      }
      // If we receive success event, clear timeout
      timeoutRef.current && clearTimeout(timeoutRef.current);
      // If already timed out, don't do shit :)
      if (timedOut) {
        return;
      }
      // Set new state after success event received
      setResponse(data);
      setError(null);
      setLoading(false);
      handler?.(data);
    },
    [handler, timedOut, loading]
  );

  const onError = useCallback(
    (err: unknown) => {
      // If we receive error event, clear timeout
      timeoutRef.current && clearTimeout(timeoutRef.current);
      // Set new state after error event received
      setError(err);
      setResponse(null);
      setLoading(false);
      errHandler?.(err);
    },
    [errHandler]
  );

  // Handle the success and error events for this method
  useNuiEvent(appNameRef.current, `${methodNameRef.current}Success`, onSuccess);
  useNuiEvent(appNameRef.current, `${methodNameRef.current}Error`, onError);

  // Only fetch if we are not loading/waiting the events.
  const fetch = useCallback(
    (data?: I, options?: UseNuiCallbackFetchOptions) => {
      setLoading((curr) => {
        if (!curr) {
          setTimedOut(false);
          setFailed(false);
          setError(null);
          setResponse(null);
          fetchRef.current = sendAbortable(methodNameRef.current, data);

          fetchRef.current.promise.catch((e) => {
            if (!timedOut) {
              onError(e);
              setFailed(true);
              timeoutRef.current = undefined;
              fetchRef.current = undefined;
            }
          });

          const _options = options || { timeout: callbackTimeout };
          const timeoutTime = _options.timeout === false ? false : _options.timeout || callbackTimeout;

          if (timeoutTime && !failed) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setTimedOut(true);
              onError(
                new Error(
                  `fivem-nui-react-lib: "${eventNameRef.current}" event callback timed out after ${timeoutTime} milliseconds`
                )
              );
              fetchRef.current && fetchRef.current.abort();
              timeoutRef.current = undefined;
              fetchRef.current = undefined;
            }, timeoutTime);
          }

          return true;
        }
        return curr;
      });
    },
    [callbackTimeout, failed, onError, sendAbortable, timedOut]
  );

  return [fetch, { loading, response, error }];
};
