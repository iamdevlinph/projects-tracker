import {
  put, takeLatest, call, select,
} from 'redux-saga/effects';
import _ from 'lodash';
import {
  firebaseFuncs, localStorage, githubApi, swalService,
} from '../../services';

import { types as projectsTypes } from './projects';
import rsf from '../rsf';

import { getProjects } from './projectsSelectors';

function* willFetchProjects() {
  try {
    const projectsCache = localStorage.isCached('projectsCache');
    let projects;

    if (!projectsCache) {
      projects = yield call(firebaseFuncs.getProjects);
      localStorage.setItem('projectsCache', projects);
    } else {
      projects = projectsCache;
    }

    // yield put({ type: projectsTypes.FETCH_PROJECTS_SUCCESS, projects });
    yield put({ type: projectsTypes.FETCH_REPO_INFO_SUCCESS, projects });
  } catch (e) {
    console.error(`${projectsTypes.FETCH_PROJECTS_FAILED} ${e}`);
  }
}

const mapData = (repo) => {
  const { owner } = repo.data.repository;
  const issueCount = repo.data.repository.issues.totalCount;
  const prCount = repo.data.repository.pullRequests.totalCount;
  const commitInfo = repo.data.repository.defaultBranchRef.target.history.nodes[0];
  const repoInfoObj = repo.data.repository;
  return {
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
  };
};

function* willSaveProject(action) {
  try {
    const projects = yield select(getProjects);
    const projectFullName = `${action.authorName}/${action.repoName}`;
    const projectDup = _.find(projects, { fullName: projectFullName });
    // exit if project already exists. even if it is the current project
    if (projectDup) {
      swalService.error('Cannot save project', `<strong class="red-text">${projectFullName}</strong> already exists`);
      return;
    }

    // only proceed if save is applicable
    const repoInfo = yield (githubApi.getRepoInfo(action.authorName, action.repoName));
    if (repoInfo.errors) { // firebase error
      swalService.error(`${projectFullName} is not valid`, repoInfo.errors[0].message);
    } else { // no error
      try {
        const repoObj = mapData(repoInfo);
        // save repoInfo to firestore
        const firebaseProj = yield call(
          rsf.firestore.addDocument,
          'projects-v2',
          { ...repoObj },
        );
        // add firestore key to the object for local use
        repoObj.key = firebaseProj.id;
        swalService.success(`Added ${projectFullName} successfully`);
        yield put({ type: projectsTypes.SAVE_PROJECT_SUCCESS, repoObj });
      } catch (e) {
        swalService.error('Add failed', e);
      }
    }
  } catch (e) {
    console.error(`${projectsTypes.SAVE_PROJECT_FAILED} ${e}`);
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_PROJECTS_REQUEST, willFetchProjects),
  takeLatest(projectsTypes.SAVE_PROJECT_REQUEST, willSaveProject),
];

export default projectsSagas;
