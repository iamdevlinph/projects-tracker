import getItem from './getItem';
import isCached from './isCached';
import removeItem from './removeItem';
import setItem from './setItem';

const localStorage = {
  getItem,
  isCached,
  removeItem,
  setItem,
  clearAll: () => {
    window.localStorage.clear();
  },
};

export default localStorage;
