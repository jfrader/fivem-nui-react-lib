"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNuiEvent = void 0;
var react_1 = require("react");
var eventNameFactory_1 = require("../utils/eventNameFactory");
function addEventListener(element, type, handler) {
    element.addEventListener(type, handler);
}
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
var useNuiEvent = function (app, method, handler) {
    var savedHandler = react_1.useRef();
    // When handler value changes set mutable ref to handler val
    react_1.useEffect(function () {
        savedHandler.current = handler;
    }, [handler]);
    react_1.useEffect(function () {
        var eventName = eventNameFactory_1.eventNameFactory(app, method);
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
exports.useNuiEvent = useNuiEvent;
