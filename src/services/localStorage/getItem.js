const getItem = (key) => {
  let returnData = null;
  const data = JSON.parse(window.localStorage.getItem(key));
  if (data) {
    returnData = data;
  }
  return returnData;
};

export default getItem;
