import { put, takeLatest, call } from 'redux-saga/effects';
import rsf from '../rsf';

import { types as projectsTypes } from './projects';

function* willFetchList() {
  try {
    const snapshot = yield call(rsf.firestore.getCollection, 'iamdevlinph-projects');
    let projects;
    snapshot.forEach((project) => {
      projects = {
        ...projects,
        [project.id]: project.data(),
      };
    });
    yield put({ type: projectsTypes.FETCH_LIST_SUCCESS, projects });
  } catch (e) {
    console.error(e);
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_LIST_REQUEST, willFetchList),
];

export default projectsSagas;
