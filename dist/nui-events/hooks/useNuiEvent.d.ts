/**
 * A hook that manage events listeners for receiving data from the NUI
 * @param app The app name in which this hoook is used
 * @param method The specific `method` field that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 **/
export declare const useNuiEvent: <S = Record<string, unknown>>(app: string, method: string, handler: Function) => void;
