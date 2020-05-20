import NavigationComponent from '../components/navigation/navigation';
import {render, replace} from '../utils/render';
import {getFilmsByFilter} from '../utils/get-films-by-filter';
import {RenderPosition, FilterTypes} from '../consts';

export default class FilterController {
  constructor(mainContainer, filmSectionContainer, filmsModel, statisticComponent) {

    this._mainContainer = mainContainer;
    this._filmSectionContainer = filmSectionContainer;
    this._statisticComponent = statisticComponent;

    this._filmsModel = filmsModel;
    this._activeFilterType = FilterTypes.ALL;
    this._navigationComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onStatsShowClick = this._onStatsShowClick.bind(this);

    this._filmsModel.setOnFilterChange(this._onDataChange);
  }

  render() {
    const filters = Object.values(FilterTypes).map((filter) => {
      return {
        name: filter,
        count: getFilmsByFilter(this._filmsModel.getFilmsAll(), filter).length,
        checked: filter === this._activeFilterType,
      };
    });

    const oldNavComponent = this._navigationComponent;

    this._navigationComponent = new NavigationComponent(filters);
    this._navigationComponent.setOnFilterChange(this._onFilterChange);

    if (oldNavComponent) {
      replace(this._navigationComponent, oldNavComponent);
    } else {
      render(this._mainContainer, this._navigationComponent, RenderPosition.AFTERBEGIN);
    }
  }

  setOnFilterChange(handler) {
    this._onFilterChangeClick = handler;
  }

  _onFilterChange(filterType) {
    if (filterType === FilterTypes.STATS) {
      this._activeFilterType = filterType;
      this.render();
      this._onStatsShowClick();
      return;
    }

    this._filmSectionContainer.show();
    this._statisticComponent.hide();

    this._activeFilterType = filterType;
    this._filmsModel.setFilterType(filterType);
  }

  _onStatsShowClick() {
    this._filmSectionContainer.hide();
    this._statisticComponent.show();
  }

  _onDataChange() {
    this.render();
  }
}
