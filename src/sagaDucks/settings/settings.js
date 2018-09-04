export const types = {
  FETCH_SETTINGS_REQUEST: 'SETTINGS/FETCH_SETTINGS_REQUEST',
  FETCH_SETTINGS_SUCCESS: 'SETTINGS/FETCH_SETTINGS_SUCCESS',
  FETCH_SETTINGS_FAILED: 'SETTINGS/FETCH_SETTINGS_FAILED',
  SHOW_COLOR_PICKER: 'SETTINGS/SHOW_COLOR_PICKER',
  PREVIEW_COLOR: 'SETTINGS/PREVIEW_COLOR',
  PREVIEW_COUNT: 'SETTINGS/PREVIEW_COUNT',
};

export const initialState = {
  settings: null,
  activeColorPicker: '',
};

const validateCount = (settings, type, key, count) => {
  const newSettings = {
    ...settings,
  };
  switch (key) {
    case 'dangerCount':
    {
      if (count <= settings[type].warningCount) {
        newSettings[type][key] = settings[type].warningCount + 1;
      } else {
        newSettings[type][key] = count;
      }
      break;
    }
    case 'warningCount':
      if (count >= settings[type].dangerCount) {
        newSettings[type].dangerCount = count + 1;
        newSettings[type][key] = count;
      } else if (count < 2) {
        newSettings[type][key] = 2;
      } else {
        newSettings[type][key] = count;
      }
      break;
    default:
  }
  return newSettings;
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
    case types.PREVIEW_COUNT: {
      const target = action.target.split('-');
      const type = target[0].toLowerCase();
      const key = `${target[1]}Count`;
      return {
        ...state,
        settings: validateCount(state.settings, type, key, +action.count),
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
  previewCount: (target, count) => ({ type: types.PREVIEW_COUNT, target, count }),
};
