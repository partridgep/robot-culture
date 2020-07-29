import React, { Component } from 'react';
import './AddRobotPage.css';

class AddRobotPage extends Component {

    state = {
        newRobot: {
            approved: false,
            name: '',
            imageLandscape: '',
            imagePortrait: '',
            movies: [],
            books: [],
            games: [],
            tvShows: [],
            height: {},
            manufacturer: '',
            actors: [],
            categories: []
        },
        addProcess: 0
    }
    
    render() {

        return (
            <div className='AddRobotPage'>
    
            </div>
        );
    }
}

export default AddRobotPage;