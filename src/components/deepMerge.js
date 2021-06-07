const deepMerge = (target, source) => {
  const copiedTarget = { ...target };
  const copiedSource = { ...source };
  for (const key of Object.keys(copiedSource)) {
    if (copiedSource[key] instanceof Object) {
      Object.assign(
        copiedSource[key],
        deepMerge(copiedTarget[key], copiedSource[key])
      );
    }
  }
  Object.assign(copiedTarget || {}, copiedSource);
  return copiedTarget;
};

export default deepMerge;
