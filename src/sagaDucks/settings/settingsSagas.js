import {
  put, takeLatest, call,
} from 'redux-saga/effects';
import rsf from '../rsf';
import firebaseFuncs from '../../services/firebase-functions';
import localStorage from '../../services/localStorage';

import { types as settingsTypes } from './settings';

const isDev = process.env.NODE_ENV === 'development';

function* willFetchSettings() {
  try {
    const settingsCache = localStorage.isCached('settingsCache');
    let settings;

    if (!settingsCache) {
      if (isDev) {
        settings = yield call(firebaseFuncs.getSettings);
        localStorage.setItem('settingsCache', settings);
      } else {
        settings = yield call(rsf.functions.call, 'getSettings');
        localStorage.setItem('settingsCache', settings);
      }
    } else {
      settings = settingsCache;
    }

    yield put({ type: settingsTypes.FETCH_SETTINGS_SUCCESS, settings });
  } catch (e) {
    console.error(e);
  }
}

const settingsSagas = [
  takeLatest(settingsTypes.FETCH_SETTINGS_REQUEST, willFetchSettings),
];

export default settingsSagas;
