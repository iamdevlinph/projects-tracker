import {
  put, takeLatest, call,
} from 'redux-saga/effects';
import firebaseFuncs from '../../services/firebase-functions';
import localStorage from '../../services/localStorage';

import { types as settingsTypes } from './settings';

function* willFetchSettings() {
  try {
    const settingsCache = localStorage.isCached('settingsCache');
    let settings;

    if (!settingsCache) {
      settings = yield call(firebaseFuncs.getSettings);
      localStorage.setItem('settingsCache', settings);
    } else {
      settings = settingsCache;
    }

    yield put({ type: settingsTypes.FETCH_SETTINGS_SUCCESS, settings });
  } catch (e) {
    console.error(`${settingsTypes.FETCH_SETTINGS_FAILED} ${e}`);
  }
}

const settingsSagas = [
  takeLatest(settingsTypes.FETCH_SETTINGS_REQUEST, willFetchSettings),
];

export default settingsSagas;
