import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.css';
import InfoContent from '../InfoContent/InfoContent';

const Info = ({selRobot, user, handleCategorySelection, handleHoverCategory, robotsOfHoveredCategory, handleAddToFavorites}) => (
    
    <div className={styles.diagonalBox}>
        <div className={styles.display}>
            
            {/* at the top, show the name and X button */}
            <div className={styles.top}>
                <h2 className={styles.name}>{selRobot.name}</h2>
                <Link to='/robots' className={styles.xOut}>X</Link>
                <div className={styles.favorites}>
                    {selRobot.favoritedBy && selRobot.favoritedBy.length > 0 && <p>Favorited by {selRobot.favoritedBy.length} users | </p> }
                    {user ? 
                        selRobot.favoritedBy.includes(user._id) ?
                            <p><button>Remove from Favorites</button></p>
                            :
                            <p><button onClick={() => handleAddToFavorites(selRobot)}>Add to my Favorites</button></p> 
                        : 
                        <Link to="/login">Add to my Favorites</Link>
                    }
                </div>
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
