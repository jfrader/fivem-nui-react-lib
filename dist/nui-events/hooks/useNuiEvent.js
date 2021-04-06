"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNuiEvent = void 0;
var react_1 = require("react");
var eventNameFactory_1 = require("../utils/eventNameFactory");
function addEventListener(element, type, handler) {
  element.addEventListener(type, handler);
}
/**
 * A hook that manage events listeners for receiving data from the NUI
 * @param app The app name in which this hoook is used
 * @param method The specific `method` field that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 **/
var useNuiEvent = function (app, method, handler) {
  var savedHandler = react_1.useRef();
  // When handler value changes set mutable ref to handler val
  react_1.useEffect(
    function () {
      savedHandler.current = handler;
    },
    [handler]
  );
  // Will run every rerender
  react_1.useEffect(
    function () {
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
      return function () {
        return window.removeEventListener(eventName, eventListener);
      };
    },
    [app, method]
  );
};
exports.useNuiEvent = useNuiEvent;
