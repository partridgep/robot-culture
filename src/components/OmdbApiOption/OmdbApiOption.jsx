import React from 'react';
import styles from './OmdbApiOption.module.css';

const OmdbApiOption = ({ option, className, onClick}) => (

    <li id={option.imdbID} className={className} key={option.Title} onClick={onClick} name="media" value={option.Title}>
        <div id={option.imdbID} className={styles.movieOption}>
            <img src={option.Poster} alt='poster' onError={i => i.target.style.display = 'none'} />
            <p>{option.Title} ({option.Year})</p>
        </div>
    </li>
)

export default OmdbApiOption;