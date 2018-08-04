/* global fetch */

import localStorage from './localStorage';

const getUserInfo = (authorName, authorType) => fetch(`https://api.github.com/${authorType}s/${authorName}`).then(res => res.json());

async function getRepoInfo(projects) {
  const repoInfoPromises = [];
  let repoInfoCache = localStorage.isCached('repoInfoCache');
  if (!repoInfoCache) {
    projects.forEach((project) => {
      repoInfoPromises.push(fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}`).then(res => res.json()));
    });
    await Promise.all(repoInfoPromises).then((repoInfoResolve) => {
      repoInfoCache = repoInfoResolve;
      localStorage.setItem('repoInfoCache', repoInfoCache);
    });
  }
  return repoInfoCache;
}

const getPrCount = (authorName, repoName) => fetch(`https://api.github.com/search/issues?q=+type:pr+repo:${authorName}/${repoName}+state:open&sort=created&order=asc`).then(res => res.json());

// https://stackoverflow.com/a/15933109/4110257
const getCommitInfo = (authorName, repoName) => fetch(`https://api.github.com/repos/${authorName}/${repoName}/git/refs/heads/master`)
  .then(refObj => refObj.json())
  .then(refObjResolve => fetch(`https://api.github.com/repos/${authorName}/${repoName}/commits/${refObjResolve.object.sha}`))
  .then(commitObj => commitObj.json())
  .then(commitData => commitData);


const githubApi = {
  getUserInfo,
  getRepoInfo,
  getPrCount,
  getCommitInfo,
};

export default githubApi;
