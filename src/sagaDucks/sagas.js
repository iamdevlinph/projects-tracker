import { all } from 'redux-saga/effects';

import authSagas from './auth/authSagas';
import authorSagas from './authors/authorsSagas';
import projectsSagas from './projects/projectsSagas';
import settingsSagas from './settings/settingsSagas';

export default function* mySaga() {
  yield all([
    ...authSagas,
    ...authorSagas,
    ...projectsSagas,
    ...settingsSagas,
  ]);
}
