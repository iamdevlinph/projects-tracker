const isRepoUpdated = proj => fetch(`https://api.github.com/repos/${proj.authorName}/${proj.repoName}/events`)
  .then(res => res.json())
  .then((data) => {
    console.error(proj.repoName, proj.updatedAt, data[0].created_at);
    return ({
      isUpdated: proj.updatedAt === data[0].created_at,
      authorName: proj.authorName,
      repoName: proj.repoName,
      newestEventCreated: data[0].created_at,
      fullName: `${proj.authorName}/${proj.repoName}`,
    });
  });

export default isRepoUpdated;
