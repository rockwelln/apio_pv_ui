export const get = (obj, path) => {
  let arrayOfPath = path.split(".");
  let subObj = obj;
  let result = null;
  for (let i = 0; i < arrayOfPath.length; i++) {
    if (subObj.hasOwnProperty(arrayOfPath[i])) {
      subObj = subObj[arrayOfPath[i]];
      result = true;
    } else {
      result = false;
      break;
    }
  }
  if (subObj === null || subObj === undefined) {
    return false;
  }
  return result;
};

const has = (obj, path) => {
  const arrPath = path.split(".");
  for (let i = 0; i < arrPath.length; i++) {
    if (obj.hasOwnProperty(arrPath[i])) {
      obj = obj[arrPath[i]];
    } else return false;
  }
  return true;
};
