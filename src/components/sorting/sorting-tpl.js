export const createSortingTemplate = () => {
  return (
    `<ul class="sort">
          <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" class="sort__button sort__button--by-date">Sort by date</a></li>
          <li><a href="#" class="sort__button sort__button--by-rating">Sort by rating</a></li>
      </ul>`
  );
};
