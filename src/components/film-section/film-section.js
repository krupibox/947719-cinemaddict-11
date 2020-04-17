import { createFilmsSectionTemplate } from './film-section-tpl';
import AbstractComponent from '../abstract';

export default class FilmCardComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsSectionTemplate();
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
}