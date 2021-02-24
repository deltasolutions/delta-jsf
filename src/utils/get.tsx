export const get = (
  data: object,
  path: string | string[],
  defaultValue?: any
) => {
  const pathArray = Array.isArray(path) ? path : path.split('.');
  return pathArray.reduce((acc, v) => {
    try {
      acc = acc[v] === undefined ? defaultValue : acc[v];
    } catch (e) {
      return defaultValue;
    }
    return acc;
  }, data);
};
