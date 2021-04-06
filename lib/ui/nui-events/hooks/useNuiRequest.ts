import { useContext } from "react";
import { NuiContext } from "../context/NuiContext";

/**
 * Send requests to the client
 * @returns {{ send: function, sendAbortable: function }} { send: function, sendAbortable: function }
 * @example
 * const { send } = useNuiRequest();
 * return <Button onClick={() => send({ someArgument: 1 })}>Click Me!</Button>
 */
export const useNuiRequest = (): Pick<NuiContext, "send" | "sendAbortable"> => {
  const context = useContext(NuiContext);

  if (!context) {
    throw new Error("fivem-nui-react-lib: useNuiRequest must be used inside NuiProvider passing the `resource` prop");
  }

  const { send, sendAbortable } = context;
  return { send, sendAbortable };
};
