/**
 * General COMMON State
 */

export const types = {
  FETCH_LIST_REQUEST: 'PROJECTS/FETCH_LIST_REQUEST',
  FETCH_LIST_SUCCESS: 'PROJECTS/FETCH_LIST_SUCCESS',
  FETCH_LIST_FAILED: 'PROJECTS/FETCH_LIST_FAILED',
};

export const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  console.info('reducer');
  console.info(action);
  switch (action.type) {
    case types.FETCH_LIST_SUCCESS:
      console.info(action);
      return state;
    default:
      return state;
  }
};

export const actions = {
  requestList: () => ({ type: types.FETCH_LIST_REQUEST }),
};
