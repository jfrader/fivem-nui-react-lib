import { useEffect, useRef } from "react";
import { eventNameFactory } from "../utils/nuiUtils";
function addEventListener(element, type, handler) {
    element.addEventListener(type, handler);
}
var defaultOptions = {};
/**
 * A hook that manage events listeners for receiving data from the NUI
 * @param app The app name in which this hoook is used
 * @param method The specific `method` field that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 **/
export var useNuiEvent = function (app, method, handler) {
    var savedHandler = useRef();
    // When handler value changes set mutable ref to handler val
    useEffect(function () {
        savedHandler.current = handler;
    }, [handler]);
    // Will run every rerender
    useEffect(function () {
        var eventName = eventNameFactory(app, method);
        var eventListener = function (event) {
            if (savedHandler.current && savedHandler.current.call) {
                var data = event.data;
                var newData = data;
                savedHandler.current(newData);
            }
        };
        addEventListener(window, eventName, eventListener);
        // Remove Event Listener on component cleanup
        return function () { return window.removeEventListener(eventName, eventListener); };
    }, [app, method]);
};
