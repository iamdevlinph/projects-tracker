import { all } from 'redux-saga/effects';

import counterSagas from './counter/counterSagas';

export default function* mySaga() {
  yield all([
    ...counterSagas,
  ]);
}
