import { all } from 'redux-saga/effects';

import authorSagas from './authors/authorsSagas';
import projectsSagas from './projects/projectsSagas';
import settingsSagas from './settings/settingsSagas';

export default function* mySaga() {
  yield all([
    ...authorSagas,
    ...projectsSagas,
    ...settingsSagas,
  ]);
}
