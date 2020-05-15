export const createScoreTemplate = (ratingNumber, numberChecked) => {
  return [...Array(ratingNumber)].map((_, index) => {
    const isChecked = numberChecked === index + 1 ? `checked` : ``;

    return (
      `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index + 1}" id="rating-${index + 1}" ${isChecked}>
        <label class="film-details__user-rating-label" for="rating-${index + 1}">${index + 1}</label>`
    );
  }).join(``);
};
