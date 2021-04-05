import { createContext } from "react";

export interface IAbortableFetch {
  abort: () => void;
  promise: Promise<Response>;
}

export interface NuiServiceContext {
  resource: string;
  send: (e: string, data: unknown) => Promise<Response>;
  sendAbortable: (e: string, data: unknown) => IAbortableFetch;
}

export const NuiServiceContext = createContext<NuiServiceContext>(null);
