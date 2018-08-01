/* global fetch */

const apiUrl = func => `https://us-central1-projects-tracker-d372e.cloudfunctions.net/${func}`;

const helloWorld = () => fetch(apiUrl('helloWorld')).then(res => res.json());

const getAuthors = () => fetch(apiUrl('getAuthors')).then(res => res.json());

const firebaseFuncs = {
  helloWorld,
  getAuthors,
};

export default firebaseFuncs;
