import { useContext } from "react";
import { NuiServiceContext } from "../context/NuiServiceContext";

export const useNuiRequest = (): Pick<NuiServiceContext, "send" | "sendAbortable"> => {
  const context = useContext(NuiServiceContext);

  if (!context) {
    throw new Error(
      "fivem-nui-react-lib: useNuiReques1 must be used inside NuiServiceProvider passing the resource prop"
    );
  }

  const { send, sendAbortable } = context;
  return { send, sendAbortable };
};
