import getCommitInfos from './githubApiMethods/getCommitInfos';
import getPrCounts from './githubApiMethods/getPrCounts';
import getRepoInfo from './githubApiMethods/getRepoInfo';
import getRepoInfos from './githubApiMethods/getRepoInfos';
import getUserInfo from './githubApiMethods/getUserInfo';

// node funcs
import nodeGetRepoInfo from './node/nodeGetRepoInfo';
import nodeGetUserInfo from './node/nodeGetUserInfo';

const githubApi = {
  getCommitInfos,
  getPrCounts,
  getRepoInfo,
  getRepoInfos,
  getUserInfo,
  nodeGetRepoInfo,
  nodeGetUserInfo,
};

export default githubApi;
