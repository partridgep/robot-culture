import React, { Component } from 'react';
import styles from './AddMedia.module.css';

import OmdbApiOption from '../OmdbApiOption/OmdbApiOption';
import GoogleBooksApiOption from '../GoogleBooksApiOption/GoogleBooksApiOption';
import ActorOption from '../ActorOption/ActorOption';
import { getMovieMatches, getTvShowMatches, getGameMatches } from '../../services/omdb-api';
import { getBookMatches } from '../../services/googleBooks-api';
import { getActorMatches } from '../../services/unofficial-IMDb-api';

const baseURL = 'www.imdb.com/';

export class AddMedia extends Component {

    state = {
        activeOption: 0,
        showOptions: false,
        userInput: '',
        options: [],
        message: ''
    };
    /*----      HELPER FUNCTIONS        ----*/

    disableForm() {
        if (this.props.movies && !this.props.movies.length) return true;
        else if (this.props.books && !this.props.books.length) return true;
        else if (this.props.tvShows && !this.props.tvShows.length) return true;
        else if (this.props.games && !this.props.games.length) return true;
        else if (this.props.actors && !this.props.actors.length) return true;
    }

    getMessage() {
        if (this.props.movies) return `What movies has ${this.props.name} been in?`;
        else if (this.props.books) return `What books has ${this.props.name} been featured in?`;
        else if (this.props.tvShows) return `Has ${this.props.name} appeared in any TV shows?`;
        else if (this.props.games) return `Any games that ${this.props.name} has been a part of?`;
        else if (this.props.actors) return `Who's portrayed ${this.props.name}?`;
    }

    insertPlaceholder() {
        if (this.props.movies) return 'Movies';
        if (this.props.books) return 'Books';
        if (this.props.tvShows) return 'TV Shows';
        if (this.props.games) return 'Games';
        if (this.props.actors) return 'Actors';
    }

    getMediaType() {
        if (this.props.movies) return 'movies';
        if (this.props.books) return 'books';
        if (this.props.tvShows) return 'tvShows';
        if (this.props.games) return 'games';
        if (this.props.actors) return 'actors';
    }

    // function to grab possible movie matches from our movie API
    async getMovieOptions() {
        let movies = [];
        // only start a search if user has entered at least 3 characters
         if (this.state.userInput.length > 2) {
             // grab data from API
             movies = await getMovieMatches(this.state.userInput);
             // if results obtained successfully
             if (movies.Search) {
                // max 5 results
                if (movies.Search.length > 4) movies.Search.length = 4;
                // set to state
                this.setState({options: movies.Search});
             }
         }
    }

    async getBookOptions() {
        let books = [];
        if (this.state.userInput.length > 2) {
            books = await getBookMatches(this.state.userInput);
            if (books.items) {
                if (books.items.length > 4) books.items.length = 4;
                this.setState({options: books.items});
            }
        }
    }

    // function to grab possible TV show matches from our movie API
    async getTvShowOptions() {
        let tvShows = [];
        // only start a search if user has entered at least 3 characters
         if (this.state.userInput.length > 2) {
             // grab data from API
             tvShows = await getTvShowMatches(this.state.userInput);
             // if results obtained successfully
             if (tvShows.Search) {
                // max 5 results
                if (tvShows.Search.length > 4) tvShows.Search.length = 4;
                // set to state
                this.setState({options: tvShows.Search});
             }
         }
    }

    // function to grab possible actor matches from our movie API
    async getActorOptions() {
        let actors = [];
        // only start a search if user has entered at least 3 characters
         if (this.state.userInput.length > 2) {
             // grab data from API
             actors = await getActorMatches(this.state.userInput);
             if (actors.names) {
                 if (actors.names.length > 3) actors.names.length = 3;
                 this.setState({options: actors.names});
             }
         }
    }

    // function to grab possible movie matches from our movie API
    async getGamesOptions() {
        let games = [];
        // only start a search if user has entered at least 3 characters
         if (this.state.userInput.length > 2) {
             // grab data from API
             games = await getGameMatches(this.state.userInput);
             // if results obtained successfully
             if (games.Search) {
                // max 5 results
                if (games.Search.length > 5) games.Search.length = 5;
                // set to state
                this.setState({options: games.Search})
             }
         }
    }

    getMediaObject = (id) => {
        let newMedia;
        for (var media of this.state.options) {
            if (media.imdbID === id) {
                newMedia = this.copyMediaDetails(media);
            }
        }
        return newMedia;
    }

