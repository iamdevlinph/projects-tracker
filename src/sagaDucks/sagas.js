import { all } from 'redux-saga/effects';

import projectsSagas from './projects/projectsSagas';

export default function* mySaga() {
  yield all([
    ...projectsSagas,
  ]);
}
