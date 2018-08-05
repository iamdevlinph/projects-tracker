export const types = {
  FETCH_PROJECTS_REQUEST: 'PROJECTS/FETCH_PROJECTS_REQUEST',
  FETCH_PROJECTS_SUCCESS: 'PROJECTS/FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILED: 'PROJECTS/FETCH_PROJECTS_FAILED',
  FETCH_REPO_INFO_REQUEST: 'PROJECTS/FETCH_REPO_INFO_REQUEST',
  FETCH_REPO_INFO_SUCCESS: 'PROJECTS/FETCH_REPO_INFO_SUCCESS',
  FETCH_REPO_INFO_FAILED: 'PROJECTS/FETCH_REPO_INFO_FAILED',
};

export const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REPO_INFO_SUCCESS:
      return {
        ...state,
        list: action.repositories,
      };
    default:
      return state;
  }
};

export const actions = {
  requestList: () => ({ type: types.FETCH_PROJECTS_REQUEST }),
};
