import React from 'react';
import './RobotInfoPage.css';
import Info from '../../components/Info/Info';

function RobotInfoPage({selRobot}) {

    let movieLinks = [];
    for (var movie of selRobot.movies) {
        movieLinks.push(`<a href=${movie.link} target="_blank">${movie.title}</a>`);
    };
    movieLinks = movieLinks.join(', ');
    //console.log(movieLinks);

    return (
        <div className='RobotInfoPage'>
            <Info selRobot={selRobot} movieLinks={movieLinks}/>
        </div>
    );
}

export default RobotInfoPage;