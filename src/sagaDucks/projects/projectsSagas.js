import { put, takeLatest, call } from 'redux-saga/effects';
import rsf from '../rsf';

import { types as projectsTypes } from './projects';

function* willFetchList() {
  console.info('yeah');
  try {
    const snapshot = yield call(rsf.firestore.getCollection, 'projects');
    yield put({ type: projectsTypes.FETCH_LIST_SUCCESS, snapshot });
  } catch (e) {
    console.error(e);
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_LIST_REQUEST, willFetchList),
];

export default projectsSagas;
