import React from 'react';
import styles from './GoogleBooksApiOption.module.css';

const GoogleBooksApiOption = ({ option, className, onClick}) => (

    <li id={option.id} className={className} onClick={onClick} name="media" value={option.volumeInfo.title}>
        <div id={option.id} className={styles.bookOption}>
            {option.volumeInfo.imageLinks && <img src={option.volumeInfo.imageLinks.smallThumbnail} alt='book cover' onError={i => i.target.style.display = 'none'} />}
            <p>{option.volumeInfo.title} ({option.volumeInfo.publishedDate && option.volumeInfo.publishedDate.slice(0,4)})</p>
        </div>
    </li>
)

export default GoogleBooksApiOption;