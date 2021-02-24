export const clone = <T extends unknown>(data: T): T => {
  // TODO: fix types
  const item = data as any;
  if (!item) {
    return item;
  }

  let result;

  [Number, String, Boolean].forEach(function (type) {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result === 'undefined') {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      result = [];
      item.forEach(function (child, index, array) {
        result[index] = clone(child);
      });
    } else if (typeof item === 'object') {
      if (item.nodeType && typeof item.cloneNode == 'function') {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          result = {};
          for (let i in item) {
            result[i] = clone(item[i]);
          }
        }
      } else {
        if (item.constructor) {
          result = new item.constructor();
        } else {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }

  return result;
};
