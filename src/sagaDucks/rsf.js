import firebase from 'firebase/app';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';
// import admin from 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyC-q9fnXTg-x-k7x-fdhxn8jBIcR0kyltc',
  authDomain: 'projects-tracker-d372e.firebaseapp.com',
  databaseURL: 'https://projects-tracker-d372e.firebaseio.com',
  projectId: 'projects-tracker-d372e',
});

const rsf = new ReduxSagaFirebase(firebaseApp);

const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);

export default rsf;
