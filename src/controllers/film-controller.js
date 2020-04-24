import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import { render, isEscPressed } from '../utils';
import { RenderPosition, FILM_CARD_ELEMENTS } from '../consts';

export default class FilmController {
    constructor(container, onDataChange, onViewChange) {
        this._container = container;
        this._onDataChange = onDataChange;
        this._filmCardComponent = null;
    }

    setDefaultView() {
        // для скрытия попапа с подробной информацией о фильме.
    }

    render(film) {
        this._film = film;

        const oldFilmCardComponent = this._filmCardComponent;
        this._filmCardComponent = new FilmCardComponent(film);
        const filmDetailComponent = new FilmDetailsComponent(film);

        this._filmCardComponent.setButtonWatchListClickHandler((evt) => {
            evt.preventDefault();
            evt.stopPropagation();

            this._onDataChange(
                this,
                this._film,
                Object.assign({}, this._film, { isWatchlistAdded: !this._film.isWatchlistAdded })
            )
        });

        this._filmCardComponent.setButtonWatchedClickHandler((evt) => {
            evt.preventDefault();
            evt.stopPropagation();

            this._onDataChange(
                this,
                this._film,
                Object.assign({}, this._film, { isWatched: !this._film.isWatched})
            )
        });

        this._filmCardComponent.setButtonFavoriteClickHandler((evt) => {
            evt.preventDefault();
            evt.stopPropagation();

            this._onDataChange(
                this,
                this._film,
                Object.assign({}, this._film, { isFavorite: !this._film.isFavorite})
            )
        });
 
        this._filmCardComponent.setCardClickHandler((evt) => this._onFilmCardClick(evt, filmDetailComponent));
        filmDetailComponent.setButtonCloseClickHandler(() => this._onCloseButtonClick(filmDetailComponent));

        if (oldFilmCardComponent) {
            oldFilmCardComponent.getElement().parentElement
                .replaceChild(this._filmCardComponent.getElement(), oldFilmCardComponent.getElement());
            return;
        }

        render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    _onFilmCardClick(evt, componentDetailFilm) {

        const onFilmDetailEsc = () => {
            document.removeEventListener(`keydown`, onEscapeKeyDown);
            componentDetailFilm.getElement().remove();
        };

        const onEscapeKeyDown = () => isEscPressed && onFilmDetailEsc();

        if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {
            const siteMain = document.body.querySelector(`.main`);
            const oldFilmDetailCard = siteMain.querySelector(`.film-details`);

            if (oldFilmDetailCard) {
                siteMain.replaceChild(componentDetailFilm.getElement(), oldFilmDetailCard);
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
