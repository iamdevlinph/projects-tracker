/* global fetch */

const getUserInfo = (authorName, authorType) => fetch(`https://api.github.com/${authorType}s/${authorName}`).then(res => res.json());
const getRepoInfo = (authorName, repoName) => fetch(`https://api.github.com/repos/${authorName}/${repoName}`).then(res => res.json());
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
