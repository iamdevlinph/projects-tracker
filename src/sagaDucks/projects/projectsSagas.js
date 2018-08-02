import { put, takeLatest, call } from 'redux-saga/effects';
// import rsf from '../rsf';
import firebaseFuncs from '../../services/firebase-functions';

import { types as projectsTypes } from './projects';

function* willFetchList() {
  try {
    // const projects = yield call(rsf.functions.call, 'getProjects');
    const projects = yield call(firebaseFuncs.getProjects);
    yield put({ type: projectsTypes.FETCH_LIST_SUCCESS, projects });
  } catch (e) {
    console.error(e);
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_LIST_REQUEST, willFetchList),
];

export default projectsSagas;
