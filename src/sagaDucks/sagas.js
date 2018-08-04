import { all } from 'redux-saga/effects';

import projectsSagas from './projects/projectsSagas';
import settingsSagas from './settings/settingsSagas';

export default function* mySaga() {
  yield all([
    ...projectsSagas,
    ...settingsSagas,
  ]);
}
