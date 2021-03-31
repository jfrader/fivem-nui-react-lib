import { useCallback, useEffect, useRef, useState } from 'react';
import Nui from '../utils/Nui';
import { eventNameFactory } from '../utils/nuiUtils';
import { useNuiEvent } from './useNuiEvent';
export var useNuiEventCallback = function (app, method, handler, errHandler) {
    var fetchRef = useRef();
    var timeoutRef = useRef();
    // These are Refs to avoid re renders.
    // We dont care if "app" and "method" arguments change.
    var eventNameRef = useRef(eventNameFactory(app, method));
    var methodNameRef = useRef(method);
    var appNameRef = useRef(app);
    var _a = useState(false), timedOut = _a[0], setTimedOut = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    var _d = useState(null), response = _d[0], setResponse = _d[1];
    var onSuccess = useCallback(function (data) {
        if (!loading) {
            return;
        }
        // If we receive eventNameSuccess event, clear timeout
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
    }, [handler, timedOut, loading]);
    var onError = useCallback(function (err) {
        if (!loading) {
            return;
        }
        // If we receive eventNameSuccess event, clear timeout
        timeoutRef.current && clearTimeout(timeoutRef.current);
        // Set new state after error event received
        setError(err);
        setResponse(null);
        setLoading(false);
        errHandler === null || errHandler === void 0 ? void 0 : errHandler(err);
    }, [errHandler, timedOut, loading]);
    // React to loading change and starting timeout timer.
    useEffect(function () {
        if (loading && !timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(function () {
                setTimedOut(true);
                onError(new Error(eventNameRef.current + " NUI Event Callback timed out after 10000 seconds"));
                fetchRef.current && fetchRef.current.abort();
                timeoutRef.current = undefined;
                fetchRef.current = undefined;
            }, 10000);
        }
    }, [loading, onError]);
    // Handle the success and error events for this method
    useNuiEvent(appNameRef.current, methodNameRef.current + "Success", onSuccess);
    useNuiEvent(appNameRef.current, methodNameRef.current + "Error", onError);
    // Only fetch if we are not loading/waiting the events.
    var fetch = useCallback(function (data) {
        setLoading(function (curr) {
            if (!curr) {
                fetchRef.current = Nui.sendAbortable(methodNameRef.current, data);
                return true;
            }
            return curr;
        });
    }, []);
    return [fetch, { loading: loading, response: response, error: error }];
};
