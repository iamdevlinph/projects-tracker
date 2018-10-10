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

const getRepoInfo = (authorName, repoName) => (
  nodeGetRepoInfo(authorName, repoName).then(res => res)
);

export default getRepoInfo;
