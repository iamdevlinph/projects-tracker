// const isDev = process.env.NODE_ENV === 'development';
// const apiUrl = !isDev ? 'http://localhost:3001/repoInfo' : 'http://projects-tracker-api.us.openode.io/repoInfo';
const postBody = body => JSON.stringify({
  ...body,
});

const nodeGetRepoInfo = (authorName, repoName) => fetch('http://projects-tracker-api.us.openode.io/repoInfo', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: postBody({ authorName, repoName }),
}).then(res => res.json());

export default nodeGetRepoInfo;
