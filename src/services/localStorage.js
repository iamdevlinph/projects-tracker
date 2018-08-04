import moment from 'moment';

const currentDate = moment().format('X');
const setItem = (key, data) => {
  const dataToStore = {
    data,
    cachedTime: currentDate,
  };
  window.localStorage.setItem(key, JSON.stringify(dataToStore));
};
const getItem = (key) => {
  let returnData = null;
  const data = JSON.parse(window.localStorage.getItem(key));
  if (data) {
    returnData = data;
  }
  return returnData;
};
const removeItem = (key) => {
  window.localStorage.removeItem(key);
};
// cache for 1 hour
const isCached = (key) => {
  let flag = false;
  const retrieved = getItem(key);
  if (retrieved && (currentDate - retrieved.cachedTime < 3601)) {
    flag = retrieved.data;
  }
  return flag;
};

const localStorage = {
  setItem,
  getItem,
  removeItem,
  isCached,
};

export default localStorage;
