import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function getPopCultures(robots) {
    let popCultures = ["All Pop-Culture"];
    for (var robot of robots) {
        if (!popCultures.includes("Movies") && robot.movies.length > 0) popCultures.push("Movies");
        if (!popCultures.includes("Books") && robot.books.length > 0) popCultures.push("Books");
        if (!popCultures.includes("TV Shows") && robot.tvShows.length > 0) popCultures.push("TV Shows");
        if (!popCultures.includes("Games") && robot.games.length > 0) popCultures.push("Games");
    }
    return popCultures;
}

function getCategories(robots) {
    let categories = ["All"];
    for (var robot of robots) {
        for(var category of robot.categories)
        if (!categories.includes(category)) categories.push(category);
    }
    categories.sort();
    return categories;
}

const Header = props => (
    <div className={styles.header}>
        <h1 className={styles.title}>ROBOT CULTURE</h1>
        <Link to="/" className={styles.login}>LOGIN</Link>
        <p className={styles.select}>Select Robot from:  
            <select className={styles.options} onChange={props.handleCultureSelection}>
                {getPopCultures(props.robots).map(culture => <option key={culture}>{culture}</option>)}
            </select>
        </p>
        <p className={styles.select}>Choose Category: 
            <select className={styles.options} onChange={props.handleCategorySelection}>
                {getCategories(props.robots).map(category => <option key={category}>{category}</option>)}
            </select>
        </p>
        <form className={styles.search}><input placeholder="Search"/></form>
    </div>
);

export default Header;