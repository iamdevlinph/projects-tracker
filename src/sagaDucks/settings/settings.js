export const types = {
  FETCH_SETTINGS_REQUEST: 'SETTINGS/FETCH_SETTINGS_REQUEST',
  FETCH_SETTINGS_SUCCESS: 'SETTINGS/FETCH_SETTINGS_SUCCESS',
  FETCH_SETTINGS_FAILED: 'SETTINGS/FETCH_SETTINGS_FAILED',
  SHOW_COLOR_PICKER: 'SETTINGS/SHOW_COLOR_PICKER',
  PREVIEW_COLOR: 'SETTINGS/PREVIEW_COLOR',
};

export const initialState = {
  settings: null,
  activeColorPicker: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.settings,
      };
    case types.SHOW_COLOR_PICKER: {
      // hide picker if clicked on the same
      const targetPicker = state.activeColorPicker === action.target ? '' : action.target;
      return {
        ...state,
        activeColorPicker: targetPicker,
      };
    }
    case types.PREVIEW_COLOR: {
      const target = action.target.split('-');
      const type = target[0];
      const key = `${target[1]}Color`;
      const newSettings = {
        ...state.settings,
      };
      newSettings[type][key] = action.color;
      return {
        ...state,
        settings: newSettings,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  requestSettings: () => ({ type: types.FETCH_SETTINGS_REQUEST }),
  showColorPicker: target => ({ type: types.SHOW_COLOR_PICKER, target }),
  previewColor: (target, color) => ({ type: types.PREVIEW_COLOR, target, color }),
};
