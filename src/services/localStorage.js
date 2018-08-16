import getItem from './localStorageMethods/getItem';
import isCached from './localStorageMethods/isCached';
import removeItem from './localStorageMethods/removeItem';
import setItem from './localStorageMethods/setItem';

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
