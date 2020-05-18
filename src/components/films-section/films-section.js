import {createFilmsSectionTemplate} from './films-section-tpl';
import AbstractComponent from '../abstract';
import { DisplayMode } from '../../consts';

export default class FilmSectionComponent extends AbstractComponent {
  constructor() {
    super();

    this._displayMode = DisplayMode.SHOW;
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
    this.getElement().classList.add(`visually-hidden`);
    this._displayMode = DisplayMode.HIDDEN;
  }
  
  show() {
    this.getElement().classList.remove(`visually-hidden`);
    this._displayMode = DisplayMode.SHOW;
  }
}
