import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import { render, isEscPressed } from '../utils';
import { RenderPosition, FILM_CARD_ELEMENTS } from '../consts';

export default class FilmController {
    constructor(container, onDataChange) {
        this._container = container;
        this._onDataChange = onDataChange;
    }

    render(film) {
        this._film = film;
        const filmCardComponent = new FilmCardComponent(film);
        this._filmCardComponent = filmCardComponent;
        const filmDetailComponent = new FilmDetailsComponent(film);

        filmCardComponent.setButtonWatchListClickHandler((evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            // тут мы отправляем изменненные данные обратно в pageController
            // this - передать текущий контроллер
            this._onDataChange(
                this,
                this._film,
                Object.assign({}, this._film, { isWatchlistAdded: !this._film.isWatchlistAdded })
            )
        });

        // filmCardComponent.setButtonWatchedClickHandler(this._onDataChange);
        // filmCardComponent.setButtonFavoriteClickHandler(this._onDataChange);
        filmCardComponent.setCardClickHandler((evt) => this._onFilmCardClick(evt, filmDetailComponent));

        filmDetailComponent.setButtonCloseClickHandler(() => this._onCloseButtonClick(filmDetailComponent));

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
                console.log(componentDetailFilm);

            }

            render(siteMain, componentDetailFilm, RenderPosition.BEFOREEND);
            document.addEventListener(`keydown`, onEscapeKeyDown);
        }
    };

    _onCloseButtonClick(componentDetailFilm) {
        componentDetailFilm.getElement().remove();
        componentDetailFilm.removeElement();
    };
}
