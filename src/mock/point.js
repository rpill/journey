import dayjs from 'dayjs';
import { TYPES, DESTINATIONS, OFFERS } from '../const.js';
import { getRandomInteger } from '../utils/common.js';

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex].name;
};

const generateDates = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const from = dayjs().add(daysGap, 'day').add(getRandomInteger(0, 1000), 'minute').toDate();
  const to = dayjs(from).add(getRandomInteger(0, 1), 'day').add(getRandomInteger(0, 500), 'minute').toDate();
  return {from, to};
};

const generateOffers = (type) => {
  const offers = OFFERS[type];
  return offers.slice(getRandomInteger(0, offers.length));
};

export const generatePoint = () => {
  const type = generateType();
  const dates = generateDates();

  return {
    type,
    destination: generateDestination(),
    dateFrom: dates.from,
    dateTo: dates.to,
    offers: generateOffers(type),
    price: getRandomInteger(50, 250),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
