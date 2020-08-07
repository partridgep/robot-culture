import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.css';
import InfoContent from '../InfoContent/InfoContent';

function Info({selRobot, user, handleCategorySelection, handleHoverCategory, robotsOfHoveredCategory, handleAddToFavorites}) {

    const [editMode, setEditMode] = useState({
        activated: false
    });

    function toggleEditing({activated}) {
        setEditMode({ activated: !activated });
    }

    return (
        <div className={styles.diagonalBox}>
            <div className={styles.display}>
                
                {/* at the top, show the name and X button */}
                <div className={styles.top}>

                    <h2 className={styles.name}>{selRobot.name} {editMode.activated && <Link className={styles.editButton} to={"/"+selRobot._id+"/edit-name/"}><button className={styles.toEdit}>EDIT</button></Link>}
                    </h2>
                    {/* toggle edit mode */}
                    {user ? <p className={styles.editModeButton} onClick={() => toggleEditing(editMode)}>...</p>: <p> </p>}

                    <Link to={selRobot.approved ? '/robots' : '/admin'} className={styles.xOut}>X</Link>
                    {/* show # of likes and link to add/remove favorite */}
                    <div className={styles.favorites}>
                        {/* only show # of likes if > 0 */}
                        {selRobot.favoritedBy && selRobot.favoritedBy.length > 0 && <p>Favorited by {selRobot.favoritedBy.length} user{selRobot.favoritedBy.length > 1 && 's'} | </p> }
                        {/* if logged in, show actual links to add/remove as favorite */}
                        {user ? 
                            <p><button onClick={() => handleAddToFavorites(selRobot._id)}>
                                {selRobot.favoritedBy.includes(user._id) ? 
                                'Remove from Favorites' : 'Add to my Favorites'}
                            </button></p>
                            : 
                            // if not logged in, divert user to login
                            <Link to="/login"> Add to my Favorites</Link>
                        }
                    </div>
                </div>
    
                {/* below, show the robot content (trivia and image) */}
                <InfoContent 
                    selRobot={selRobot} 
                    handleCategorySelection={handleCategorySelection}
                    handleHoverCategory={handleHoverCategory}
                    robotsOfHoveredCategory={robotsOfHoveredCategory}
                    editMode={editMode}
                    toggleEditing={toggleEditing}
                />
    
            </div>
        </div>
    )
} 

export default Info;
