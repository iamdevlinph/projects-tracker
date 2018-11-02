import moment from 'moment';

const getStatusColor = (data, settings) => {
  const repoLastUpdateSeconds = moment().format('X') - moment(data.updatedAt).format('X');
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

const daysAgo = (days) => {
  // add 1 to include the start day
  const diff = moment(days).diff(moment().format(), 'days');
  let returnDays;
  if (diff === 0) {
    returnDays = 'Today';
  } else {
    const newDiff = Math.abs(diff) + 1;
    returnDays = `${newDiff} days ago`;
  }
  return returnDays;
};

const CardUtil = {
  getStatusColor,
  daysAgo,
};

export default CardUtil;
