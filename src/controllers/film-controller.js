import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import { render, replace, isEscPressed } from '../utils';
import { RenderPosition, FILM_CARD_ELEMENTS } from '../consts';

export default class FilmController {
    constructor(container, onDataChange, onViewChange) {
        this._container = container;
        this._onDataChange = onDataChange;
        this._filmCardComponent = null;
        this._filmDetailsComponent = null;
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
                film,
                Object.assign({}, film, controlType)
            )
        }

        const oldFilmCardComponent = this._filmCardComponent;
        this._filmCardComponent = new FilmCardComponent(film);        
        this._filmDetailsComponent = new FilmDetailsComponent(film);
                
        this._filmCardComponent.setButtonWatchListClickHandler((evt) => setOnDataChange(evt, { isWatchlist: !film.isWatchlist }));
        this._filmCardComponent.setButtonWatchedClickHandler((evt) => setOnDataChange(evt, { isWatched: !film.isWatched }));
        this._filmCardComponent.setButtonFavoriteClickHandler((evt) => setOnDataChange(evt, { isFavorite: !film.isFavorite }));

        this._filmDetailsComponent.setButtonWatchListClickHandler((evt) => setOnDataChange(evt, { isWatchlist: !film.isWatchlist }));
        this._filmDetailsComponent.setButtonWatchedClickHandler((evt) => setOnDataChange(evt, { isWatched: !film.isWatched }));
        this._filmDetailsComponent.setButtonFavoriteClickHandler((evt) => setOnDataChange(evt, { isFavorite: !film.isFavorite }));

        this._filmCardComponent.setCardClickHandler((evt) => this._onFilmCardClick(evt));
        this._filmDetailsComponent.setButtonCloseClickHandler(() => this._onCloseButtonClick());

        if (oldFilmCardComponent) {
            replace(this._filmCardComponent, oldFilmCardComponent); 

            return;
        }

        render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    _onFilmCardClick(evt) {
        
        const onFilmDetailEsc = () => {
            document.removeEventListener(`keydown`, onEscapeKeyDown);
            this._filmDetailsComponent.getElement().remove();
        };

        const onEscapeKeyDown = () => isEscPressed && onFilmDetailEsc();

        if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {
            console.log(`old `, this._oldFilmDetailComponent);

            if(this._oldFilmDetailComponent) {
                // debugger;
                replace(this._filmDetailsComponent, this._oldFilmDetailComponent); 
                console.log(`Old `, this._oldFilmDetailComponent);
                console.log(`New `, this._filmDetailsComponent);
            } else {
                this._oldFilmDetailComponent = this._filmDetailsComponent;
                console.log(`old `, this._oldFilmDetailComponent);
                render(this._siteMain, this._filmDetailsComponent, RenderPosition.BEFOREEND);                
            }


            document.addEventListener(`keydown`, onEscapeKeyDown);
        }
    };

    _onCloseButtonClick() {        
        this._filmDetailsComponent.getElement().remove();
        this._filmDetailsComponent.removeElement();
    };
}
