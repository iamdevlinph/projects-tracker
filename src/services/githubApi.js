/* global fetch */

const getInfo = (authorName, authorType) => fetch(`https://api.github.com/${authorType}s/${authorName}`)
  .then(res => res.json());

const githubApi = {
  getInfo,
};

export default githubApi;
