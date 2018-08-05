import moment from 'moment';
import getItem from './getItem';

const currentDate = moment().format('X');

// cache for 30 minutes
const isCached = (key) => {
  let flag = false;
  const retrieved = getItem(key);
  if (retrieved && (currentDate - retrieved.cachedTime < 1801)) {
    flag = retrieved.data;
  }
  return flag;
};

export default isCached;
