import { combineReducers } from 'redux';

import auth from './auth/auth';
import authors from './authors/authors';
import projects from './projects/projects';
import settings from './settings/settings';

export default combineReducers({
  auth,
  authors,
  projects,
  settings,
});
