export const types = {
  FETCH_SETTINGS_REQUEST: 'SETTINGS/FETCH_SETTINGS_REQUEST',
  FETCH_SETTINGS_SUCCESS: 'SETTINGS/FETCH_SETTINGS_SUCCESS',
  FETCH_SETTINGS_FAILED: 'SETTINGS/FETCH_SETTINGS_FAILED',
};

export const initialState = {
  settings: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.settings,
      };
    default:
      return state;
  }
};

export const actions = {
  requestSettings: () => ({ type: types.FETCH_SETTINGS_REQUEST }),
};
