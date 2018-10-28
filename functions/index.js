const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const cors = require('cors')({ origin: true });

// https://us-central1-projects-tracker-d372e.cloudfunctions.net/${func}`
// http://localhost:5000/projects-tracker-d372e/us-central1/${func}`

const isAuthenticated = req => req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
const getUseId = req => req.headers.authorization.split('Bearer ')[1];

exports.helloWorld = functions.https.onRequest((req, res) => {
  cors(req, res, () => res.status(200).json({
    message: 'Hello!',
  }));
});

exports.getProjects = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (isAuthenticated(req)) {
      const userId = getUseId(req);
      db.collection(`projects-${userId}`).orderBy('repoName').get()
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
    } else {
      res.status(403).send('Unauthorized to get projects');
    }
  });
});

exports.getSettings = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (isAuthenticated(req)) {
      const userId = getUseId(req);
      const data = {};
      db.collection(`settings-${userId}`).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            data[doc.id] = doc.data();
          });
          res.status(200).json(data);
        })
        .catch(err => res.status(500).send(err));
    } else {
      res.status(403).send('Unauthorized to settings');
    }
  });
});

exports.userHasSettings = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (isAuthenticated(req)) {
      const userId = getUseId(req);
      db.collection(`settings-${userId}`).get()
        .then((snapshot) => {
          res.status(200).send(!snapshot.empty);
        });
    } else {
      res.status(403).send('Unauthorized to check if user has settings collection');
    }
  });
});
