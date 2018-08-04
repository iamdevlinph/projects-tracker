import {
  put, takeLatest, call, all,
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
    const projectsCache = localStorage.isCached('getProjects');
    let projects;

    if (!projectsCache) {
      if (isDev) {
        projects = yield call(firebaseFuncs.getProjects);
        localStorage.setItem('getProjects', projects);
      } else {
        projects = yield call(rsf.functions.call, 'getProjects');
        localStorage.setItem('getProjects', projects);
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
    const prcountCache = localStorage.isCached('prcountPromises');
    const prcountPromises = [];
    const commitInfoCache = localStorage.isCached('commitPromises');
    const commitPromises = [];
    action.projects.forEach((project) => {
      if (!prcountCache) {
        prcountPromises.push(githubApi.getPrCount(project.authorName, project.repoName));
      }
      if (!commitInfoCache) {
        commitPromises.push(githubApi.getCommitInfo(project.authorName, project.repoName));
      }
    });
    const resolveRepoInfo = yield (githubApi.getRepoInfo(action.projects));
    let resolveprCount;
    if (!prcountCache) {
      resolveprCount = yield all(prcountPromises);
      localStorage.setItem('prcountPromises', resolveprCount);
    } else {
      resolveprCount = prcountCache;
    }
    let resolveCommits;
    if (!commitInfoCache) {
      resolveCommits = yield all(commitPromises);
      localStorage.setItem('commitPromises', resolveCommits);
    } else {
      resolveCommits = commitInfoCache;
    }

    const projects = [];
    resolveRepoInfo.forEach((repoInfo, i) => {
      const commitInfo = resolveCommits[i];
      // const repoInfo = resolveRepoInfo[key];
      projects.push({
        repoName: repoInfo.name,
        description: repoInfo.description,
        fullName: repoInfo.full_name,
        authorName: repoInfo.owner.login,
        authorAvatar: repoInfo.owner.avatar_url,
        authorUrl: `https://github.com/${repoInfo.owner.login}`,
        repoUrl: `https://github.com/${repoInfo.owner.login}/${repoInfo.name}`,
        issuesCount: repoInfo.open_issues_count,
        starsCount: repoInfo.stargazers_count,
        prsCount: resolveprCount[i].total_count,
        lastCommitSha: commitInfo.sha,
        lastCommitMsg: commitInfo.commit.message,
        lastCommitAuthor: commitInfo.commit.committer.name,
        lastCommitDate: commitInfo.commit.committer.date,
        key: _.find(action.projects, { fullName: repoInfo.full_name }).key, // firestore key
      });
    });
    yield put({ type: projectsTypes.FETCH_REPO_INFO_SUCCESS, projects });
  } catch (e) {
    console.error(e);
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_PROJECTS_REQUEST, willFetchProjects),
  takeLatest(projectsTypes.FETCH_PROJECTS_SUCCESS, willFetchRepoInfo),
];

export default projectsSagas;
