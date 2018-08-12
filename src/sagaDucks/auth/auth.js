export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILED: 'AUTH/LOGIN_FAILED',
  LOGOUT_REQUEST: 'AUTH/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'AUTH/LOGOUT_SUCCESS',
  LOGOUT_FAILED: 'AUTH/LOGOUT_FAILED',
  INIT_AUTH_REQUEST: 'AUTH/INIT_AUTH_REQUEST',
  INIT_AUTH_SUCCESS: 'AUTH/INIT_AUTH_SUCCESS',
  INIT_AUTH_FAILED: 'AUTH/INIT_AUTH_FAILED',
};

export const initialState = {
  user: null,
  loggedIn: false,
};

export default (state = initialState, action) => {
  const { currentUser } = action;
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          displayName: currentUser.displayName,
          email: currentUser.email,
        },
        loggedIn: true,
      };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export const actions = {
  requestLogin: () => ({ type: types.LOGIN_REQUEST }),
  requestLogOut: () => ({ type: types.LOGOUT_REQUEST }),
  initAuth: () => ({ type: types.INIT_AUTH_REQUEST }),
};
