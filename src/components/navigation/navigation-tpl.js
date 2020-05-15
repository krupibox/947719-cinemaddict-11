const createNavigationItems = (navItems) => {
  return navItems
    .map(({ name, count, checked }) => {
      const isAll = (name === `All movies`) ? `visually-hidden` : ``;
      const isStats = (name === `Stats`) ? `main-navigation__item--additional` : ``;
      const isCountExist = count > 0;

      return (
        `<a href="#${name}"
            class="main-navigation__item ${checked ? `main-navigation__item--active` : ``} ${isStats}"
            data-filter-type="${name}">
            ${name}
            ${isCountExist ? `<span class="main-navigation__item-count ${isAll}">${count}</span>` : ``}
        </a>`
      );
    });
};

export const createNavigationTemplate = (navItems) => {
  const navItemsMarkUp = createNavigationItems(navItems).join(`\n`);

  return (
    `<nav class="main-navigation">
        ${navItemsMarkUp}
    </nav>`
  );
};
