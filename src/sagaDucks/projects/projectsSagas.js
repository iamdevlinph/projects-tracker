import {
  put, takeLatest, call, select,
} from 'redux-saga/effects';
import _ from 'lodash';
import {
  firebaseFuncs, localStorage, githubApi, swalService,
} from '../../services';

import { types as projectsTypes } from './projects';
import { types as commonTypes } from '../common/common';
import rsf, { onAuthStateChanged } from '../rsf';

import { getProjects } from '../selectors';

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
    updatedAt: repoInfoObj.updatedAt,
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

// update data on firestore
function* updateFirestoreRepo(proj) {
  const currentUser = yield call(onAuthStateChanged);
  const userId = currentUser.uid;
  try {
    yield call(onAuthStateChanged);
    yield call(
      rsf.firestore.setDocument,
      `projects-${userId}/${proj.key}`,
      { ...proj },
    );
  } catch (e) {
    console.error('Don\'t save to firestore');
  }
}

function* isRepoDataUpdated(projects) {
  // get the latest update of the repos
  const getUpdatedAt = yield projects.map(proj => call(githubApi.isRepoUpdated, proj));
  // get the outdated repos
  const outDated = getUpdatedAt.filter(proj => !proj.isUpdated);
  // iterate and get the latest repoInfo
  const updated = yield outDated.map(
    proj => call(githubApi.getRepoInfo, proj.authorName, proj.repoName),
  );
  // clean out the data
  const mappedUpdated = updated.map(proj => mapData(proj));
  // merge the udpated data to the original data
  let allProj = [];
  if (mappedUpdated.length > 0) {
    allProj = projects.map((proj) => {
      const updatedProj = _.find(mappedUpdated, { fullName: proj.fullName });
      return {
        ...proj,
        ...updatedProj,
      };
    });

    yield allProj.map(proj => call(updateFirestoreRepo, proj));
  }
  return allProj;
}

function* willFetchProjects() {
  try {
    const currentUser = yield call(onAuthStateChanged);
    const userId = currentUser.uid;
    const projectsCache = localStorage.isCached('projectsCache');
    let projects;

    if (!projectsCache) {
      projects = yield call(firebaseFuncs.getProjects, userId);
      localStorage.setItem('projectsCache', projects);
    } else {
      projects = projectsCache;
    }

    const updatedRepoInfo = yield isRepoDataUpdated(projects);
    if (updatedRepoInfo && updatedRepoInfo.length > 0) {
      projects = updatedRepoInfo;
      localStorage.setItem('projectsCache', updatedRepoInfo);
    }

    yield put({ type: projectsTypes.FETCH_PROJECTS_SUCCESS, projects });
  } catch (e) {
    console.error(`${projectsTypes.FETCH_PROJECTS_FAILED} ${e}`);
  }
}

function* willSaveProject(action) {
  yield put({ type: commonTypes.AJAX_INC });
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
        const currentUser = yield call(onAuthStateChanged);
        const userId = currentUser.uid;
        const repoObj = mapData(repoInfo);
        // save repoInfo to firestore
        const firebaseProj = yield call(
          rsf.firestore.addDocument,
          `projects-${userId}`,
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
  } finally {
    yield put({ type: commonTypes.AJAX_DEC });
  }
}

function* willDeleteProject(action) {
  yield put({ type: commonTypes.AJAX_INC });
  try {
    const currentUser = yield call(onAuthStateChanged);
    const userId = currentUser.uid;
    const isDelete = yield (swalService.confirm('Delete Project', `Are you sure you want to delete <strong class="red-text">${action.fullName}</strong>?\nThis change cannot be undone.`));
    if (isDelete.value) {
      yield call(
        rsf.firestore.deleteDocument, `projects-${userId}/${action.projectKey}`,
      );
      yield put({ type: projectsTypes.DELETE_PROJECT_SUCCESS, projectKey: action.projectKey });
      swalService.success('Deleted project', `Deleted ${action.fullName}`);
    }
  } catch (e) {
    console.error(`${projectsTypes.DELETE_PROJECT_FAILED} ${e}`);
  } finally {
    yield put({ type: commonTypes.AJAX_DEC });
  }
}

const projectsSagas = [
  takeLatest(projectsTypes.FETCH_PROJECTS_REQUEST, willFetchProjects),
  takeLatest(projectsTypes.SAVE_PROJECT_REQUEST, willSaveProject),
  takeLatest(projectsTypes.DELETE_PROJECT_REQUEST, willDeleteProject),
];

export default projectsSagas;
