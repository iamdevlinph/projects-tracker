import { combineReducers } from 'redux';

import projects from './projects/projects';
import settings from './settings/settings';

export default combineReducers({
  projects,
  settings,
});
