import moment from 'moment';
import getItem from './getItem';

const currentDate = moment().format('X');
const isDev = process.env.NODE_ENV === 'development';

// cache for 30 minutes
// return cache if in development
const isCached = (key) => {
  let flag = false;
  const retrieved = getItem(key);
  if (retrieved && ((currentDate - retrieved.cachedTime < 1801) || isDev)) {
    flag = retrieved.data;
  }
  return flag;
};

export default isCached;
