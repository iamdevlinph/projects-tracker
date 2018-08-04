import localStorage from '../localStorage';

const CACHE_NAME = 'prCountsCache';

const getPrCounts = async (projects) => {
  const prCountPromises = [];
  let prCountCache = localStorage.isCached(CACHE_NAME);
  if (!prCountCache) {
    projects.forEach((project) => {
      prCountPromises.push(fetch(`https://api.github.com/search/issues?q=+type:pr+repo:${project.authorName}/${project.repoName}+state:open&sort=created&order=asc`).then(res => res.json()));
    });
    await Promise.all(prCountPromises).then((prCountResolve) => {
      prCountCache = prCountResolve;
      localStorage.setItem(CACHE_NAME, prCountCache);
    });
  }
  return prCountCache;
};

export default getPrCounts;
