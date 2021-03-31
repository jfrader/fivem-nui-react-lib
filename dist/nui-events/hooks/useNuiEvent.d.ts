interface IOptions {
    capture?: boolean;
    passive?: boolean;
    once?: boolean;
}
export declare const useNuiEvent: <S = Record<string, unknown>>(app: string, method: string, handler: Function, options?: IOptions) => void;
export {};
