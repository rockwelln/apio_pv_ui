const getPrefix = number => {
  const prefix = number.match(/^(\+\d{1,3})?0+/g);
  return prefix && prefix[0];
};

export const getRange = (from, to) => {
  const p1 = getPrefix(from);
  const p2 = getPrefix(to);

  if (!p1 || !p2 || p1 !== p2) {
    return;
  }

  const resultArr = [],
    pLen = p1.length;

  for (let j = +from.slice(pLen), end = +to.slice(pLen); j <= end; j++) {
    resultArr.push(p1 + j);
  }

  return resultArr;
};
