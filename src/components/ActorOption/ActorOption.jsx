import React from 'react';
import styles from './ActorOption.module.css';

const ActorOption = ({ option, className, onClick}) => (

    <li id={option.id} className={className} onClick={onClick} name="media" value={option.title}>
        <div id={option.id} className={styles.ActorOption}>
            <img src={option.image} alt='actor' onError={i => i.target.style.display = 'none'} />
            <p>{option.title}</p>
        </div>
    </li>
)

export default ActorOption;