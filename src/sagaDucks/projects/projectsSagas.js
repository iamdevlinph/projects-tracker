/* global fetch */

import {
  put, takeLatest, call, all,
} from 'redux-saga/effects';
import _ from 'lodash';
import rsf from '../rsf';
import firebaseFuncs from '../../services/firebase-functions';

import { types as projectsTypes } from './projects';

const isDev = process.env.NODE_ENV === 'development';

function* willFetchProjects() {
  try {
    let projects;
    if (isDev) {
      projects = yield call(firebaseFuncs.getProjects);
    } else {
      projects = yield call(rsf.functions.call, 'getProjects');
    }

    yield put({ type: projectsTypes.FETCH_PROJECTS_SUCCESS, projects });
  } catch (e) {
    console.error(e);
  }
}

function* willFetchRepoInfo(action) {
  try {
    const repoInfoPromises = [];
    // const prcountPromises = [];
    // const commitPromises = [];
    action.projects.forEach((project) => {
      repoInfoPromises.push(fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}`).then(res => res.json()));
      // these APIs have limits. going to use shield badges instead
      // prcountPromises.push(fetch(`https://api.github.com/search/issues?q=+type:pr+repo:${project.authorName}/${project.repoName}+state:open&sort=created&order=asc`).then(res => res.json()));
      // commitPromises.push(fetch('https://api.github.com/search/commits?q=+repo:iamdevlinph/resume', { Accept: 'application/vnd.github.cloak-preview' }).then(res => res.json()));
    });
    const resolveRepoInfo = yield all(repoInfoPromises);
    // const resolveprCount = yield all(prcountPromises);

    const projects = [];
    resolveRepoInfo.forEach((repoInfo) => {
      // const repoInfo = resolveRepoInfo[key];
      projects.push({
        repoName: repoInfo.name,
        description: repoInfo.description,
        fullName: repoInfo.full_name,
        authorName: repoInfo.owner.login,
        authorAvatar: repoInfo.owner.avatar_url,
        authorUrl: '',
        repoUrl: '',
        issues: `https://img.shields.io/github/issues/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square`,
        // issues: repoInfo.open_issues_count,
        stars: `https://img.shields.io/github/stars/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square`,
        // stars: repoInfo.stargazers_count,
        prsOpen: `https://img.shields.io/github/issues-pr/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square`,
        // prsOpen: resolveprCount[i].total_count,
        // lastCommit: '',
        // lastCommitDate: '',
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
