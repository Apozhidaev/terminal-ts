export enum ActionTypes {
  INIT_BEGIN = 'SERVICES_STORAGE_INIT_BEGIN',
  INIT_END = 'SERVICES_STORAGE_INIT_END',
  SET_PROFILE_BEGIN = 'SERVICES_STORAGE_SET_PROFILE_BEGIN',
  SET_PROFILE_END = 'SERVICES_STORAGE_SET_PROFILE_END',
  CLEAR = 'SERVICES_STORAGE_CLEAR',
  UPDATE_DICTIONARY_BEGIN = 'SERVICES_STORAGE_UPDATE_DICTIONARY_BEGIN',
  UPDATE_DICTIONARY_END = 'SERVICES_STORAGE_UPDATE_DICTIONARY_END',
}

export type InitBeginAction = {
  type: ActionTypes.INIT_BEGIN;
};

export type InitEndAction = {
  type: ActionTypes.INIT_END;
  profile: any;
  keyValues: any;
};

type LocalProfile = {
  local: true;
  token?: string;
  name?: string;
  password?: string;
};

type BackupProfile = {
  local?: false;
  token: string;
  name: string;
  password: string;
};

type Profile = LocalProfile | BackupProfile;

export type SetProfileBeginAction = {
  type: ActionTypes.SET_PROFILE_BEGIN;
} & Profile;

export type SetProfileEndAction = {
  type: ActionTypes.SET_PROFILE_END;
  profile: any;
};

export type ClearAction = {
  type: ActionTypes.CLEAR;
};

export type UpdateDictionaryBeginAction = {
  type: ActionTypes.UPDATE_DICTIONARY_BEGIN;
  keyValues: any;
};

export type UpdateDictionaryEndAction = {
  type: ActionTypes.UPDATE_DICTIONARY_END;
  sync: number;
  keyValues: any;
};

export type Actions = InitBeginAction | InitEndAction | SetProfileBeginAction | SetProfileEndAction
  | ClearAction | UpdateDictionaryBeginAction | UpdateDictionaryEndAction;

export const init = {
  begin: () => ({ type: ActionTypes.INIT_BEGIN }),
  end: ({ profile, keyValues }: Omit<InitEndAction, 'type'>) => ({
    profile,
    keyValues,
    type: ActionTypes.INIT_END,
  }),
};

export const setProfile = {
  begin: ({ token, name, password, local }: Profile) => ({
    token,
    name,
    password,
    local,
    type: ActionTypes.SET_PROFILE_BEGIN,
  }),
  end: ({ profile }: Omit<SetProfileEndAction, 'type'>) => ({ profile, type: ActionTypes.SET_PROFILE_END }),
};

export const clear = () => ({ type: ActionTypes.CLEAR });

export const updateDictionary = {
  begin: ({ keyValues }: Omit<UpdateDictionaryBeginAction, 'type'>) => ({
    keyValues,
    type: ActionTypes.UPDATE_DICTIONARY_BEGIN,
  }),
  end: ({ sync, keyValues }: Omit<UpdateDictionaryEndAction, 'type'>) => ({
    sync,
    keyValues,
    type: ActionTypes.UPDATE_DICTIONARY_END,
  }),
};
