declare type UseNuiCallbackResponse<I, R> = [
  (d?: I) => void,
  {
    loading: boolean;
    error: unknown;
    response: R;
  }
];
export declare const useNuiCallback: <I = unknown, R = unknown>(
  app: string,
  method: string,
  handler?: (res: R) => void,
  errHandler?: (err: unknown) => void
) => UseNuiCallbackResponse<I, R>;
export {};
