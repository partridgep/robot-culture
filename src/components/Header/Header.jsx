import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

// get pop-culture options for drop-down menu
function getPopCultures(robots) {
    // initialize array of pop-cultures with a catch-all
    let popCultures = ["All Pop-Culture"];
    for (var robot of robots) {
        // if an robot contains a new type of pop-culture, add pop-culture type to array
        if (!popCultures.includes("Movies") && robot.movies.length > 0 && robot.approved) popCultures.push("Movies");
        if (!popCultures.includes("Books") && robot.books.length > 0 && robot.approved) popCultures.push("Books");
        if (!popCultures.includes("TV Shows") && robot.tvShows.length > 0 && robot.approved) popCultures.push("TV Shows");
        if (!popCultures.includes("Games") && robot.games.length > 0 && robot.approved) popCultures.push("Games");
    }
    return popCultures;
}

// get category options for drop-down menu
function getCategories(robots) {
    // initialize array of categories with catch-all
    let categories = ["All"];
    for (var robot of robots) {
        // iterate through categories of each robot
        for(var category of robot.categories) {
            // if an approved robot has a new category, add category to array
            if (!categories.includes(category) && robot.approved) categories.push(category);
        }
    }
    //alphabetize categories
    categories.sort();
    return categories;
}

const Header = props => (
    <div className={styles.header}>
        <h1 className={styles.title}>ROBOT CULTURE</h1>
        <Link to="/" className={styles.login}>LOGIN</Link>
        <p className={styles.select}>Select Robot from:  
            <select className={styles.options} onChange={props.handleCultureSelection} >
                {getPopCultures(props.robots).map(culture => <option key={culture}>{culture}</option>)}
            </select>
        </p>
        <p className={styles.select}>Choose Category: 
            <select className={styles.options} value={props.selCategory} onChange={props.handleCategorySelection}>
                {getCategories(props.robots).map(category => <option key={category}>{category}</option>)}
            </select>
        </p>
        <form className={styles.search} onSubmit={props.handleSubmit}>
            <input placeholder="Search"
            value={props.search} 
            onChange={props.handleChange}
            />
        </form>
    </div>
);

export default Header;