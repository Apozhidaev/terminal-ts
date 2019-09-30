import {
  action,
  actionType,
  flowType,
  SERVICES,
  STORAGE,
} from '../../redux-utils';

const newType = (type) => actionType(SERVICES, STORAGE, type);
const newFlowType = (type) => flowType(newType(type));

export const INIT = flowType('INIT');
export const SET_PROFILE = flowType('SET_PROFILE');
export const CLEAR = newType('CLEAR');
export const UPDATE_DICTIONARY = newFlowType('UPDATE_DICTIONARY');


export const init = {
  begin: () => action(INIT.BEGIN),
  end: ({ profile, keyValues }) => action(INIT.END, { profile, keyValues }),
};

export const setProfile = {
  begin: ({
    token,
    name,
    password,
    local,
  }) => action(SET_PROFILE.BEGIN, {
    token,
    name,
    password,
    local,
  }),
  end: ({ profile }) => action(SET_PROFILE.END, { profile }),
};

export const clear = () => action(CLEAR);

export const updateDictionary = {
  begin: ({ keyValues }) => action(UPDATE_DICTIONARY.BEGIN, { keyValues }),
  end: ({ sync, keyValues }) => action(UPDATE_DICTIONARY.END, {
    sync,
    keyValues,
  }),
};
