import {
  put, takeLatest, call,
} from 'redux-saga/effects';
import { firebaseFuncs, localStorage, swalService } from '../../services';
import rsf, { onAuthStateChanged } from '../rsf';

import { types as settingsTypes } from './settings';
import { types as commonTypes } from '../common/common';

const defaultSettings = {
  safeColor: '#2AD806',
  warningColor: '#FD8F53',
  warningCount: 3,
  dangerColor: '#FF0505',
  dangerCount: 5,
};

function* willFetchSettings() {
  try {
    const currentUser = yield call(onAuthStateChanged);
    const userId = currentUser.uid;
    const settingsCache = localStorage.isCached('settingsCache');
    let settings;

    if (!settingsCache) {
      const hasSettings = yield call(firebaseFuncs.userHasSettings, userId);
      // if no settings then create the default settings
      if (!hasSettings) {
        yield call(
          rsf.firestore.setDocument,
          `settings-${userId}/pulls`,
          { ...defaultSettings },
        );
        yield call(
          rsf.firestore.setDocument,
          `settings-${userId}/issues`,
          { ...defaultSettings },
        );
        yield call(
          rsf.firestore.setDocument,
          `settings-${userId}/update`,
          { ...defaultSettings },
        );
      }
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
  yield put({ type: commonTypes.AJAX_INC });
  try {
    const currentUser = yield call(onAuthStateChanged);
    const userId = currentUser.uid;
    yield call(rsf.firestore.updateDocument, `settings-${userId}/issues`, { ...settings.issues });
    yield call(rsf.firestore.updateDocument, `settings-${userId}/pulls`, { ...settings.pulls });
    yield call(rsf.firestore.updateDocument, `settings-${userId}/update`, { ...settings.update });
    localStorage.setItem('settingsCache', settings);
    yield put({ type: settingsTypes.SAVE_SETTINGS_SUCCESS, settings });
    swalService.success('Settings updated');
  } catch (e) {
    console.error(`${settingsTypes.SAVE_SETTINGS_FAILED} ${e}`);
    swalService.error('Save settings failed', e);
  } finally {
    yield put({ type: commonTypes.AJAX_DEC });
  }
}

const settingsSagas = [
  takeLatest(settingsTypes.FETCH_SETTINGS_REQUEST, willFetchSettings),
  takeLatest(settingsTypes.SAVE_SETTINGS_REQUEST, willSaveSettings),
];

export default settingsSagas;
