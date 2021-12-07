import { getDateDifference, formatDate, toCapitalize } from '../utils';
import {createElement} from '../render.js';

const createScheduleTemplate = (dateFrom, dateTo) => {
  const durationMinutes = getDateDifference(dateFrom, dateTo, 'minute');

  const days = Math.floor(durationMinutes / (60 * 24));
  const hours = Math.floor((durationMinutes - (days * 60 * 24)) / 60);
  const minutes = Math.round(durationMinutes % 60);

  let duration = '';

  if(days > 0) {
    duration = `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if(days === 0 && hours > 0) {
    duration = `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else {
    duration = `${String(minutes).padStart(2, '0')}M`;
  }

  return `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${formatDate(dateFrom, 'YYYY-MM-DDTHH:mm')}">${formatDate(dateFrom, 'HH:mm')}</time>
      &mdash;
      <time class="event__end-time" datetime="${formatDate(dateTo, 'YYYY-MM-DDTHH:mm')}">${formatDate(dateTo, 'HH:mm')}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>`;
};

const createPointOffersTemplate = (offers) => {
  if(offers === null) {
    return '';
  }

  const items = offers.map((offer) => (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  )).join('');

  return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${items}
    </ul>`;
};

const createPointTemplate = (point) => {
  const {type, destination, dateFrom, dateTo, offers, price, isFavorite} = point;
  const offersTemplate = createPointOffersTemplate(offers);
  const scheduleTemplate = createScheduleTemplate(dateFrom, dateTo);

  const title = `${toCapitalize(type)} ${destination}`;

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<div class="event">
    <time class="event__date" datetime="${formatDate(dateFrom, 'YYYY-MM-DD')}">${formatDate(dateFrom, 'MMM D')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${title}</h3>
    ${scheduleTemplate}
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    ${offersTemplate}
    <button class="event__favorite-btn ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
};

export default class PointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
