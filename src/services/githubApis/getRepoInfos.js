import localStorage from '../localStorage';

const CACHE_NAME = 'repoInfosCache';

const getRepoInfos = async (projects) => {
  const repoInfoPromises = [];
  let repoInfoCache = localStorage.isCached(CACHE_NAME);
  if (!repoInfoCache) {
    projects.forEach((project) => {
      repoInfoPromises.push(fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}`).then(res => res.json()));
    });
    await Promise.all(repoInfoPromises).then((repoInfoResolve) => {
      repoInfoCache = repoInfoResolve;
      localStorage.setItem(CACHE_NAME, repoInfoCache);
    });
  }
  return repoInfoCache;
};

export default getRepoInfos;
