import React from 'react';
import styles from './Footer.module.css';

const Footer = props => (
    <div className={styles.footer}>
        <p>Created by Paul Partridge</p>
        <a className={styles.socialLink} href="https://github.com/partridgep/robot-culture" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github-square fa-2x"></i>
        </a>
        <a className={styles.socialLink} href="https://www.linkedin.com/in/partridgepaul/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
        </a>
    </div>
)

export default Footer;
