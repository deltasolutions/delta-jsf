import { isObject } from './guards';

export const set = (data: object, path: string | string[], value: any) => {
  const pathArray = Array.isArray(path) ? path : path.split('.');
  const length = pathArray.length;
  for (let i = 0; i < length - 1; i++) {
    const pathItem = pathArray[i];
    if (!data[pathItem] || !isObject(data[pathItem])) {
      data[pathItem] = {};
    }
    data = data[pathItem];
  }
  data[pathArray[length - 1]] = value;
};
