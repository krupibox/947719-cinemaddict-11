import {createFilmsSectionTemplate} from './films-section-tpl';
import AbstractComponent from '../abstract';

export default class FilmSectionComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilmsSectionTemplate();
  }

  getFilmsContainerElement() {
    return this.getElement().querySelector(`.films`);
  }

  getFilmsListElement() {
    return this.getElement().querySelector(`.films-list`);
  }

  getFilmsListContainerElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  getFilmsListContainerTopRatedElement() {
    return this.getElement().querySelector(`.films .films-list--extra .films-list__container`);
  }

  getFilmsListContainerMostCommentedElement() {
    return this.getElement().querySelector(`.films .films-list--extra:last-of-type .films-list__container`);
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }
}
