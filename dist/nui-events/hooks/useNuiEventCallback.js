console.warn("@ useNuiEventCallback is deprecated, please use useNuiCallback instead");
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NuiContext } from "../context/NuiContext";
import { eventNameFactory } from "../utils/eventNameFactory";
import { useNuiEvent } from "./useNuiEvent";
export var useNuiEventCallback = function (app, method, handler, errHandler) {
  var _a = useContext(NuiContext),
    sendAbortable = _a.sendAbortable,
    callbackTimeout = _a.callbackTimeout;
  var fetchRef = useRef();
  var timeoutRef = useRef();
  // These are Refs to avoid re renders.
  // We dont care if "app" and "method" arguments change.
  var eventNameRef = useRef(eventNameFactory(app, method));
  var methodNameRef = useRef(method);
  var appNameRef = useRef(app);
  var _b = useState(false),
    timedOut = _b[0],
    setTimedOut = _b[1];
  var _c = useState(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = useState(null),
    error = _d[0],
    setError = _d[1];
  var _e = useState(null),
    response = _e[0],
    setResponse = _e[1];
  var onSuccess = useCallback(
    function (data) {
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
      handler === null || handler === void 0 ? void 0 : handler(data);
    },
    [handler, timedOut, loading]
  );
  var onError = useCallback(
    function (err) {
      // If we receive error event, clear timeout
      timeoutRef.current && clearTimeout(timeoutRef.current);
      // Set new state after error event received
      setError(err);
      setResponse(null);
      setLoading(false);
      errHandler === null || errHandler === void 0 ? void 0 : errHandler(err);
    },
    [errHandler]
  );
  // React to loading change and starting timeout timer.
  useEffect(
    function () {
      if (loading && !timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(function () {
          setTimedOut(true);
          onError(
            new Error(
              'fivem-nui-react-lib: "' +
                eventNameRef.current +
                '" event callback timed out after ' +
                callbackTimeout +
                " milliseconds"
            )
          );
          fetchRef.current && fetchRef.current.abort();
          timeoutRef.current = undefined;
          fetchRef.current = undefined;
        }, 10000);
      }
    },
    [loading, onError]
  );
  // Handle the success and error events for this method
  useNuiEvent(appNameRef.current, methodNameRef.current + "Success", onSuccess);
  useNuiEvent(appNameRef.current, methodNameRef.current + "Error", onError);
  // Only fetch if we are not loading/waiting the events.
  var fetch = useCallback(function (data) {
    setLoading(function (curr) {
      if (!curr) {
        fetchRef.current = sendAbortable(methodNameRef.current, data);
        return true;
      }
      return curr;
    });
  }, []);
  return [fetch, { loading: loading, response: response, error: error }];
};
