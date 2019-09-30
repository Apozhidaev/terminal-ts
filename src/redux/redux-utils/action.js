export function actionType(...types) {
  return types.join('_');
}

export function flowType(...types) {
  const type = actionType(...types);
  return {
    BEGIN: `${type}_BEGIN`,
    END: `${type}_END`,
    CRASH: `${type}_CRASH`,
  };
}

export function fetchType(...types) {
  const type = actionType(...types);
  return {
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`,
  };
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

export function fetchAction(type) {
  return {
    request: params => action(type.REQUEST, { params }),
    success: data => action(type.SUCCESS, { data }),
    failure: error => action(type.FAILURE, { error }),
  };
}
