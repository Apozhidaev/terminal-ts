import * as actions from './actions';


const content = (state = {
  value: '',
  password: '',
  encrypted: false,
}, action) => {
  switch (action.type) {
    case actions.INIT:
      return {
        value: action.value,
        password: action.password,
        encrypted: action.encrypted,
      };
    case actions.SET_VALUE:
      return {
        ...state,
        value: action.value,
      };
    case actions.SET_ENCRYPTED:
      return {
        ...state,
        encrypted: action.encrypted,
      };
    case actions.SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
};

export default content;
