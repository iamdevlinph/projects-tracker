import { combineReducers } from 'redux';

import authors from './authors/authors';
import projects from './projects/projects';
import settings from './settings/settings';

export default combineReducers({
  authors,
  projects,
  settings,
});
