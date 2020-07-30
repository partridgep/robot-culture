import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './AddMovies.module.css';

import { getMovieMatches } from '../../services/omdb-api';



export class AddMovies extends Component {

    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: '',
        possibleMovieMatches: [],
        options: []
    };

    // function to grab possible movie matches from our movie API
    async getMovieOptions() {
        let movies = [];
        let movieTitles = [];
        // only start a search if user has entered at least 3 characters
         if (this.state.userInput.length > 3) {
             // grab data from API
             movies = await getMovieMatches(this.state.userInput);
             // if results obtained successfully
             if (movies.Search) {
                // max 5 results
                if (movies.Search.length > 5) movies.Search.length = 5;
                // set to state
                this.setState({possibleMovieMatches: movies.Search})
             }
         }
    }


    // function to handle change and consider options
    handleChangeWithOptions = async (e) => {
        console.log(e.currentTarget.value);
        // call regular handleChange method to set input to state
        //this.props.handleChange(e);
        // destructure options array
        const options = this.state.options;
        // grab user input
        const userInput = e.currentTarget.value;
        // filter our options to see which fit the user input
        // const filteredOptions = options.filter(
        //     (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        // );
        await this.setState({
            activeOption: 0,
            // filteredOptions,
            // showOptions: true,
            userInput: e.currentTarget.value
        });
        // get our possible movie matches from our API
        this.getMovieOptions();
    };

    // // turns suggestions off and puts text from clicked element into input field
    // onClick = (e) => {
    //     this.setState({
    //         activeOption: 0,
    //         filteredOption: [],
    //         showOptions: false,
    //     });
    //     // save option to state
    //     this.props.handleChooseOption(e, 'movies');
    // };

    // onKeyDown = (e) => {
    //     console.log(e.keyCode);
    //     const { activeOption, filteredOptions } = this.state;
    //     // if user hits Enter
    //     if (e.keyCode === 13) {
    //         // if already selected one of the options
    //         // OR
    //         // user has put in a brand new option,
    //         // submit form and exit
    //         if (this.state.options.includes(this.props.movies) || (this.state.filteredOptions.length === 0 && this.state.showOptions)) {
    //             console.log('time to submit');
    //             this.props.handleSubmit();
    //             return;
    //         }
    //         // set option to state
    //         this.props.handleClickOption(filteredOptions[activeOption], 'movies');
    //         // turn suggestions off
    //         this.setState({
    //             activeOption: 0,
    //             showSuggestions: false,
    //             showOptions: false
    //         });
    //     // if user hits the Up key
    //     } else if (e.keyCode === 38) {
    //         // prevent user from going past first option
    //         if (activeOption === 0) return;
    //         // get previous option
    //         this.setState({ activeOption: activeOption - 1 });
    //     // if user hits the Down Key
    //     } else if (e.keyCode === 40) {
    //         // prevent user from going past last option
    //         if (activeOption === filteredOptions.length - 1) return;
    //         // get next option
    //         this.setState({ activeOption: activeOption + 1 });
    //     }
    // };

    render() {

        // const {
        //     handleChangeWithOptions,
        //     onClick,
        //     onKeyDown,
        //     state: { activeOption, filteredOptions, showOptions, userInput }
        // } = this;

        // let optionList;

        // if (showOptions && userInput) {
        //     if (filteredOptions.length) {
        //         optionList = (
        //             <ul className={styles.options}>
        //                 {filteredOptions.map((optionName, index) => {
        //                     let className;
        //                     if (index === activeOption) {
        //                         className = styles.activeOption;
        //                     }
        //                     return (
        //                         <li className={className} key={optionName} onClick={onClick} name="movies" value={optionName}>
        //                             {optionName}
        //                         </li>
        //                     );
        //                 })}
        //             </ul>
        //         );
        //     }
        // }

        return (
            <div className={styles.addMovies}>
                <p className={styles.message}>What movies has {this.props.name} been in?</p>
                    <div className={styles.field}>
                        <input
                            type="text"
                            placeholder="Movies"
                            value={this.state.userInput}
                            name="movies"
                            autoComplete="off"
                            onChange={this.handleChangeWithOptions}
                            // onKeyDown={onKeyDown}
                        />
                    {/* {optionList} */}
                    </div>
                    <div className={styles.buttons}>
                        <Link onClick={this.props.handleSkip}>Skip</Link>
                        <button onClick={this.props.handleSubmit} >Next</button>&nbsp;&nbsp;
                </div>
            </div>

        )
    }
}


    export default AddMovies;