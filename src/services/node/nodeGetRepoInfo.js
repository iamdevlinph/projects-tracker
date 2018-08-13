// const isDev = process.env.NODE_ENV === 'development';
// const apiUrl = !isDev ? 'http://localhost:3001/repoInfo' : 'https://projects-tracker-api.us.openode.io/repoInfo';
const postBody = body => JSON.stringify({
  ...body,
});

const nodeGetRepoInfo = (authorName, repoName) => fetch('https://projects-tracker.herokuapp.com/repoInfo', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: postBody({ authorName, repoName }),
}).then(res => res.json());

export default nodeGetRepoInfo;
