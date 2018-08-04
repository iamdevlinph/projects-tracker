import getCommitInfos from './githubApiMethods/getCommitInfos';
import getPrCounts from './githubApiMethods/getPrCounts';
import getRepoInfos from './githubApiMethods/getRepoInfos';
import getUserInfo from './githubApiMethods/getUserInfo';

const githubApi = {
  getCommitInfos,
  getPrCounts,
  getRepoInfos,
  getUserInfo,
};

export default githubApi;
