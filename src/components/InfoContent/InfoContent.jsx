import React from 'react';
import styles from './InfoContent.module.css';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';


const InfoContent = ({selRobot, handleCategorySelection, handleHoverCategory, robotsOfHoveredCategory, editMode, toggleEditing}) => (

    <div className={styles.lower}>
        {/* to the left, display the robot trivia */}
        <div className={styles.trivia}>

            {/* first up are the categories */}
            <Categories 
                selRobot={selRobot}
                robotsOfHoveredCategory={robotsOfHoveredCategory}
                handleCategorySelection={handleCategorySelection}
                handleHoverCategory={handleHoverCategory}
                editMode={editMode}
                toggleEditing={toggleEditing}
            />

            {/* then show the height */}
            {/* show feet and inches if we have both */}
            {selRobot.height.feet > 0 && selRobot.height.inches > 0 && <p>Height: <span>{selRobot.height.feet}'{selRobot.height.inches}"</span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-height/"}><button>EDIT</button></Link>}</p>}
            {/* show just feet if that's all we have */}
            {selRobot.height.feet > 0 && !selRobot.height.inches && <p>Height: <span>{selRobot.height.feet}'</span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-height/"}><button>EDIT</button></Link>}</p>}
            {/* show just inches if that's all we have */}
            {!selRobot.height.feet && selRobot.height.inches > 0 && <p>Height: <span>{selRobot.height.inches}"</span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-height/"}><button>EDIT</button></Link>}</p>}

            {/* show manufacturer info if it exists */}
            {selRobot.manufacturer !== "" && <p>Manufacturer: <span>{selRobot.manufacturer} {editMode.activated && <Link to={"/"+selRobot._id+"/edit-manufacturer/"}><button>EDIT</button></Link>}</span></p>}

            {/* if robot has been featured in books, display them */}
            {selRobot.books && selRobot.books.length > 0 && <p>Books: <span>
                {selRobot.books.map(book => (
                    // create an external link for each movie
                    <a href={book.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={book.link}
                    >{book.title}
                    {/* add the comma between movies */}
                    </a>)).reduce((prev, curr) => [prev, ', ', curr])}
                </span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-books/"}><button>EDIT</button></Link>}</p>}

            {/* if robot has been in movies, display them */}
            {selRobot.movies && selRobot.movies.length > 0 && <p>Movies: <span>
                {selRobot.movies.map(movie => (
                    // create an external link for each movie
                    <a href={movie.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={movie.link}
                    >{movie.title} ({movie.releaseYear})
                    {/* add the comma between movies */}
                    </a>)).reduce((prev, curr) => [prev, ', ', curr])}
                </span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-movies/"}><button>EDIT</button></Link>}</p>}


            {/* if robot has been featured in TV Shows, display them */}
            {selRobot.tvShows.length > 0 && <p>TV Shows: <span>
                {selRobot.tvShows.map(tvShow => (
                    // create an external link for each movie
                    <a href={tvShow.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={tvShow.link}
                    >{tvShow.title} ({tvShow.releaseYear})
                    {/* add the comma between movies */}
                    </a>)).reduce((prev, curr) => [prev, ', ', curr])}
                </span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-tvShows/"}><button>EDIT</button></Link>}</p>}

            {/* if robot has been featured in games, display them */}
            {selRobot.games.length > 0 && <p>Games: <span>
                {selRobot.games.map(game => (
                    // create an external link for each movie
                    <a href={game.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={game.link}
                    >{game.title} ({game.releaseYear})
                    {/* add the comma between movies */}
                    </a>)).reduce((prev, curr) => [prev, ', ', curr])}
                </span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-games/"}><button>EDIT</button></Link>}</p>}

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
                </span> {editMode.activated && <Link to={"/"+selRobot._id+"/edit-actors/"}><button>EDIT</button></Link>}</p>}
        </div>

        {/* to the right, display the robot picture */}
        <div className={styles.picture}>
            <img  src={selRobot.imagePortrait} alt={selRobot.name}></img>
            {editMode.activated && <Link to={"/"+selRobot._id+"/edit-image/"}><button>EDIT</button></Link>}
        </div>
    </div>
)

export default InfoContent;