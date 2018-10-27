const isRepoUpdated = proj => fetch(`https://api.github.com/repos/${proj.authorName}/${proj.repoName}`)
  .then(res => res.json())
  .then(data => ({
    isUpdated: proj.updatedAt === data.updated_at,
    authorName: proj.authorName,
    repoName: proj.repoName,
  }));

export default isRepoUpdated;
