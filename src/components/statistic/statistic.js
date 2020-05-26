import AbstractSmartComponent from '../abstract-smart-component';
import {getStatisticTemplate} from './statistic-tpl';
import {StatisticFilter} from '../../consts';
import {generateChart} from './chart';
import {getProfileStatus} from '../../utils/get-profile-status';
import {getWatchedFilms} from '../../utils/statistic';

const FILTER_ID_PREFIX = `statistic-`;

export default class Statistic extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
    this._statisticPeriod = StatisticFilter.ALL_TIME;

    this._userRating = getProfileStatus(this._films);
    this._watchedFilms = getWatchedFilms(this._films, this._statisticPeriod);

    this._chart = null;

    this._setOnFilterChangeClick();
    this._renderChart();
  }

  getTemplate() {
    return getStatisticTemplate(this._watchedFilms, this._userRating);
  }

  rerender() {
    this.getElement().querySelector(`#statistic-${this._statisticPeriod}`).checked = true;
    this._renderChart();
  }

  recoveryListeners() {
    this._setOnFilterChangeClick();
  }

  _setOnFilterChangeClick() {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`click`, (evt) => {
        if (!evt.target.classList.contains(`statistic__filters-label`)) {
          return;
        }

        this._statisticPeriod = evt.target.htmlFor.substring(FILTER_ID_PREFIX.length);
        this.rerender();
      });
  }

  _renderChart() {
    const canvasChart = this.getElement().querySelector(`.statistic__chart`);
    this._resetChart();

    if (this._films.length <= 0) {
      return;
    }

    this._chart = generateChart(canvasChart, this._statisticPeriod, this._films);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  hide() {
    super.hide();
  }
}

