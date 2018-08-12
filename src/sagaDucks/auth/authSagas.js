import firebase from 'firebase';
import 'firebase/auth';
import { put, takeLatest, call } from 'redux-saga/effects';
import rsf from '../rsf';
import { types as authTypes } from './auth';
import localStorage from '../../services/localStorage';

const authProvider = new firebase.auth.GoogleAuthProvider();

function onAuthStateChanged() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Ops!'));
      }
    });
  });
}

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
    localStorage.removeItem('informedUserCache');
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
    console.error(`${authTypes.INIT_AUTH_FAILED} ${e}`);
  }
}

const authSagas = [
  takeLatest(authTypes.LOGIN_REQUEST, willLogin),
  takeLatest(authTypes.LOGOUT_REQUEST, willLogOut),
  takeLatest(authTypes.INIT_AUTH_REQUEST, willInitAuth),
];

export default authSagas;
