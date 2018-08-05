import nodeGetRepoInfo from '../node/nodeGetRepoInfo';

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
