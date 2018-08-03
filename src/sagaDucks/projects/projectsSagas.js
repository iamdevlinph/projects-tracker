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
    const prcountPromises = [];
    const commitPromises = [];
    action.projects.forEach((project) => {
      repoInfoPromises.push(fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}`).then(res => res.json()));
      // the search APIs have limits
      prcountPromises.push(fetch(`https://api.github.com/search/issues?q=+type:pr+repo:${project.authorName}/${project.repoName}+state:open&sort=created&order=asc`).then(res => res.json()));
      commitPromises.push(
        fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}/git/refs/heads/master`)
          .then(refObj => Promise.resolve(refObj.json())
            .then(refObjResolve => fetch(`https://api.github.com/repos/${project.authorName}/${project.repoName}/commits/${refObjResolve.object.sha}`)
              .then(commitObj => Promise.resolve(commitObj.json())
                .then(commitData => commitData)))),
      );
    });
    const resolveRepoInfo = yield all(repoInfoPromises);
    const resolveprCount = yield all(prcountPromises);
    const resolveCommits = yield all(commitPromises);

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
        // issues: `https://img.shields.io/github/issues/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square&maxAge=3600`,
        issuesCount: repoInfo.open_issues_count,
        // stars: `https://img.shields.io/github/stars/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square&maxAge=3600`,
        starsCount: repoInfo.stargazers_count,
        // prsOpen: `https://img.shields.io/github/issues-pr/${repoInfo.owner.login}/${repoInfo.name}.svg?style=flat-square&maxAge=3600`,
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
