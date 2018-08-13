import _ from 'lodash';

export const types = {
  FETCH_PROJECTS_REQUEST: 'PROJECTS/FETCH_PROJECTS_REQUEST',
  FETCH_PROJECTS_SUCCESS: 'PROJECTS/FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILED: 'PROJECTS/FETCH_PROJECTS_FAILED',
  FETCH_REPO_INFO_REQUEST: 'PROJECTS/FETCH_REPO_INFO_REQUEST',
  FETCH_REPO_INFO_SUCCESS: 'PROJECTS/FETCH_REPO_INFO_SUCCESS',
  FETCH_REPO_INFO_FAILED: 'PROJECTS/FETCH_REPO_INFO_FAILED',
  SORT_PROJECTS: 'PROJECTS/SORT_PROJECTS',
  SEARCH_PROJECTS: 'PROJECTS/SEARCH_PROJECTS',
};

export const initialState = {
  originalList: null, // keep original list
  list: null, // for searching
  sort: { field: 'repoName', isAsc: true },
};

const sortProjects = (projects, action) => {
  const order = action.isAsc ? 'asc' : 'desc';
  const field = typeof projects[0][action.field] === 'string' ? project => project[action.field].toLowerCase() : action.field;
  return _.orderBy(projects, [field], [order]);
};

const searchProjects = (projects, keyword) => {
  const keywordSearch = keyword.toLowerCase();
  return _.filter(projects,
    val => val.authorName.toLowerCase().includes(keywordSearch)
      || val.repoName.toLowerCase().includes(keywordSearch)
      || val.description.toLowerCase().includes(keywordSearch));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REPO_INFO_SUCCESS:
      return {
        ...state,
        list: action.repositories,
        originalList: action.repositories,
      };
    case types.SORT_PROJECTS:
      return {
        ...state,
        sort: {
          field: action.field,
          isAsc: action.isAsc,
        },
        list: sortProjects(state.list, action),
        originalList: sortProjects(state.list, action),
      };
    case types.SEARCH_PROJECTS:
      return {
        ...state,
        list: searchProjects(state.originalList, action.keyword.target.value),
      };
    default:
      return state;
  }
};

export const actions = {
  requestList: () => ({ type: types.FETCH_PROJECTS_REQUEST }),
  sortList: (field, isAsc) => ({ type: types.SORT_PROJECTS, field, isAsc }),
  searchList: keyword => ({ type: types.SEARCH_PROJECTS, keyword }),
};
