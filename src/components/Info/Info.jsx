import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.css';
import InfoContent from '../InfoContent/InfoContent';

const Info = ({selRobot, handleCategorySelection, handleHoverCategory, robotsOfHoveredCategory}) => (
    
    <div className={styles.diagonalBox}>
        <div className={styles.display}>
            
            {/* at the top, show the name and X button */}
            <div className={styles.top}>
                <h2 className={styles.name}>{selRobot.name}</h2>
                <Link to='/robots' className={styles.xOut}>X</Link>
            </div>

            {/* below, show the robot content (trivia and image) */}
            <InfoContent 
                selRobot={selRobot} 
                handleCategorySelection={handleCategorySelection}
                handleHoverCategory={handleHoverCategory}
                robotsOfHoveredCategory={robotsOfHoveredCategory}
            />

        </div>
    </div>
)

export default Info;
