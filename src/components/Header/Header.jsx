import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = props => (
    <div className={styles.header}>
        <h1 className={styles.title}>ROBOT CULTURE</h1>
        <Link to="/" className={styles.login}>LOGIN</Link>
        <p className={styles.select}>Select Robot from:  <select className={styles.options}><option>All Pop-Culture</option></select></p>
        <p className={styles.select}>Choose Category: <select className={styles.options}><option>All</option></select></p>
        <form className={styles.search}><input placeholder="Search"/></form>
    </div>
);

export default Header;