import * as actions from './actions';


export default (state = {}, action) => {
  switch (action.type) {
    case actions.SET_PROFILE.END:
    case actions.INIT.END:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};
