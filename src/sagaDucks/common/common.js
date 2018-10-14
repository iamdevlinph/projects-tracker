export const types = {
  AJAX_INC: 'DEFAULT/AJAX_INC',
  AJAX_DEC: 'DEFAULT/AJAX_DEC',
};

export const initialState = {
  ajaxInProgress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AJAX_INC:
      return {
        ...state,
        ajaxInProgress: state.ajaxInProgress + 1,
      };
    case types.AJAX_DEC:
      return {
        ...state,
        ajaxInProgress: state.ajaxInProgress - 1,
      };
    default:
      return state;
  }
};
