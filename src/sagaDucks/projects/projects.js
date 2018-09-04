import _ from 'lodash';
import { localStorage } from '../../services';

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
  list: null,
  sort: { field: 'repoName', isAsc: true },
};

const sortProjects = (projects, action) => {
  // if no repo was found in the search
  if (projects.length === 0) {
    return [];
  }
  const order = action.isAsc ? 'asc' : 'desc';
  const field = typeof projects[0][action.field] === 'string' ? project => project[action.field].toLowerCase() : action.field;
  return _.orderBy(projects, [field], [order]);
};

const searchProjects = (keyword) => {
  const projects = localStorage.getItem('repoCache').data;
  const keywordSearch = keyword.toLowerCase().trim();
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
      };
    case types.SORT_PROJECTS:
      return {
        ...state,
        sort: {
          field: action.field,
          isAsc: action.isAsc,
        },
        list: sortProjects(state.list, action),
      };
    case types.SEARCH_PROJECTS:
      return {
        ...state,
        list: sortProjects(searchProjects(action.keyword.target.value), state.sort),
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
