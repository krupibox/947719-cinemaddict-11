import { createFilmsStatistics } from './film-statistics-tpl';
import AbstractComponent from '../abstract';

export default class FilmsStatisticsComponent extends AbstractComponent {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createFilmsStatistics(this._profile);
  }
}
