const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
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
  cors(req, res, () => {
    db.collection(COLLECTIONS.AUTHORS).get()
      .then((snapshot) => {
        const authors = [];
        snapshot.forEach((author) => {
          const authorObj = author.data();
          authorObj.key = author.id;
          authors.push(authorObj);
        });
        res.status(200).json(authors);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});

exports.getProjects = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    db.collection(COLLECTIONS.PROJECTS).get()
      .then((snapshot) => {
        const projects = [];
        snapshot.forEach((project) => {
          const projectObj = project.data();
          projectObj.key = project.id;
          projects.push(projectObj);
        });
        res.status(200).json(projects);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});
