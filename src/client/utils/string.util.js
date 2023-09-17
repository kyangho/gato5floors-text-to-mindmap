import { join, isString } from 'lodash';
export function stringToColour(str) {
  if (!str) {
    str = '';
  }
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, '0');
  }
  return colour;
}

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

export function renderRoomTypeName(roomType) {
  if (!roomType) return '';

  const singleBed = roomType.numSingleBed
    ? `${roomType.numSingleBed} giường đơn`
    : null;
  const doubleBed = roomType.numDoubleBed
    ? `${roomType.numDoubleBed} giường đôi`
    : null;

  return join([roomType.name, singleBed, doubleBed].filter(isString), ' - ');
}
