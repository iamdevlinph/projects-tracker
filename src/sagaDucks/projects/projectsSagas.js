import { put, takeLatest, call } from 'redux-saga/effects';
// import rsf from '../rsf';
import firebaseFuncs from '../../services/firebase-functions';

import { types as projectsTypes } from './projects';

function* willFetchList() {
  try {
    const snapshot = yield call(firebaseFuncs.helloWorld);
    console.log(snapshot);
    // let projects;
    // snapshot.forEach((project) => {
    //   projects = {
    //     ...projects,
    //     [project.id]: project.data(),
    //   };
    // });
    yield put({ type: projectsTypes.FETCH_LIST_SUCCESS, a: 'test' });
  } catch (e) {
    console.error(e);
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_LIST_REQUEST, willFetchList),
];

export default projectsSagas;
