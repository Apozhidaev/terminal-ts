export enum ActionTypes {
  INIT = 'APP_EDIT_CONTENT_INIT',
  SET_VALUE = 'APP_EDIT_CONTENT_SET_VALUE',
  SET_ENCRYPTED = 'APP_EDIT_CONTENT_SET_ENCRYPTED',
  SET_PASSWORD = 'APP_EDIT_CONTENT_SET_PASSWORD',
}

type InitParams = {
  value: string,
  encrypted: boolean,
  password: string,
};

type InitAction = InitParams & {
  type: ActionTypes.INIT;
};

type SetValueAction = {
  type: ActionTypes.SET_VALUE;
  value: string;
};

type SetEncryptedAction = {
  type: ActionTypes.SET_ENCRYPTED;
  encrypted: boolean;
};

type SetPasswordAction = {
  type: ActionTypes.SET_PASSWORD;
  password: string;
};

export type Actions = InitAction | SetValueAction | SetEncryptedAction | SetPasswordAction;

export const init = ({
  value,
  encrypted,
  password,
}: InitParams) => ({
  value,
  encrypted,
  password,
  type: ActionTypes.INIT,
});
export const setValue = (value: string) => ({ value, type: ActionTypes.SET_VALUE });
export const setEncrypted = (encrypted: boolean) => ({ encrypted, type: ActionTypes.SET_ENCRYPTED });
export const setPassword = (password: string) => ({ password, type: ActionTypes.SET_PASSWORD });
