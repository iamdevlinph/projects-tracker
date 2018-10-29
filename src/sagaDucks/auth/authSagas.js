import firebase from 'firebase/app';
import 'firebase/auth';
import { put, takeLatest, call } from 'redux-saga/effects';
import rsf, { onAuthStateChanged } from '../rsf';
import { types as authTypes } from './auth';
import { localStorage, swalService } from '../../services';

const googleAuth = new firebase.auth.GoogleAuthProvider();
const githubAuth = new firebase.auth.GithubAuthProvider();

function* willLogin(action) {
  try {
    let authProvider;
    switch (action.provider) {
      case 'github':
        authProvider = githubAuth; break;
      default:
        authProvider = googleAuth; break;
    }
    yield call(rsf.auth.signInWithPopup, authProvider);
    const currentUser = yield call(onAuthStateChanged);
    yield put({ type: authTypes.LOGIN_SUCCESS, currentUser });
  } catch (e) {
    const title = e.email ? `auth error: ${e.email}` : 'Auth Error';
    const msg = e.message ? e.message : null;
    swalService.error(title, msg);
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
