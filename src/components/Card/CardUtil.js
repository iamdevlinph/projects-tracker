import moment from 'moment';

const getStatusColor = (data, settings) => {
  const repoLastUpdateSeconds = moment().format('X') - moment(data.lastCommitDate).format('X');
  const repoLastUpdateDays = (repoLastUpdateSeconds / 86400).toFixed(0);
  let repoUpdateStatusColor;
  switch (true) {
    case (repoLastUpdateDays >= settings.updateDangerDays):
      repoUpdateStatusColor = settings.updateDanger;
      break;
    case (repoLastUpdateDays >= settings.updateWarningDays):
      repoUpdateStatusColor = settings.updateWarning;
      break;
    default:
      repoUpdateStatusColor = settings.updateSafe;
      break;
  }
  return repoUpdateStatusColor;
};

const CardUtil = {
  getStatusColor,
};

export default CardUtil;
