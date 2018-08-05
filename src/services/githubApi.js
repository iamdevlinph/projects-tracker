import getRepoInfo from './githubApiMethods/getRepoInfo';
import getUserInfo from './githubApiMethods/getUserInfo';

// node funcs
import nodeGetRepoInfo from './node/nodeGetRepoInfo';
import nodeGetUserInfo from './node/nodeGetUserInfo';

const githubApi = {
  getRepoInfo,
  getUserInfo,
  nodeGetRepoInfo,
  nodeGetUserInfo,
};

export default githubApi;
