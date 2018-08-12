import {
  put, takeLatest, call,
} from 'redux-saga/effects';
import rsf from '../rsf';
import firebaseFuncs from '../../services/firebase-functions';
import localStorage from '../../services/localStorage';

import { types as authorsTypes } from './authors';

const isDev = process.env.NODE_ENV === 'development';

function* willFetchAuthors() {
  try {
    const authorsCache = localStorage.isCached('authorsCache');
    let authors;

    if (!authorsCache) {
      if (isDev) {
        authors = yield call(firebaseFuncs.getAuthors);
        localStorage.setItem('authorsCache', authors);
      } else {
        authors = yield call(rsf.functions.call, 'getAuthors');
        localStorage.setItem('authorsCache', authors);
      }
    } else {
      authors = authorsCache;
    }

    yield put({ type: authorsTypes.FETCH_AUTHORS_SUCCESS, authors });
  } catch (e) {
    console.error(`${authorsTypes.FETCH_AUTHORS_FAILED} ${e}`);
  }
}

const authorsSagas = [
  takeLatest(authorsTypes.FETCH_AUTHORS_REQUEST, willFetchAuthors),
];

export default authorsSagas;
