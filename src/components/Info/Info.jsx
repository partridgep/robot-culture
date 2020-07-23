import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.css';

const Info = ({selRobot}) => (
    
    <div className={styles.diagonalBox}>
        <div className={styles.content}>
            <div className={styles.top}>
                <h2 className={styles.name}>{selRobot.name}</h2>
                <Link to='/robots' className={styles.xOut}>X</Link>
            </div>
            <div className={styles.lower}>
                <div className={styles.trivia}>
                    <p>Categories: <span>{selRobot.categories.join(', ')}</span></p>
                    {selRobot.height.feet && selRobot.height.inches && <p>Height: <span>{selRobot.height.feet}'{selRobot.height.inches}"</span></p>}
                    {selRobot.height.feet > 0 && !selRobot.height.inches && <p>Height: <span>{selRobot.height.feet}'</span></p>}
                    {!selRobot.height.feet && selRobot.height.inches && <p>Height: <span>{selRobot.height.inches}"</span></p>}
                    {selRobot.manufacturer !== "" && <p>Manufacturer: <span>{selRobot.manufacturer}</span></p>}
                    {selRobot.movies.length > 0 && <p>Movies: <span>
                        {selRobot.movies.map(movie => (<a href={movie.link} target="_blank" rel="noopener noreferrer" key={movie.link}>{movie.title} ({movie.releaseYear})</a>)).reduce((prev, curr) => [prev, ', ', curr])}
                        </span></p>}
                    {selRobot.actors.length > 0 && <p>Portrayed by: <span>
                        {selRobot.actors.map(actor => (<a href={actor.link} target="_blank" rel="noopener noreferrer" key={actor.link}>{actor.name}</a>)).reduce((prev, curr) => [prev, ', ', curr])}
                        </span></p>}
                    {selRobot.books.length > 0 && <p>Books: <span>{selRobot.books.join(', ')}</span></p>}
                    {selRobot.tvShows.length > 0 && <p>Games: <span>{selRobot.tvShows.join(', ')}</span></p>}
                    {selRobot.games.length > 0 && <p>Games: <span>{selRobot.games.join(', ')}</span></p>}
                </div>
                <img className={styles.picture} src={selRobot.imagePortrait} alt={selRobot.name}></img>
            </div>
        </div>
    </div>
)

export default Info;
