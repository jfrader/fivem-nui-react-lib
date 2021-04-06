import { useContext } from "react";
import { NuiServiceContext } from "../context/NuiServiceContext";
export var useNuiRequest = function () {
  var context = useContext(NuiServiceContext);
  if (!context) {
    throw new Error(
      "fivem-nui-react-lib: useNuiReques1 must be used inside NuiServiceProvider passing the resource prop"
    );
  }
  var send = context.send,
    sendAbortable = context.sendAbortable;
  return { send: send, sendAbortable: sendAbortable };
};
