import reduce from 'lodash/reduce';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';

import en_US from './en_US';
import vi_VN from './vi_VN';

const flattenKeys = (obj, paths = []) =>
  !isObject(obj)
    ? { [paths.join('.')]: obj }
    : reduce(
        obj,
        (sources, next, key) =>
          merge(sources, flattenKeys(next, [...paths, key])),
        {}
      );

export const messages = {
  vi_VN: flattenKeys(vi_VN),
  en_US: flattenKeys(en_US)
};
