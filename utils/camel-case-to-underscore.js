export const camelCaseToUnderscore = (camelCaseName) => {
  return camelCaseName.replace(/(?:^|\.?)([A-Z])/g, (_, y) => {return "_" + y.toLowerCase()}).replace(/^_/, "");
}

export const transformToUnderscoreKeys = (obj) => {
  if (obj === null || obj === undefined) return obj;
  const newObj = {};
  for(const key of Object.keys(obj)) {
    const newKey = camelCaseToUnderscore(key);
    newObj[newKey] = obj[key];
  }
  return newObj;
}
