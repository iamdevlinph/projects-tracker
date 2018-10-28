const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const cors = require('cors')({ origin: true });

// https://us-central1-projects-tracker-d372e.cloudfunctions.net/${func}`
// http://localhost:5000/projects-tracker-d372e/us-central1/${func}`

exports.helloWorld = functions.https.onRequest((req, res) => {
  cors(req, res, () => res.status(200).json({
    message: 'Hello!',
  }));
});

exports.getProjects = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const userId = req.headers.authorization.split('Bearer ')[1];
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
      res.status(403).send('Unaothorized');
    }
  });
});

exports.getSettings = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const userId = req.headers.authorization.split('Bearer ')[1];
      const data = {};
      db.collection(`settings-${userId}`).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            // ignore colors
            if (doc.id === 'colors') return;
            data[doc.id] = doc.data();
          });
          res.status(200).json(data);
        })
        .catch(err => res.status(500).send(err));
    } else {
      res.status(403).send('Unaothorized');
    }
  });
});
