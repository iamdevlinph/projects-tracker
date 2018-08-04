import getUserInfo from './githubApis/getUserInfo';
import getRepoInfos from './githubApis/getRepoInfos';
import getPrCounts from './githubApis/getPrCounts';
import getCommitInfos from './githubApis/getCommitInfos';

const githubApi = {
  getUserInfo,
  getRepoInfos,
  getPrCounts,
  getCommitInfos,
};

export default githubApi;
