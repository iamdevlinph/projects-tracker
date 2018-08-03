/* global fetch */

const getUserInfo = (authorName, authorType) => fetch(`https://api.github.com/${authorType}s/${authorName}`)
  .then(res => res.json());
const getRepoInfo = (authorName, repoName) => fetch(`https://api.github.com/repos/${authorName}/${repoName}`)
  .then(res => res.json());

const githubApi = {
  getUserInfo,
  getRepoInfo,
};

export default githubApi;
