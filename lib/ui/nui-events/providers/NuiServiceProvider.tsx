import React from "react";
import { useCallback, useEffect, useRef } from "react";
import { NuiServiceContext } from "../context/NuiServiceContext";
import { eventNameFactory } from "../utils/eventNameFactory";

export interface IAbortableFetch {
  abort: () => void;
  promise: Promise<Response>;
}

function abortableFetch(request, opts): IAbortableFetch {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    promise: fetch(request, { ...opts, signal }),
  };
}

function getParams(resource, event, data): [RequestInfo, RequestInit] {
  return [
    `https://${resource}/${event}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    },
  ];
}

const DEFAULT_TIMEOUT = 10000;

export const NuiServiceProvider = ({
  resource,
  children,
  timeout,
}: {
  timeout?: number;
  resource: string;
  children: JSX.Element;
}): JSX.Element => {
  const resourceRef = useRef<string>();

  const eventListener = (event: {
    data: { app: string; method: string; data: unknown };
  }) => {
    const { app, method, data } = event.data;
    if (app && method) {
      window.dispatchEvent(
        new MessageEvent(eventNameFactory(app, method), {
          data,
        })
      );
    }
  };

  useEffect(() => {
    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, []);

  const send = useCallback(async (event: string, data = {}) => {
    return fetch(...getParams(resource, event, data));
  }, []);

  const sendAbortable = useCallback(
    (event: string, data = {}): IAbortableFetch => {
      return abortableFetch(...getParams(resource, event, data));
    },
    []
  );

  return (
    <NuiServiceContext.Provider
      value={{
        resource: resourceRef.current,
        send,
        sendAbortable,
        callbackTimeout: timeout || DEFAULT_TIMEOUT,
      }}
    >
      {children}
    </NuiServiceContext.Provider>
  );
};
