import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import { render, isEscPressed } from '../utils';
import { RenderPosition, FILM_CARD_ELEMENTS } from '../consts';

export default class FilmController {
    constructor(container, onDataChange, onViewChange) {
        this._container = container;
        this._onDataChange = onDataChange;
        this._filmCardComponent = null;
        this._filmDetailComponent = null;
        this._oldFilmDetailComponent = null;
        this._siteMain = document.body.querySelector(`.main`);
        this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    }

    setDefaultView() {
        // для скрытия попапа с подробной информацией о фильме.
    }

    render(film) {
        const setOnDataChange = (evt, controlType) => {
            evt.preventDefault();
            evt.stopPropagation();

            this._onDataChange(
                this,
                this._film,
                Object.assign({}, this._film, controlType)
            )
        }

        this._film = film;

        const oldFilmCardComponent = this._filmCardComponent;
        this._filmCardComponent = new FilmCardComponent(this._film);
        this._oldFilmDetailComponent = this._filmDetailComponent;
        this._filmDetailComponent = new FilmDetailsComponent(this._film);

        this._filmCardComponent.setButtonWatchListClickHandler((evt) => setOnDataChange(evt, { isWatchlist: !this._film.isWatchlist }));
        this._filmCardComponent.setButtonWatchedClickHandler((evt) => setOnDataChange(evt, { isWatched: !this._film.isWatched }));
        this._filmCardComponent.setButtonFavoriteClickHandler((evt) => setOnDataChange(evt, { isFavorite: !this._film.isFavorite }));

        this._filmDetailComponent.setButtonWatchListClickHandler((evt) => setOnDataChange(evt, { isWatchlist: !this._film.isWatchlist }));
        this._filmDetailComponent.setButtonWatchedClickHandler((evt) => setOnDataChange(evt, { isWatched: !this._film.isWatched }));
        this._filmDetailComponent.setButtonFavoriteClickHandler((evt) => setOnDataChange(evt, { isFavorite: !this._film.isFavorite }));

        this._filmCardComponent.setCardClickHandler((evt) => this._onFilmCardClick(evt, this._filmDetailComponent));
        this._filmDetailComponent.setButtonCloseClickHandler(() => this._onCloseButtonClick(this._filmDetailComponent));

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
                        
                if (this._oldFilmDetailComponent) {                
                    this._oldFilmDetailComponent.getElement().parentElement.replaceChild(componentDetailFilm.getElement(), this._oldFilmDetailComponent);
                    
                    render(this._siteMain, componentDetailFilm, RenderPosition.BEFOREEND);   
                    return;
                }
                        
            render(this._siteMain, componentDetailFilm, RenderPosition.BEFOREEND);
            document.addEventListener(`keydown`, onEscapeKeyDown);
        }
    };

    _onCloseButtonClick(componentDetailFilm) { 
        console.log(componentDetailFilm)       
        componentDetailFilm.getElement().remove();
        componentDetailFilm.removeElement();
    };
}