    getBookObject = (id) => {
        let newBook;
        for (var book of this.state.options) {
            if (book.id === id) {
                newBook = this.copyBookDetails(book);
            }
        }
        return newBook;
    }

    getActorObject = (id) => {
        let newActor;
        for (var actor of this.state.options) {
            if (actor.id === id) {
                newActor = this.copyActorDetails(actor);
            }
        }
        return newActor;
    }

    pushNewMediaToState(newMedia) {
        //first, prevent from adding duplicates
        if (this.props.movies) {
            for (var otherMovie of this.props.movies) {
                if (newMedia.link === otherMovie.link) return;
            }
        } else if (this.props.books) {
            for (var otherBook of this.props.books) {
                if (newMedia.link === otherBook.link) return;
            }
        } else if (this.props.tvShows) {
            for (var otherTvShow of this.props.tvShows) {
                if (newMedia.link === otherTvShow.link) return;
            }
        } else if (this.props.games) {
            for (var otherGame of this.props.games) {
                if (newMedia.link === otherGame.link) return;
            }
        } else if (this.props.actors) {
            for (var otherActor of this.props.actors) {
                if (newMedia.link === otherActor.link) return;
            }
        }
         // copy movies array from state
         let media = this.copyMediaArray();
         // add selected movie
         media.push(newMedia);
         // save media array to state
         this.props.handleClickOption(media, this.getMediaType());
    }

    copyMediaDetails(mediaFromAPI) {
        let newMedia = {};
        newMedia.title = mediaFromAPI.Title;
        newMedia.releaseYear = mediaFromAPI.Year;
        newMedia.link = baseURL + "title/" + mediaFromAPI.imdbID;
        return newMedia;
    }

    copyBookDetails(bookFromAPI) {
        let newBook = {};
        newBook.title = bookFromAPI.volumeInfo.title;
        newBook.releaseYear = bookFromAPI.volumeInfo.publishedDate.slice(0,4);
        newBook.link = bookFromAPI.volumeInfo.infoLink;
        return newBook;
    }

    copyActorDetails(actorFromAPI) {
        let newActor = {};
        newActor.name = actorFromAPI.title;
        newActor.link = baseURL + "name/" + actorFromAPI.id;
        return newActor;
    }

    copyMediaArray() {
        let media;
        if (this.props.movies) media = [...this.props.movies];
        if (this.props.books) media = [...this.props.books];
        if (this.props.tvShows) media = [...this.props.tvShows];
        if (this.props.games) media = [...this.props.games];
        if (this.props.actors) media = [...this.props.actors];
        return media;
    }

    /*----      EVENT HANDLERS        ----*/

    // function to handle change and consider options
    handleChangeWithOptions = async (e) => {
        await this.setState({
            activeOption: 0,
            showOptions: true,
            userInput: e.currentTarget.value
        });
        // get our possible movie matches from our API
        if (this.props.movies) this.getMovieOptions();
        if (this.props.books) this.getBookOptions();
        if (this.props.tvShows) this.getTvShowOptions();
        if (this.props.games) this.getGamesOptions();
        if (this.props.actors) this.getActorOptions();
    };

    // turns suggestions off and puts text from clicked element into input field
    onClick = (e) => {
        // get imdb ID of media clicked on
        let mediaID;
        // if clicking on area outside of li
        if (e.target.getAttribute('name') === 'media') mediaID = e.target.id;
        // if clicking directly on li
        else {mediaID = e.target.parentElement.id;}
        // get corresponding media object in options array
        let chosenOption;
        if (this.props.books) chosenOption = this.getBookObject(mediaID);
        if (this.props.actors) chosenOption = this.getActorObject(mediaID);
        else chosenOption = this.getMediaObject(mediaID);
        // remove options and user input
        this.setState({
            activeOption: 0,
            options: [],
            showOptions: false,
            userInput: ''
        });
        this.pushNewMediaToState(chosenOption);
    };


    onKeyDown = (e) => {
        const { activeOption, options } = this.state;
        // if user hits Enter
        if (e.keyCode === 13) {
            // if user has selected movie and is no longer typing
            // submit form and exit
            if (!this.state.userInput) {
                this.props.handleSubmit();
                return;
            }
            // get selected media object
            let media = options[activeOption];
            // copy relevant details
            if (this.props.books) media = this.copyBookDetails(media);
            else if (this.props.actors) media = this.copyActorDetails(media);
            else media = this.copyMediaDetails(media);
            // set option to state
            this.pushNewMediaToState(media);
            // turn suggestions off
            this.setState({
                activeOption: 0,
                options: [],
                showOptions: false,
                userInput: ''
            });
        // if user hits the Up key
        } else if (e.keyCode === 38) {
            // prevent user from going past first option
            if (activeOption === 0) return;
            // get previous option
            this.setState({ activeOption: activeOption - 1 });
        // if user hits the Down Key
        } else if (e.keyCode === 40) {
            // prevent user from going past last option
            if (activeOption === options.length - 1) return;
            // get next option
            this.setState({ activeOption: activeOption + 1 });
        }
    };

