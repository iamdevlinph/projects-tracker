import { combineReducers } from 'redux';

import auth from './auth/auth';
import projects from './projects/projects';
import settings from './settings/settings';

export default combineReducers({
  auth,
  projects,
  settings,
});
