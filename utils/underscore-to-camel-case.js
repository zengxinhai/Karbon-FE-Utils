export const underScoreToCamelCase = (underScoreName) => {
  return underScoreName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export const isPrimitiveType = (variable) => {
  const primitiveTypes = ['number', 'string', 'boolean', 'undefined'];
  const varType = typeof(variable);
  return primitiveTypes.includes(varType) || variable === null;
}

export const transformToCamelCaseKeys = (obj) => {
  if (isPrimitiveType(obj)) return obj;
  if (obj instanceof Array) {
    const newArrayObj = [];
    for (const item of obj) {
      newArrayObj.push(transformToCamelCaseKeys(item));
    }
    return newArrayObj;
  }
  const newObj = {};
  for(const key of Object.keys(obj)) {
    const newKey = underScoreToCamelCase(key);
    newObj[newKey] = transformToCamelCaseKeys(obj[key]);
  }
  return newObj;
}
