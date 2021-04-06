"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNuiRequest = void 0;
var react_1 = require("react");
var NuiContext_1 = require("../context/NuiContext");
/**
 * Send requests to the client
 * @returns { send: (method: string) => void, sendAbortable: (method: string) => { abort: () => void, promise: Promise } }
 */
var useNuiRequest = function () {
  var context = react_1.useContext(NuiContext_1.NuiContext);
  if (!context) {
    throw new Error("fivem-nui-react-lib: useNuiRequest must be used inside NuiProvider passing the `resource` prop");
  }
  var send = context.send,
    sendAbortable = context.sendAbortable;
  return { send: send, sendAbortable: sendAbortable };
};
exports.useNuiRequest = useNuiRequest;
