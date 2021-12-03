import {createTripInfo} from './view/trip-info.js';
import {createTripTabs} from './view/trip-tabs.js';
import {createTripFilters} from './view/trip-filters.js';
import {createTripSort} from './view/trip-sort.js';
import {createEventAdd} from './view/event-add.js';
import {createEventEdit} from './view/event-edit.js';
import {createEvent} from './view/event.js';
import {renderTemplate, RenderPosition} from './render.js';

const EVENT_COUNT = 3;

const createElement = (tag, className = '') => {
  const element = document.createElement(tag);
  element.className = className;

  return element;
};

const sitePageBodyElement = document.querySelector('.page-body');
const tripMainElement = sitePageBodyElement.querySelector('.trip-main');

renderTemplate(tripMainElement, createTripInfo(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector('.trip-controls');
const tripNavigationElement = tripControlsElement.querySelector('.trip-controls__navigation');

renderTemplate(tripNavigationElement, createTripTabs(), RenderPosition.BEFOREEND);

const tripFiltersElement = tripControlsElement.querySelector('.trip-controls__filters');

renderTemplate(tripFiltersElement, createTripFilters(), RenderPosition.BEFOREEND);

const sitePageMainElement = sitePageBodyElement.querySelector('.page-main');
const tripEventsElement = sitePageMainElement.querySelector('.trip-events');

renderTemplate(tripEventsElement, createTripSort(), RenderPosition.BEFOREEND);

renderTemplate(tripEventsElement, '<ul class="trip-events__list"></ul>', RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

const tripEventsItemAddElement = createElement('li', 'trip-events__item');

renderTemplate(tripEventsItemAddElement, createEventAdd(), RenderPosition.AFTERBEGIN);

renderTemplate(tripEventsListElement, tripEventsItemAddElement.outerHTML, RenderPosition.BEFOREEND);

const tripEventsItemEditElement = createElement('li', 'trip-events__item');

renderTemplate(tripEventsItemEditElement, createEventEdit(), RenderPosition.AFTERBEGIN);

renderTemplate(tripEventsListElement, tripEventsItemEditElement.outerHTML, RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  const tripEventsItemElement = createElement('li', 'trip-events__item');

  renderTemplate(tripEventsItemElement, createEvent(), RenderPosition.AFTERBEGIN);

  renderTemplate(tripEventsListElement, tripEventsItemElement.outerHTML, RenderPosition.BEFOREEND);
}
