import localStorage from '../localStorage';

const CACHE_NAME = 'commitInfosCache';

// https://stackoverflow.com/a/15933109/4110257
const getCommitInfos = async (projects) => {
  const commitInfoPromises = [];
  let commitInfoCache = localStorage.isCached(CACHE_NAME);
  if (!commitInfoCache) {
    projects.forEach((project) => {
      commitInfoPromises.push(fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}/git/refs/heads/master`)
        .then(refObj => refObj.json())
        .then(refObjResolve => fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}/commits/${refObjResolve.object.sha}`))
        .then(commitObj => commitObj.json())
        .then(commitData => commitData));
    });
    await Promise.all(commitInfoPromises).then((commitInfoResolve) => {
      commitInfoCache = commitInfoResolve;
      localStorage.setItem(CACHE_NAME, commitInfoCache);
    });
  }
  return commitInfoCache;
};

export default getCommitInfos;