    handleRemoval = (e) => {
        // get title of option user wants to remove
        const title = e.target.parentElement.textContent.split('(')[0].slice(0, -1);
        // get release year
        const releaseYear = e.target.parentElement.textContent.match(/\(([^)]+)\)/)[1];
        // make copy of media array
        let media = this.copyMediaArray();
        // find media with same title AND year and remove it
        for (let i=0; i<media.length; i++) {
            if (media[i].title === title && media[i].releaseYear === releaseYear) {
                media.splice(i, 1);
                break;
            }
        }
        // save media array to state
        this.props.handleClickOption(media, this.getMediaType());
    }

    handleActorRemoval = (e) => {
        // get name of option user wants to remove
        const name = e.target.parentElement.textContent.slice(0, -2);
        // make copy of actors array
        let actors = this.copyMediaArray();
        // find actor with same name and remove them
        for (let i=0; i<actors.length; i++) {
            if (actors[i].name === name) {
                actors.splice(i, 1);
                break;
            }
        }
        // save actors array to state
        this.props.handleClickOption(actors, this.getMediaType());
    }

    render() {

        const {
            handleChangeWithOptions,
            onClick,
            onKeyDown,
            handleRemoval,
            handleActorRemoval,
            state: { activeOption, options, showOptions, userInput }
        } = this;

        let optionList;
        if (showOptions && userInput) {
            if (options.length) {
                optionList = (
                    <ul className={styles.options}>
                        {options.map((option, index) => {
                            let className;
                            if (index === activeOption) {
                                className = styles.activeOption;
                            }
                            if (this.props.books) {
                                return (<GoogleBooksApiOption key={index} option={option} className={className} onClick={onClick}/>);
                            }
                            else if (this.props.actors) {
                                return (<ActorOption key={index} option={option} className={className} onClick={onClick}/>)
                            }
                            else {
                                return (<OmdbApiOption key={index} option={option} className={className} onClick={onClick}/>);
                            }
                        })}
                    </ul>
                );
            }
        }

        let chosenOptionsList;
        if ((this.props.movies && this.props.movies.length) || (this.props.books && this.props.books.length) || (this.props.tvShows && this.props.tvShows.length) || (this.props.games && this.props.games.length) || (this.props.actors && this.props.actors.length))  {
            chosenOptionsList = (
                <ul className={styles.chosenOptions}>
                    {this.props.movies && this.props.movies.map((movie, index) => {
                        return (
                            <li key={index}>{movie.title} ({movie.releaseYear}) <button onClick={handleRemoval}>X</button></li>
                        )
                    })}
                    {this.props.books && this.props.books.map((book, index) => {
                        return (
                            <li key={index}>{book.title} ({book.releaseYear}) <button onClick={handleRemoval}>X</button></li>
                        )
                    })}
                    {this.props.tvShows && this.props.tvShows.map((tvShow, index) => {
                        return (
                            <li key={index}>{tvShow.title} ({tvShow.releaseYear}) <button onClick={handleRemoval}>X</button></li>
                        )
                    })}
                    {this.props.games && this.props.games.map((game, index) => {
                        return (
                            <li key={index}>{game.title} ({game.releaseYear}) <button onClick={handleRemoval}>X</button></li>
                        )
                    })}
                    {this.props.actors && this.props.actors.map((actor, index) => {
                        return (
                            <li key={index}>{actor.name} <button onClick={handleActorRemoval}>X</button></li>
                        )
                    })}
                        </ul>
            )
        }

        return (
            <div className={styles.addMedia}>
                <p className={styles.message}>{this.getMessage()}</p>
                    <div className={styles.field}>
                        {chosenOptionsList}
                        <input
                            type="text"
                            placeholder={this.insertPlaceholder()}
                            value={this.state.userInput}
                            autoComplete="off"
                            onChange={handleChangeWithOptions}
                            onKeyDown={onKeyDown}
                        />
                        {optionList}
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.skip} onClick={this.props.handleSkip}>Skip</button>
                        <button onClick={this.props.handleSubmit} disabled={this.disableForm()}>Next</button>&nbsp;&nbsp;
                </div>
            </div>

        )
    }
}


    export default AddMedia;