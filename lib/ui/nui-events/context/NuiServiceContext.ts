import { createContext } from "react";
import { IAbortableFetch } from "../providers/NuiServiceProvider";

export interface NuiServiceContext {
  resource: string;
  send: (e: string, data: unknown) => Promise<Response>;
  sendAbortable: (e: string, data: unknown) => IAbortableFetch;
}

export const NuiServiceContext = createContext<NuiServiceContext>(null);
