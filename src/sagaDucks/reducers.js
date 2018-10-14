import { combineReducers } from 'redux';

import auth from './auth/auth';
import common from './common/common';
import projects from './projects/projects';
import settings from './settings/settings';

export default combineReducers({
  auth,
  common,
  projects,
  settings,
});
