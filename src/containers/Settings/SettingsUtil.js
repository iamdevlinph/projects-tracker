import moment from 'moment';

const commonData = {
  authorAvatar: 'https://avatars2.githubusercontent.com/u/19337229?v=4',
  authorName: 'Author',
  authorUrl: '#',
  repoName: 'Repository',
  repoUrl: '#',
  description: 'Description',
};

const generateSafeData = () => ({
  ...commonData,
  lastCommitDate: moment().format(),
  lastCommitMsgPlaceholder: 'Up to date',
  issuesCount: 1,
  prsCount: 1,
});

const generateWarningData = settings => ({
  ...commonData,
  lastCommitDate: moment().subtract(settings.update.warningCount, 'd').format(),
  lastCommitMsgPlaceholder: `Updated ${settings.update.warningCount} days ago`,
  issuesCount: settings.issues.warningCount,
  prsCount: settings.pulls.warningCount,
});

const generateDangerData = settings => ({
  ...commonData,
  lastCommitDate: moment().subtract(settings.update.dangerCount, 'd').format(),
  lastCommitMsgPlaceholder: `Updated ${settings.update.dangerCount} days ago`,
  issuesCount: settings.issues.dangerCount,
  prsCount: settings.pulls.dangerCount,
});

const SettingsUtil = {
  generateSafeData,
  generateWarningData,
  generateDangerData,
};

export default SettingsUtil;
