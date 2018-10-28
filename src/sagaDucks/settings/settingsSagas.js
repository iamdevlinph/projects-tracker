import {
  put, takeLatest, call,
} from 'redux-saga/effects';
import { firebaseFuncs, localStorage, swalService } from '../../services';
import rsf, { onAuthStateChanged } from '../rsf';

import { types as settingsTypes } from './settings';

function* willFetchSettings() {
  try {
    const currentUser = yield call(onAuthStateChanged);
    const userId = currentUser.uid;
    const settingsCache = localStorage.isCached('settingsCache');
    let settings;

    if (!settingsCache) {
      settings = yield call(firebaseFuncs.getSettings, userId);
      localStorage.setItem('settingsCache', settings);
    } else {
      settings = settingsCache;
    }

    yield put({ type: settingsTypes.FETCH_SETTINGS_SUCCESS, settings });
  } catch (e) {
    console.error(`${settingsTypes.FETCH_SETTINGS_FAILED} ${e}`);
  }
}

function* willSaveSettings(action) {
  const { settings } = action;
  try {
    const currentUser = yield call(onAuthStateChanged);
    const userId = currentUser.uid;
    yield call(rsf.firestore.updateDocument, `settings-${userId}/issues`, { ...settings.issues });
    yield call(rsf.firestore.updateDocument, `settings-${userId}/pulls`, { ...settings.pulls });
    yield call(rsf.firestore.updateDocument, `settings-${userId}/update`, { ...settings.update });
    localStorage.setItem('settingsCache', settings);
    yield put({ type: settingsTypes.SAVE_SETTINGS_SUCCESS, settings });
  } catch (e) {
    console.error(`${settingsTypes.SAVE_SETTINGS_FAILED} ${e}`);
    swalService.error('Save settings failed', e);
  }
}

const settingsSagas = [
  takeLatest(settingsTypes.FETCH_SETTINGS_REQUEST, willFetchSettings),
  takeLatest(settingsTypes.SAVE_SETTINGS_REQUEST, willSaveSettings),
];

export default settingsSagas;
