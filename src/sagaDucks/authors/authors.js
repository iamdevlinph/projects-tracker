export const types = {
  FETCH_AUTHORS_REQUEST: 'AUTHORS/FETCH_AUTHORS_REQUEST',
  FETCH_AUTHORS_SUCCESS: 'AUTHORS/FETCH_AUTHORS_SUCCESS',
  FETCH_AUTHORS_FAILED: 'AUTHORS/FETCH_AUTHORS_FAILED',
};

export const initialState = {
  authors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_AUTHORS_SUCCESS:
      return {
        ...state,
        authors: action.authors,
      };
    default:
      return state;
  }
};

export const actions = {
  requestAuthors: () => ({ type: types.FETCH_AUTHORS_REQUEST }),
};
