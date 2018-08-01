let mapProjectsObj;

export const types = {
  FETCH_LIST_REQUEST: 'PROJECTS/FETCH_LIST_REQUEST',
  FETCH_LIST_SUCCESS: 'PROJECTS/FETCH_LIST_SUCCESS',
  FETCH_LIST_FAILED: 'PROJECTS/FETCH_LIST_FAILED',
};

export const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: mapProjectsObj(action.projects),
      };
    default:
      return state;
  }
};

export const actions = {
  requestList: () => ({ type: types.FETCH_LIST_REQUEST }),
};

mapProjectsObj = (projects) => {
  const mappedProjects = [];
  Object.keys(projects).forEach((key) => {
    const { authorName, repoName } = projects[key];
    mappedProjects.push({
      ...projects[key],
      id: key,
      githubUrl: `https://github.com/${authorName}/${repoName}`,
    });
  });
  return mappedProjects;
};
