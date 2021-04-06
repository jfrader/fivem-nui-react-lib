import { NuiContext } from "../context/NuiContext";
/**
 * Send requests to the client
 * @returns {{ send: function, sendAbortable: function }} { send: function, sendAbortable: function }
 * @example
 * const { send } = useNuiRequest();
 * return <Button onClick={() => send({ someArgument: 1 })}>Click Me!</Button>
 */
export declare const useNuiRequest: () => Pick<NuiContext, "send" | "sendAbortable">;
