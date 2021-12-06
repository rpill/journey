import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formatDate = (date, format) => dayjs(date).format(format);

export const getDateDifference = (date1, date2, unit = 'millisecond') => {
  const date1Date = dayjs(date1);
  const date2Date = dayjs(date2);

  return date2Date.diff(date1Date, unit);
};

export const toCapitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const toKebabCase = (string) =>
  string &&
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
