import { WordArray } from "crypto-js";

export enum ActionTypes {
  DECRYPT_BEGIN = "APP_CONTENT_DECRYPT_BEGIN",
  DECRYPT_END = "APP_CONTENT_DECRYPT_END",
  DECRYPT_CRASH = "APP_CONTENT_DECRYPT_CRASH",
  RESET = "APP_CONTENT_RESET",
}

type SlotIdParams = {
  id: number;
};

export type DecryptBeginAction = SlotIdParams & {
  type: ActionTypes.DECRYPT_BEGIN;
  password: string;
};

export type DecryptEndAction = SlotIdParams & {
  type: ActionTypes.DECRYPT_END;
  key: WordArray;
  value: string;
};

export type DecryptCrashAction = SlotIdParams & {
  type: ActionTypes.DECRYPT_CRASH;
  error: Error
};

export type ResetAction = {
  type: ActionTypes.RESET;
  id?: number;
};

export type Actions = DecryptBeginAction | DecryptEndAction
  | DecryptCrashAction | ResetAction;

export const decrypt = {
  begin: ({ id, password }: Omit<DecryptBeginAction, "type">) => ({
    id,
    password,
    type: ActionTypes.DECRYPT_BEGIN,
  }),
  end: ({ id, key, value }: Omit<DecryptEndAction, "type">) => ({
    id,
    value,
    key,
    type: ActionTypes.DECRYPT_END,
  }),
  crash: ({ id, error }: Omit<DecryptCrashAction, "type">) => ({
    id,
    error,
    type: ActionTypes.DECRYPT_CRASH,
  }),
};

export const reset = (id?: number) => ({ id, type: ActionTypes.RESET });
