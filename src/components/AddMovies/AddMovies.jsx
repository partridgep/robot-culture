import React, { Component } from 'react';
import styles from './AddMovies.module.css';

import { getMovieMatches } from '../../services/omdb-api';

const baseURL = 'www.imdb.com/title/';

export class AddMovies extends Component {

    state = {
        activeOption: 0,
        showOptions: false,
        userInput: '',
        options: []
    };

    /*----      HELPER FUNCTIONS        ----*/

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
                if (movies.Search.length > 5) movies.Search.length = 5;
                // set to state
                this.setState({options: movies.Search})
             }
         }
    }

    getMovieObject = (id) => {
        let newMovie;
        for (var movie of this.state.options) {
            if (movie.imdbID === id) {
                newMovie = this.copyMovieDetails(movie);
            }
        }
        return newMovie;
    }

    pushMovieToState(movie) {
        //first, prevent from adding duplicates
        for (var otherMovie of this.props.movies) {
            if (movie.link === otherMovie.link) return;
        }
         // copy movies array from state
         let movies = [...this.props.movies];
         // add selected movie
         movies.push(movie);
         // save movies array to state
         this.props.handleClickOption(movies, 'movies');
    }

    copyMovieDetails(movieFromAPI) {
        let newMovie = {};
        newMovie.title = movieFromAPI.Title;
        newMovie.releaseYear = movieFromAPI.Year;
        newMovie.link = baseURL + movieFromAPI.imdbID;
        return newMovie;
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
        this.getMovieOptions();
    };

    // turns suggestions off and puts text from clicked element into input field
    onClick = (e) => {
        // get imdb ID of movie clicked on
        let imdbID;
        // if clicking on area outside of li
        if (e.target.getAttribute('name') === 'movies') imdbID = e.target.id;
        // if clicking directly on li
        else {imdbID = e.target.parentElement.id;}
        // get corresponding movie object in options array
        let chosenMovie = this.getMovieObject(imdbID);
        // remove options and user input
        this.setState({
            activeOption: 0,
            filteredOption: [],
            showOptions: false,
            userInput: ''
        });
        this.pushMovieToState(chosenMovie);
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
            // get selected movie objects
            let movie = options[activeOption];
            // copy relevant details
            movie = this.copyMovieDetails(movie);
            // set option to state
            this.pushMovieToState(movie);
            // turn suggestions off
            this.setState({
                activeOption: 0,
                showSuggestions: false,
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
        // get title of movie user wants to remove
        const title = e.target.parentElement.textContent.slice(0, -9);
        // get release year
        const releaseYear = e.target.parentElement.textContent.slice(-7, -3);
        // make copy of movies array
        let movies = [...this.props.movies]
        // find movie with same title AND year and remove it
        for (let i=0; i<movies.length; i++) {
            if (movies[i].title === title && movies[i].releaseYear === releaseYear) {
                movies.splice(i, 1);
                break;
            }
        }
        // save movies array to state
        this.props.handleClickOption(movies, 'movies');
    }

    render() {

        const {
            handleChangeWithOptions,
            onClick,
            onKeyDown,
            handleRemoval,
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
                            return (
                                <li id={option.imdbID} className={className} key={option.Title} onClick={onClick} name="movies" value={option.Title}>
                                    <div id={option.imdbID} className={styles.movieOption}>
                                        <img src={option.Poster} alt='movie poster' onError={i => i.target.style.display='none'}/>
                                        <p>{option.Title} ({option.Year})</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }

        let chosenMoviesList
        if (this.props.movies.length) {
            chosenMoviesList = (
                <ul className={styles.chosenMovies}>
                    {this.props.movies.map((movie, index) => {
                        return (
                            <li key={index}>{movie.title} ({movie.releaseYear}) <button onClick={handleRemoval}>X</button></li>
                        )
                    })}
                        </ul>
            )
        }

        return (
            <div className={styles.addMovies}>
                <p className={styles.message}>What movies has {this.props.name} been in?</p>
                    <div className={styles.field}>
                        {chosenMoviesList}
                        <input
                            type="text"
                            placeholder="Movies"
                            value={this.state.userInput}
                            name="movies"
                            autoComplete="off"
                            onChange={handleChangeWithOptions}
                            onKeyDown={onKeyDown}
                        />
                        {optionList}
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.skip} onClick={this.props.handleSkip}>Skip</button>
                        <button onClick={this.props.handleSubmit} disabled={!this.props.movies.length}>Next</button>&nbsp;&nbsp;
                </div>
            </div>

        )
    }
}


    export default AddMovies;