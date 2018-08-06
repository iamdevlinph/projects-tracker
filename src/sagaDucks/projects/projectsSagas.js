import {
  put, takeLatest, call,
} from 'redux-saga/effects';
import _ from 'lodash';
import rsf from '../rsf';
import firebaseFuncs from '../../services/firebase-functions';
import localStorage from '../../services/localStorage';
import githubApi from '../../services/githubApi';

import { types as projectsTypes } from './projects';

const isDev = process.env.NODE_ENV === 'development';

function* willFetchProjects() {
  try {
    const projectsCache = localStorage.isCached('projectsCache');
    let projects;

    if (!projectsCache) {
      if (isDev) {
        projects = yield call(firebaseFuncs.getProjects);
        localStorage.setItem('projectsCache', projects);
      } else {
        projects = yield call(rsf.functions.call, 'getProjects');
        localStorage.setItem('projectsCache', projects);
      }
    } else {
      projects = projectsCache;
    }

    yield put({ type: projectsTypes.FETCH_PROJECTS_SUCCESS, projects });
  } catch (e) {
    console.error(e);
  }
}

function* willFetchRepoInfo(action) {
  try {
    const repoCache = localStorage.isCached('repoCache');
    let repoInfoData;
    if (!repoCache) {
      const repoInfo = yield (githubApi.getRepoInfo(action.projects));
      const repositories = [];
      repoInfo.forEach((repo) => {
        const { owner } = repo.data.repository;
        const issueCount = repo.data.repository.issues.totalCount;
        const prCount = repo.data.repository.pullRequests.totalCount;
        const commitInfo = repo.data.repository.defaultBranchRef.target.history.nodes[0];
        const repoInfoObj = repo.data.repository;
        repositories.push({
          repoName: repoInfoObj.name,
          description: repoInfoObj.description,
          fullName: repoInfoObj.nameWithOwner,
          repoUrl: repoInfoObj.url,
          homepageUrl: repoInfoObj.homepageUrl,
          authorName: owner.login,
          authorAvatar: owner.avatarUrl,
          authorUrl: owner.url,
          issuesCount: issueCount,
          prsCount: prCount,
          lastCommitSha: commitInfo.oid,
          lastCommitMsg: commitInfo.message,
          lastCommitAuthor: commitInfo.committer.name,
          lastCommitDate: commitInfo.committedDate,
          lastCommitUrl: commitInfo.commitUrl,
          // firebase key
          key: _.find(action.projects, { fullName: repoInfoObj.nameWithOwner }).key,
        });
      });
      repoInfoData = repositories;
      localStorage.setItem('repoCache', repositories);
    } else {
      repoInfoData = repoCache;
    }
    yield put({ type: projectsTypes.FETCH_REPO_INFO_SUCCESS, repositories: repoInfoData });
  } catch (e) {
    console.error(e);
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_PROJECTS_REQUEST, willFetchProjects),
  takeLatest(projectsTypes.FETCH_PROJECTS_SUCCESS, willFetchRepoInfo),
];

export default projectsSagas;
