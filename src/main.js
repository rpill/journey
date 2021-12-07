import TripInfoView from './view/trip-info-view.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripSortView from './view/trip-sort-view.js';
import PointListView from './view/point-list-view.js';
import PointListItemView from './view/point-list-item-view.js';
import PointAddView from './view/point-add-view.js';
import PointEditView from './view/point-edit-view.js';
import PointView from './view/point-view.js';
import NoPointView from './view/no-point-view.js';
import {render, RenderPosition, replace, remove} from './utils/render.js';
import {generatePoint} from './mock/point.js';

const POINT_COUNT = 20;

const points = Array.from({length: POINT_COUNT}, generatePoint);

const sitePageBodyElement = document.querySelector('.page-body');
const tripMainElement = sitePageBodyElement.querySelector('.trip-main');

render(tripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector('.trip-controls');
const tripNavigationElement = tripControlsElement.querySelector('.trip-controls__navigation');

render(tripNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);

const tripFiltersElement = tripControlsElement.querySelector('.trip-controls__filters');

render(tripFiltersElement, new TripFiltersView(), RenderPosition.BEFOREEND);

const sitePageMainElement = sitePageBodyElement.querySelector('.page-main');
const tripEventsElement = sitePageMainElement.querySelector('.trip-events');

const renderPoint = (pointListElement, point) => {
  const pointListItemComponent = new PointListItemView();
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replaceCardToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormCloseHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListItemComponent, pointComponent, RenderPosition.AFTERBEGIN);

  render(pointListElement, pointListItemComponent, RenderPosition.BEFOREEND);
};

const renderPointList = (pointListContainer, pointsList) => {

  if (pointsList.length === 0) {
    render(pointListContainer, new NoPointView(), RenderPosition.AFTERBEGIN);
    return;
  }
  const pointListComponent = new PointListView();

  render(pointListContainer, new TripSortView(), RenderPosition.BEFOREEND);
  render(pointListContainer, pointListComponent, RenderPosition.BEFOREEND);

  pointsList.forEach((point) => renderPoint(pointListComponent, point));
};

renderPointList(tripEventsElement, points);
