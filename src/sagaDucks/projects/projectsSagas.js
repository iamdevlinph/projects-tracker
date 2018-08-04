/* global fetch */

import {
  put, takeLatest, call, all,
} from 'redux-saga/effects';
import _ from 'lodash';
import rsf from '../rsf';
import firebaseFuncs from '../../services/firebase-functions';
import localStorage from '../../services/localStorage';

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
    const repoInfoCache = localStorage.isCached('repoInfoPromises');
    const repoInfoPromises = [];
    const prcountCache = localStorage.isCached('prcountPromises');
    const prcountPromises = [];
    const commitInfoCache = localStorage.isCached('commitPromises');
    const commitPromises = [];
    action.projects.forEach((project) => {
      if (!repoInfoCache) {
        repoInfoPromises.push(fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}`).then(res => res.json()));
      }
      if (!prcountCache) {
        prcountPromises.push(fetch(`https://api.github.com/search/issues?q=+type:pr+repo:${project.authorName}/${project.repoName}+state:open&sort=created&order=asc`).then(res => res.json()));
      }
      if (!commitInfoCache) {
        commitPromises.push(
          fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}/git/refs/heads/master`)
            .then(refObj => Promise.resolve(refObj.json())
              .then(refObjResolve => fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}/commits/${refObjResolve.object.sha}`)
                .then(commitObj => Promise.resolve(commitObj.json())
                  .then(commitData => commitData)))),
        );
      }
    });
    let resolveRepoInfo;
    if (!repoInfoCache) {
      resolveRepoInfo = yield all(repoInfoPromises);
      localStorage.setItem('repoInfoPromises', resolveRepoInfo);
    } else {
      resolveRepoInfo = repoInfoCache;
    }
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
        // issuesCount: `https://img.shields.io/github/issues/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square&maxAge=3600`,
        issuesCount: repoInfo.open_issues_count,
        // starsCount: `https://img.shields.io/github/stars/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square&maxAge=3600`,
        starsCount: repoInfo.stargazers_count,
        // prsCount: `https://img.shields.io/github/issues-pr/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square&maxAge=3600`,
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
