const isDev = process.env.NODE_ENV === 'development';
const makeApiUrl = (func) => {
  let apiUrl;
  if (isDev) {
    // localhost firebase functions
    apiUrl = `http://localhost:5000/projects-tracker-d372e/us-central1/${func}`;
  } else {
    // live firebase functions
    apiUrl = `https://us-central1-projects-tracker-d372e.cloudfunctions.net/${func}`;
  }

  return apiUrl;
};

const helloWorld = () => fetch(makeApiUrl('helloWorld')).then(res => res.json());
const getProjects = userId => fetch(makeApiUrl('getProjects'), {
  method: 'get',
  headers: {
    Authorization: `Bearer ${userId}`,
  },
}).then(res => res.json());
const getSettings = userId => fetch(makeApiUrl('getSettings'), {
  method: 'get',
  headers: {
    Authorization: `Bearer ${userId}`,
  },
}).then(res => res.json());

const firebaseFuncs = {
  helloWorld,
  getProjects,
  getSettings,
};

export default firebaseFuncs;
