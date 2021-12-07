import {createElement} from '../render.js';

const createPointListItemTemplate = () => '<li class="trip-events__item"></li>';

export default class PointListItemView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPointListItemTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
