const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const cors = require('cors')({ origin: true });

const githubUrl = (authorName, repoName) => `https://github.com/${authorName}${repoName}`;

// https://us-central1-projects-tracker-d372e.cloudfunctions.net/${func}`
// http://localhost:5000/projects-tracker-d372e/us-central1/${func}`

exports.helloWorld = functions.https.onRequest((req, res) => {
  cors(req, res, () => res.status(200).json({
    message: 'Hello!',
  }));
});

exports.getAuthors = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    db.collection('authors').orderBy('authorName').get()
      .then((snapshot) => {
        const authors = [];
        snapshot.forEach((author) => {
          const authorObj = author.data();
          authorObj.key = author.id;
          authorObj.githubUrl = githubUrl(authorObj.authorName);
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
    db.collection('projects').orderBy('repoName').get()
      .then((snapshot) => {
        const projects = [];
        snapshot.forEach((project) => {
          const projectObj = project.data();
          projectObj.key = project.id;
          projectObj.fullName = `${projectObj.authorName}/${projectObj.repoName}`;
          projects.push(projectObj);
        });
        res.status(200).json(projects);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});

exports.getSettings = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    db.collection('settings').doc('colors').get()
      .then((doc) => {
        res.status(200).json(doc.data());
      })
      .catch(err => res.status(500).send(err));
  });
});
