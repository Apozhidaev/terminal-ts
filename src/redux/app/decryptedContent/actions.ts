import { action } from '../../redux-utils';

export enum ActionTypes {
  DECRYPT_BEGIN = 'APP_CONTENT_DECRYPT_BEGIN',
  DECRYPT_END = 'APP_CONTENT_DECRYPT_END',
  DECRYPT_CRASH = 'APP_CONTENT_DECRYPT_CRASH',
  RESET = 'APP_CONTENT_RESET',
}

type SlotIdParams = {
  id: number;
};

type DecryptBeginAction = SlotIdParams & {
  type: ActionTypes.DECRYPT_BEGIN;
  password: string;
};

type DecryptEndAction = SlotIdParams & {
  type: ActionTypes.DECRYPT_END;
  key: any;
  value: string;
};

type DecryptCrashAction = SlotIdParams & {
  type: ActionTypes.DECRYPT_CRASH;
  error: Error
};

type ResetAction = {
  type: ActionTypes.RESET;
  id?: number;
};

export type Actions = DecryptBeginAction | DecryptEndAction
  | DecryptCrashAction | ResetAction;

export const decrypt = {
  begin: ({ id, password }: Omit<DecryptBeginAction, 'type'>) => action(ActionTypes.DECRYPT_BEGIN, { id, password }),
  end: ({ id, key, value }: Omit<DecryptEndAction, 'type'>) => action(ActionTypes.DECRYPT_END, { id, value, key }),
  crash: ({ id, error }: Omit<DecryptCrashAction, 'type'>) => action(ActionTypes.DECRYPT_CRASH, { id, error }),
};

export const reset = (id: number) => action(ActionTypes.RESET, { id });
