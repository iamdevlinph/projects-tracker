import moment from 'moment';

const getStatusColor = (data, settings) => {
  const repoLastUpdateSeconds = moment().format('X') - moment(data.lastCommitDate).format('X');
  const repoLastUpdateDays = (repoLastUpdateSeconds / 86400).toFixed(0);
  let repoUpdateStatusColor;
  const { update } = settings;
  switch (true) {
    case (repoLastUpdateDays >= update.dangerCount):
      repoUpdateStatusColor = update.dangerColor;
      break;
    case (repoLastUpdateDays >= update.warningCount):
      repoUpdateStatusColor = update.warningColor;
      break;
    default:
      repoUpdateStatusColor = update.safeColor;
      break;
  }
  return repoUpdateStatusColor;
};

const CardUtil = {
  getStatusColor,
};

export default CardUtil;
