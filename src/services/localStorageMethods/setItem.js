import moment from 'moment';

const currentDate = moment().format('X');

const setItem = (key, data) => {
  const dataToStore = {
    data,
    cachedTime: currentDate,
  };
  window.localStorage.setItem(key, JSON.stringify(dataToStore));
};

export default setItem;
