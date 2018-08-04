/* global fetch */

// const apiUrl = func => `https://us-central1-projects-tracker-d372e.cloudfunctions.net/${func}`;
const apiUrl = func => `http://localhost:5000/projects-tracker-d372e/us-central1/${func}`;

const helloWorld = () => fetch(apiUrl('helloWorld')).then(res => res.json());
const getAuthors = () => fetch(apiUrl('getAuthors')).then(res => res.json());
const getProjects = () => fetch(apiUrl('getProjects')).then(res => res.json());
const getSettings = () => fetch(apiUrl('getSettings')).then(res => res.json());

const firebaseFuncs = {
  helloWorld,
  getAuthors,
  getProjects,
  getSettings,
};

export default firebaseFuncs;
