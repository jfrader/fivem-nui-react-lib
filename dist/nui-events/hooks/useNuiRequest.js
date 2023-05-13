"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNuiRequest = void 0;
var react_1 = require("react");
var NuiContext_1 = require("../context/NuiContext");
/**
 * @typedef {Object} useNuiRequestResponse
 * @property {number} send - Method to send an event to the server
 * @property {number} sendAbortable - Same as send but able to abort mission :)
 *
 * @function sendFn
 * @param {string} event
 * @param {any} data
 *
 * @function sendAbortableFn
 * @param {string} event
 * @param {any} data
 */
/**
 * Send requests to the client
 * @param {Object} [options]
 * @param {string} [options.resource] override the provider resource name with the resource name to send the event to
 * @returns {useNuiRequestResponse} object with send event method
 * @example
 * const { send } = useNuiRequest();
 * const { send: sendToAnotherResource } = useNuiRequest("another-resource");
 *
 * return <NuiProvider resource="phone-resource">
 *   <Button onClick={() => send({ resourceOneArgument: 1 })}>Send to Phone Resource</Button>
 *   <Button onClick={() => sendToAnotherResource({ resourceTwoArgument: 2 })}>Send to Another Resource</Button>
 * </NuiProvider>
 *
 */
var useNuiRequest = function (_a) {
    var _b = _a === void 0 ? {} : _a, resource = _b.resource;
    var context = react_1.useContext(NuiContext_1.NuiContext);
    if (!context) {
        throw new Error("fivem-nui-react-lib: useNuiRequest must be used inside NuiProvider passing the `resource` prop");
    }
    var send = context.send, sendAbortable = context.sendAbortable;
    return react_1.useMemo(function () { return ({
        send: function (event, data) {
            if (data === void 0) { data = {}; }
            return send(event, data, resource);
        },
        sendAbortable: function (event, data) {
            if (data === void 0) { data = {}; }
            return sendAbortable(event, data, resource);
        },
    }); }, [send, sendAbortable, resource]);
};
exports.useNuiRequest = useNuiRequest;
