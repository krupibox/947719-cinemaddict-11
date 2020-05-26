import {SortType} from '../../consts';

export const createSortTemplate = () => {
  return (
    `<ul class="sort">
        <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button sort__button--by-date">Sort by date</a></li>
        <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button sort__button--by-rating">Sort by rating</a></li>
    </ul>`
  );
};
