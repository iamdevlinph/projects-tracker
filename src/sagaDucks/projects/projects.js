import _ from 'lodash';
import { localStorage } from '../../services';

export const types = {
  FETCH_PROJECTS_REQUEST: 'PROJECTS/FETCH_PROJECTS_REQUEST',
  FETCH_PROJECTS_SUCCESS: 'PROJECTS/FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILED: 'PROJECTS/FETCH_PROJECTS_FAILED',
  SORT_PROJECTS: 'PROJECTS/SORT_PROJECTS',
  SEARCH_PROJECTS: 'PROJECTS/SEARCH_PROJECTS',
  SAVE_PROJECT_REQUEST: 'PROJECTS/SAVE_PROJECT_REQUEST',
  SAVE_PROJECT_SUCCESS: 'PROJECTS/SAVE_PROJECT_SUCCESS',
  SAVE_PROJECT_FAILED: 'PROJECTS/SAVE_PROJECT_FAILED',
  DELETE_PROJECT_REQUEST: 'PROJECTS/DELETE_PROJECT_REQUEST',
  DELETE_PROJECT_SUCCESS: 'PROJECTS/DELETE_PROJECT_SUCCESS',
  DELETE_PROJECT_FAILED: 'PROJECTS/DELETE_PROJECT_FAILED',
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
  const projects = localStorage.getItem('projectsCache').data;
  const keywordSearch = keyword.toLowerCase().trim();
  return _.filter(projects,
    val => val.authorName.toLowerCase().includes(keywordSearch)
      || val.repoName.toLowerCase().includes(keywordSearch)
      || val.description.toLowerCase().includes(keywordSearch));
};

const overrideCache = (cache, data) => cache.map(val => localStorage.setItem(val, data));

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.projects,
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
    case types.SAVE_PROJECT_SUCCESS: {
      const stateSave = {
        ...state,
        list: [
          ...state.list,
          action.repoObj,
        ],
      };
      stateSave.list = _.orderBy(stateSave.list, ['repoName'], ['asc']);
      overrideCache(['projectsCache'], stateSave.list);
      return stateSave;
    }
    case types.DELETE_PROJECT_SUCCESS: {
      const stateDelete = {
        ...state,
        list: state.list.filter(
          val => (val.key !== action.projectKey),
        ),
      };
      overrideCache(['projectsCache'], stateDelete.list);
      return stateDelete;
    }
    default:
      return state;
  }
};

export const actions = {
  requestList: () => ({ type: types.FETCH_PROJECTS_REQUEST }),
  sortList: (field, isAsc) => ({ type: types.SORT_PROJECTS, field, isAsc }),
  searchList: keyword => ({ type: types.SEARCH_PROJECTS, keyword }),
  saveProject: (authorName, repoName) => ({
    type: types.SAVE_PROJECT_REQUEST, authorName, repoName,
  }),
  deleteProject: (projectKey, fullName) => ({
    type: types.DELETE_PROJECT_REQUEST, projectKey, fullName,
  }),
};
