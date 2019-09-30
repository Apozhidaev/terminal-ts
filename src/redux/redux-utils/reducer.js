
// eslint-disable-next-line import/prefer-default-export
export function applyReducers(reducers, previosState, actionValue) {
  return Object.keys(reducers).reduce((state, key) => {
    const value = reducers[key](state[key], actionValue);
    if (value !== state[key]) {
      return {
        ...state,
        [key]: value,
      };
    }
    return state;
  }, previosState);
}
