import AbstractView from './abstract-view.js';

const createPointListItemTemplate = () => '<li class="trip-events__item"></li>';

export default class PointListItemView extends AbstractView {
  get template() {
    return createPointListItemTemplate();
  }
}
