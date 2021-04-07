"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNuiCallback = void 0;
var react_1 = require("react");
var NuiContext_1 = require("../context/NuiContext");
var eventNameFactory_1 = require("../utils/eventNameFactory");
var useNuiEvent_1 = require("./useNuiEvent");
/**
 * Make a callback to "myEvent" by sending back "myEventSuccess" or "myEventError" from the client
 * @param app {string} needs to be the same here and in the success and error response events
 * @param method {string} the event name which is sent to client
 * @param handler {function} receive the data sent by the client when success
 * @param errHandler {function} receive the data sent by the client when errored
 * @returns {[fetchFn, { loading, error, response }]} [fetchFn, { loading, error, response }]
 * @example
 * const [fetchUser, { loading, error, response }] = useNuiCallback<number, IUser>("appname", "fetchUser");
 * useEffect(() => {
 *  fetchUser(11);
 * }, [fetchUser]);
 */
var useNuiCallback = function (app, method, handler, errHandler) {
  var _a = react_1.useContext(NuiContext_1.NuiContext),
    sendAbortable = _a.sendAbortable,
    callbackTimeout = _a.callbackTimeout;
  var fetchRef = react_1.useRef();
  var timeoutRef = react_1.useRef();
  // These are Refs to avoid re renders.
  // We dont care if "app" and "method" arguments change.
  var eventNameRef = react_1.useRef(eventNameFactory_1.eventNameFactory(app, method));
  var methodNameRef = react_1.useRef(method);
  var appNameRef = react_1.useRef(app);
  var _b = react_1.useState(false),
    timedOut = _b[0],
    setTimedOut = _b[1];
  var _c = react_1.useState(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = react_1.useState(null),
    error = _d[0],
    setError = _d[1];
  var _e = react_1.useState(null),
    response = _e[0],
    setResponse = _e[1];
  var onSuccess = react_1.useCallback(
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
  var onError = react_1.useCallback(
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
  react_1.useEffect(
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
        }, callbackTimeout);
      }
    },
    [loading, onError]
  );
  // Handle the success and error events for this method
  useNuiEvent_1.useNuiEvent(appNameRef.current, methodNameRef.current + "Success", onSuccess);
  useNuiEvent_1.useNuiEvent(appNameRef.current, methodNameRef.current + "Error", onError);
  // Only fetch if we are not loading/waiting the events.
  var fetch = react_1.useCallback(function (data) {
    setLoading(function (curr) {
      if (!curr) {
        setError(null);
        setResponse(null);
        fetchRef.current = sendAbortable(methodNameRef.current, data);
        return true;
      }
      return curr;
    });
  }, []);
  return [fetch, { loading: loading, response: response, error: error }];
};
exports.useNuiCallback = useNuiCallback;
