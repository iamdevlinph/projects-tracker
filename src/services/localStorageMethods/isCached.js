import moment from 'moment';
import getItem from './getItem';

const currentDate = moment().format('X');

// cache for 1 hour
const isCached = (key) => {
  let flag = false;
  const retrieved = getItem(key);
  if (retrieved && (currentDate - retrieved.cachedTime < 3601)) {
    flag = retrieved.data;
  }
  return flag;
};

export default isCached;
