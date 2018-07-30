import firebase from 'firebase/app';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';
// import admin from 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'xxx',
  authDomain: 'x.firebaseapp.com',
  databaseURL: 'https://x.firebaseio.com',
  projectId: 'x',
});

const rsf = new ReduxSagaFirebase(firebaseApp);

const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);

export default rsf;
