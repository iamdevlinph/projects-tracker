/* global fetch */

import localStorage from './localStorage';

const CACHE = {
  REPO_INFOS: 'repoInfosCache',
  PR_COUNTS: 'prCountsCache',
  COMMIT_INFOS: 'commitInfosCache',
};

const getUserInfo = (authorName, authorType) => fetch(`https://api.github.com/${authorType}s/${authorName}`).then(res => res.json());

const getRepoInfos = async (projects) => {
  const repoInfoPromises = [];
  let repoInfoCache = localStorage.isCached(CACHE.REPO_INFOS);
  if (!repoInfoCache) {
    projects.forEach((project) => {
      repoInfoPromises.push(fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}`).then(res => res.json()));
    });
    await Promise.all(repoInfoPromises).then((repoInfoResolve) => {
      repoInfoCache = repoInfoResolve;
      localStorage.setItem(CACHE.REPO_INFOS, repoInfoCache);
    });
  }
  return repoInfoCache;
};

const getPrCounts = async (projects) => {
  const prCountPromises = [];
  let prCountCache = localStorage.isCached(CACHE.PR_COUNTS);
  if (!prCountCache) {
    projects.forEach((project) => {
      prCountPromises.push(fetch(`https://api.github.com/search/issues?q=+type:pr+repo:${project.authorName}/${project.repoName}+state:open&sort=created&order=asc`).then(res => res.json()));
    });
    await Promise.all(prCountPromises).then((prCountResolve) => {
      prCountCache = prCountResolve;
      localStorage.setItem(CACHE.PR_COUNTS, prCountCache);
    });
  }
  return prCountCache;
};

// https://stackoverflow.com/a/15933109/4110257
const getCommitInfos = async (projects) => {
  const commitInfoPromises = [];
  let commitInfoCache = localStorage.isCached(CACHE.COMMIT_INFOS);
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
      localStorage.setItem(CACHE.COMMIT_INFOS, commitInfoCache);
    });
  }
  return commitInfoCache;
};


const githubApi = {
  getUserInfo,
  getRepoInfos,
  getPrCounts,
  getCommitInfos,
};

export default githubApi;
