/* global fetch */

const helloWorld = () => fetch('https://us-central1-projects-tracker-d372e.cloudfunctions.net/helloWorld');

const firebaseFuncs = {
  helloWorld,
};

export default firebaseFuncs;
