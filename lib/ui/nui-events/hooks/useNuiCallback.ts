import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NuiContext } from "../context/NuiContext";
import { IAbortableFetch } from "../providers/NuiProvider";
import { eventNameFactory } from "../utils/eventNameFactory";
import { useNuiEvent } from "./useNuiEvent";

type UseNuiCallbackResponse<I, R> = [(d?: I) => void, { loading: boolean; error: unknown; response: R }];

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

  const [timedOut, setTimedOut] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
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

  // React to loading change and starting timeout timer.
  useEffect(() => {
    if (loading && !timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setTimedOut(true);
        onError(
          new Error(
            `fivem-nui-react-lib: "${eventNameRef.current}" event callback timed out after ${callbackTimeout} milliseconds`
          )
        );
        fetchRef.current && fetchRef.current.abort();
        timeoutRef.current = undefined;
        fetchRef.current = undefined;
      }, 10000);
    }
  }, [loading, onError]);

  // Handle the success and error events for this method
  useNuiEvent(appNameRef.current, `${methodNameRef.current}Success`, onSuccess);
  useNuiEvent(appNameRef.current, `${methodNameRef.current}Error`, onError);

  // Only fetch if we are not loading/waiting the events.
  const fetch = useCallback((data?: I) => {
    setLoading((curr) => {
      if (!curr) {
        fetchRef.current = sendAbortable(methodNameRef.current, data);
        return true;
      }
      return curr;
    });
  }, []);

  return [fetch, { loading, response, error }];
};
