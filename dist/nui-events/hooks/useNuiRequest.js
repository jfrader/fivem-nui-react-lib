import { useContext } from "react";
import { NuiContext } from "../context/NuiContext";
export var useNuiRequest = function () {
  var context = useContext(NuiContext);
  if (!context) {
    throw new Error("fivem-nui-react-lib: useNuiRequest must be used inside NuiProvider passing the `resource` prop");
  }
  var send = context.send,
    sendAbortable = context.sendAbortable;
  return { send: send, sendAbortable: sendAbortable };
};
