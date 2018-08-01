const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.database();
const cors = require('cors')({ origin: true });

const COLLECTIONS = {
  AUTHORS: 'authors',
  PROJECTS: 'projects',
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  cors(req, res, () => res.status(200).json({
    message: 'Hello!',
  }));
});

exports.getAuthors = functions.https.onRequest((req, res) => {
  // cors(req, res, () => admin.database()
  //   .ref('/authors')
  //   .orderByChild('authorName')
  //   .then((snapshot) => {
  //     res.status(200).json(snapshot.val());
  //   }));
  cors(req, res, () => {
    // const authors = db.ref(COLLECTIONS.AUTHORS);
    const query = db.ref(COLLECTIONS.AUTHORS);
    // return query.once('value').then((snap) => {
    //   console.log('ddd', snap); // datasnapshot
    //   console.log('eee', snap.val()); // null
    //   const test = snap.val();
    //   console.log('zzz', JSON.stringify(test));
    //   console.log('fff', snap.key); // authors
    //   res.send('ok 23');
    // }).catch(() => {
    //   res.status(500).send('not okay');
    //   // res.status(500).send(e);
    // });
    return query.once('value', (snapshot) => {
      // console.log('a2', snapshot.val());
      const aaa = snapshot.val();
      console.log('faz', JSON.stringify(aaa));
      res.status(200).send('okayyyyyyy');
    });
    // return Promise
    //   .all([
    //     admin.database().ref('authors').once('value'),
    //   ])
    //   .then((snap) => {
    //     console.log(snap);
    //     console.log(snap[0].val());
    //     res.status(200).send(snap[0].val());
    //   })
    //   .catch((e) => {
    //     res.status(500).send(e);
    //   });
    // admin.database().ref('authors').once('value').then((snap) => {
    //   if (snap.val()) {
    //     console.log('data', snap.val());
    //   } else {
    //     console.log('error');
    //   }
    // }, (e) => {
    //   console.log('error', e);
    // });
  });
});

// exports.getProjects = functions.https.onRequest((req, res) => {
//   cors(req, res, () => {
//     const projects = db.ref('projects');
//     const query = projects.orderByChild('repoName');
//   });
// });
