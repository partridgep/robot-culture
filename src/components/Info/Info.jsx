import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.css';

const Info = ({selRobot, movieLinks}) => (
    
    <div className={styles.diagonalBox}>
        <div className={styles.content}>
            <div className={styles.top}>
                <h2 className={styles.name}>{selRobot.name}</h2>
                <Link to='/robots' className={styles.xOut}>X</Link>
            </div>
            <div className={styles.lower}>
                <div className={styles.trivia}>
                    <p>Categories: <span>{selRobot.categories.join(', ')}</span></p>
                    {selRobot.height > 0 && selRobot.width > 0 && selRobot.length > 0 && <p>Dimensions: <span>{selRobot.height}x{selRobot.width}x{selRobot.length}</span></p>}
                    {selRobot.movies.length > 0 && <p>Movies: <span> {movieLinks} </span></p>}
                    {selRobot.actors.length > 0 && <p>Portrayed by: <span>{selRobot.actors.join(', ')}</span></p>}
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
