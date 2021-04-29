"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNuiRequest = void 0;
var react_1 = require("react");
var NuiContext_1 = require("../context/NuiContext");
/**
 * Send requests to the client
 * @returns {{ send: function, sendAbortable: function }} { send: function, sendAbortable: function }
 * @example
 * const { send } = useNuiRequest();
 * return <Button onClick={() => send({ someArgument: 1 })}>Click Me!</Button>
 */
var useNuiRequest = function () {
    var context = react_1.useContext(NuiContext_1.NuiContext);
    if (!context) {
        throw new Error("fivem-nui-react-lib: useNuiRequest must be used inside NuiProvider passing the `resource` prop");
    }
    var send = context.send, sendAbortable = context.sendAbortable;
    return react_1.useMemo(function () { return ({ send: send, sendAbortable: sendAbortable }); }, [send, sendAbortable]);
};
exports.useNuiRequest = useNuiRequest;
