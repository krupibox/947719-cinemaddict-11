import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import { render, isEscPressed } from '../utils';
import { RenderPosition, FILM_CARD_ELEMENTS } from '../consts';

export default class FilmController {
    constructor(container) {
        this._container = container;
    }

    render(film) {
        const filmCardComponent = new FilmCardComponent(film);
        const filmDetailComponent = new FilmDetailsComponent(film);

        const onCloseButtonClick = () => {
            filmDetailComponent.getElement().remove();
            filmDetailComponent.removeElement();
        };

        filmCardComponent.setClickHandler((evt) => this._onFilmCardClick(evt, filmDetailComponent));
        filmDetailComponent.setClickHandler(onCloseButtonClick);

        render(this._container, filmCardComponent, RenderPosition.BEFOREEND);
    }

    _onFilmCardClick(evt, componentDetailFilm) {

        const onFilmDetailEsc = () => {
            document.removeEventListener(`keydown`, onEscapeKeyDown);
            componentDetailFilm.getElement().remove();
        };

        const onEscapeKeyDown = () => isEscPressed && onFilmDetailEsc();

        if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {

            const siteMain = document.body.querySelector(`.main`);
            const oldFilmCard = siteMain.querySelector(`.film-details`);

            if (oldFilmCard) {
                siteMain.replaceChild(componentDetailFilm.getElement(), oldFilmCard);
            }

            render(siteMain, componentDetailFilm, RenderPosition.BEFOREEND);
            document.addEventListener(`keydown`, onEscapeKeyDown);
        }
    };
}
