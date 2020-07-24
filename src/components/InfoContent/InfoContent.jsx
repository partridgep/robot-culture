import React from 'react';
import styles from './InfoContent.module.css';
import Categories from '../Categories/Categories';


const InfoContent = ({selRobot, handleCategorySelection, handleHoverCategory, robotsOfHoveredCategory}) => (

    <div className={styles.lower}>
        {/* to the left, display the robot trivia */}
        <div className={styles.trivia}>

            {/* first up are the categories */}
            <Categories 
                selRobot={selRobot}
                robotsOfHoveredCategory={robotsOfHoveredCategory}
                handleCategorySelection={handleCategorySelection}
                handleHoverCategory={handleHoverCategory}
            />

            {/* then show the height */}
            {/* show feet and inches if we have both */}
            {selRobot.height.feet > 0 && selRobot.height.inches > 0 && <p>Height: <span>{selRobot.height.feet}'{selRobot.height.inches}"</span></p>}
            {/* show just feet if that's all we have */}
            {selRobot.height.feet > 0 && !selRobot.height.inches && <p>Height: <span>{selRobot.height.feet}'</span></p>}
            {/* show just inches if that's all we have */}
            {!selRobot.height.feet && selRobot.height.inches && <p>Height: <span>{selRobot.height.inches}"</span></p>}

            {/* show manufacturer info if it exists */}
            {selRobot.manufacturer !== "" && <p>Manufacturer: <span>{selRobot.manufacturer}</span></p>}

            {/* if robot has been in movies, display them */}
            {selRobot.movies.length > 0 && <p>Movies: <span>
                {selRobot.movies.map(movie => (
                    // create an external link for each movie
                    <a href={movie.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={movie.link}
                    >{movie.title} ({movie.releaseYear})
                    {/* add the comma between movies */}
                    </a>)).reduce((prev, curr) => [prev, ', ', curr])}
                </span></p>}

            {/* if robot has been portrayed by actors, display them */}
            {selRobot.actors.length > 0 && <p>Portrayed by: <span>
                {selRobot.actors.map(actor => (
                    // create an external link for each actor
                    <a href={actor.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={actor.link}
                    >{actor.name}
                    </a>)).reduce((prev, curr) => [prev, ', ', curr])}
                </span></p>}

            {/* if robot has been featured in books, display them */}
            {selRobot.books.length > 0 && <p>Books: <span>{selRobot.books.join(', ')}</span></p>}

            {/* if robot has been featured in TV Shows, display them */}
            {selRobot.tvShows.length > 0 && <p>Games: <span>{selRobot.tvShows.join(', ')}</span></p>}

            {/* if robot has been featured in games, display them */}
            {selRobot.games.length > 0 && <p>Games: <span>{selRobot.games.join(', ')}</span></p>}
        </div>

        {/* to the right, display the robot picture */}
        <img className={styles.picture} src={selRobot.imagePortrait} alt={selRobot.name}></img>
    </div>
)

export default InfoContent;