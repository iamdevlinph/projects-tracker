import moment from 'moment';

const commonData = {
  authorName: 'Author',
  authorUrl: '#',
  repoName: 'Repository',
  repoUrl: '#',
  description: 'Description',
};

const generateDefaultData = () => ({
  ...commonData,
  updatedAt: moment().format(),
  lastCommitMsgPlaceholder: 'Up to date',
  issuesCount: 0,
  prsCount: 0,
});

const generateSafeData = () => ({
  ...commonData,
  updatedAt: moment().format(),
  lastCommitMsgPlaceholder: 'Up to date',
  issuesCount: 1,
  prsCount: 1,
});

const generateWarningData = settings => ({
  ...commonData,
  updatedAt: moment().subtract(settings.update.warningCount, 'd').format(),
  lastCommitMsgPlaceholder: `Updated ${settings.update.warningCount} days ago`,
  issuesCount: settings.issues.warningCount,
  prsCount: settings.pulls.warningCount,
});

const generateDangerData = settings => ({
  ...commonData,
  updatedAt: moment().subtract(settings.update.dangerCount, 'd').format(),
  lastCommitMsgPlaceholder: `Updated ${settings.update.dangerCount} days ago`,
  issuesCount: settings.issues.dangerCount,
  prsCount: settings.pulls.dangerCount,
});

const SettingsUtil = {
  generateDefaultData,
  generateSafeData,
  generateWarningData,
  generateDangerData,
};

export default SettingsUtil;
