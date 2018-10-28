import firebase from 'firebase/app';
import 'firebase/auth';
import { put, takeLatest, call } from 'redux-saga/effects';
import rsf, { onAuthStateChanged } from '../rsf';
import { types as authTypes } from './auth';
import { localStorage } from '../../services';

const authProvider = new firebase.auth.GoogleAuthProvider();

function* willLogin() {
  try {
    yield call(rsf.auth.signInWithPopup, authProvider);
    const currentUser = yield call(onAuthStateChanged);
    yield put({ type: authTypes.LOGIN_SUCCESS, currentUser });
  } catch (e) {
    console.error(`${authTypes.LOGIN_FAILED} ${e}`);
  }
}

function* willLogOut() {
  try {
    yield call(rsf.auth.signOut);
    yield put({ type: authTypes.LOGOUT_SUCCESS });
    localStorage.clearAll();
    window.location.reload();
  } catch (e) {
    console.error(`${authTypes.LOGOUT_FAILED} ${e}`);
  }
}

function* willInitAuth() {
  try {
    const currentUser = yield call(onAuthStateChanged);
    if (currentUser) {
      yield put({ type: authTypes.LOGIN_SUCCESS, currentUser });
    } else {
      yield put({ type: authTypes.LOGOUT_SUCCESS });
    }
  } catch (e) {
    yield put({ type: authTypes.INIT_AUTH_FAILED });
    console.error(`${authTypes.INIT_AUTH_FAILED} ${e}`);
  }
}

const authSagas = [
  takeLatest(authTypes.LOGIN_REQUEST, willLogin),
  takeLatest(authTypes.LOGOUT_REQUEST, willLogOut),
  takeLatest(authTypes.INIT_AUTH_REQUEST, willInitAuth),
];

export default authSagas;
