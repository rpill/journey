import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripTabsTemplate} from './view/trip-tabs.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createPointAddTemplate} from './view/point-add.js';
import {createPointEditTemplate} from './view/point-edit.js';
import {createPointTemplate} from './view/point.js';
import {renderTemplate, RenderPosition} from './render.js';

import {generatePoint} from './mock/point.js';

const POINT_COUNT = 20;

const points = Array.from({length: POINT_COUNT}, generatePoint);

const createElement = (tag, className = '') => {
  const element = document.createElement(tag);
  element.className = className;

  return element;
};

const sitePageBodyElement = document.querySelector('.page-body');
const tripMainElement = sitePageBodyElement.querySelector('.trip-main');

renderTemplate(tripMainElement, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector('.trip-controls');
const tripNavigationElement = tripControlsElement.querySelector('.trip-controls__navigation');

renderTemplate(tripNavigationElement, createTripTabsTemplate(), RenderPosition.BEFOREEND);

const tripFiltersElement = tripControlsElement.querySelector('.trip-controls__filters');

renderTemplate(tripFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);

const sitePageMainElement = sitePageBodyElement.querySelector('.page-main');
const tripEventsElement = sitePageMainElement.querySelector('.trip-events');

renderTemplate(tripEventsElement, createTripSortTemplate(), RenderPosition.BEFOREEND);

renderTemplate(tripEventsElement, '<ul class="trip-events__list"></ul>', RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

const tripEventsItemAddElement = createElement('li', 'trip-events__item');

renderTemplate(tripEventsItemAddElement, createPointAddTemplate(), RenderPosition.AFTERBEGIN);

renderTemplate(tripEventsListElement, tripEventsItemAddElement.outerHTML, RenderPosition.BEFOREEND);

const tripEventsItemEditElement = createElement('li', 'trip-events__item');

renderTemplate(tripEventsItemEditElement, createPointEditTemplate(points[0]), RenderPosition.AFTERBEGIN);

renderTemplate(tripEventsListElement, tripEventsItemEditElement.outerHTML, RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
  const tripEventsItemElement = createElement('li', 'trip-events__item');

  renderTemplate(tripEventsItemElement, createPointTemplate(points[i]), RenderPosition.AFTERBEGIN);

  renderTemplate(tripEventsListElement, tripEventsItemElement.outerHTML, RenderPosition.BEFOREEND);
}
