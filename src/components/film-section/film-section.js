import { createFilmsSectionTemplate } from './film-section-tpl';
import AbstractComponent from '../abstract';

export default class FilmCardComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}
