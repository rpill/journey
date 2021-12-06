import { TYPES, OFFERS, DESTINATIONS } from '../const';
import { formatDate, toCapitalize, toKebabCase } from '../utils';

const createPointEditTypesTemplate = (type) => {

  const types = TYPES.map((name) => `<div class="event__type-item">
    <input 
      id="event-type-${name}" 
      class="event__type-input  visually-hidden" 
      type="radio" name="event-type" 
      value="${name}"
      ${name === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${name}" for="event-type-${name}">${toCapitalize(name)}</label>
  </div>`).join('');

  return `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        ${types}
      </fieldset>
    </div>
  </div>`;
};

const createPointEditDestinationsListTemplate = (destination, type) => {

  const items = DESTINATIONS.map(({name}) => `<option value="${name}"></option>`).join('');

  return `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${toCapitalize(type)}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${items}
    </datalist>
  </div>`;
};

const createPointEditOffersTemplate = (type, offers) => {
  if(OFFERS[type].length === 0) {
    return '';
  }

  const items = OFFERS[type].map((offer) => {

    const kebabName = toKebabCase(offer.name.toLowerCase());

    const isChecked = offers.some(({name}) => name === offer.name);

    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" 
        id="event-offer-${kebabName}" 
        type="checkbox" name="event-offer-${kebabName}" 
        ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${kebabName}">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${items}
    </div>
  </section>`;
};

const createPointEditDestinationTemplate = (destination) => {
  const {description, pictures} = DESTINATIONS.find(({name}) => name === destination);
  console.log(destination);

  if(description === '' && pictures.length === 0) {
    return '';
  }

  const photos = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${description ? `<p class="event__destination-description">${description}</p>` : ''}

    ${pictures.length ? `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos}
      </div>
    </div>` : ''}
  </section>`;
};

export const createPointEditTemplate = (point) => {

  const {type, destination, dateFrom, dateTo, offers, price} = point;

  const typesTemplate = createPointEditTypesTemplate(type);
  const destinationsListTemplate = createPointEditDestinationsListTemplate(destination, type);
  const offersTemplate = createPointEditOffersTemplate(type, offers);
  const destinationTemplate = createPointEditDestinationTemplate(destination);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${typesTemplate}
      ${destinationsListTemplate}

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, 'DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, 'DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    ${offersTemplate && destinationTemplate ? `<section class="event__details">
        ${offersTemplate}
        ${destinationTemplate}
      </section>` : ''}
  </form>`;
};
