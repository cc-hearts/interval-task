export const noop = () => {
  /** noop */
};
export function objectToParams(obj: Record<string, any> | undefined): string {
  if (typeof obj === 'object') {
    let params = '';
    let flag = true;
    for (const key in obj) {
      params += (flag ? '' : '&') + `${key}=${encodeURI(obj[key])}`;
      flag = false;
    }
    return params;
  }
  return '';
}

export function clearObjectValue(obj: Record<string, any>): Record<string, any> {
  const tempObj = Object.assign({}, obj);
  Object.keys(tempObj).forEach((key: keyof typeof obj) => {
    switch (typeof tempObj[key]) {
      case 'string': {
        tempObj[key] = '';
        break;
      }
      case 'number': {
        tempObj[key] = 0;
        break;
      }
      case 'boolean': {
        tempObj[key] = false;
      }
    }
  });

  return tempObj;
}

export const isValidJSON = (string: string): boolean => {
  try {
    JSON.parse(string);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
