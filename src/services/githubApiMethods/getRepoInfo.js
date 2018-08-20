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

const getRepoInfo = async (projects) => {
  const getRepoInfoPromises = [];
  let data;
  projects.forEach((project) => {
    getRepoInfoPromises.push(nodeGetRepoInfo(project.authorName, project.repoName));
  });
  await Promise.all(getRepoInfoPromises).then((res) => {
    data = res;
  });
  return data;
};

export default getRepoInfo;
