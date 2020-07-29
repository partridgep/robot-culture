import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';
import RobotLink from '../../components/RobotLink/RobotLink';

function getUserFavorites(user, robots, handleRobotSelection) {
    let favorites = [];
    for (var robot of robots) {
        if (robot.favoritedBy.includes(user._id)) favorites.push(robot);
    }
    //sort the robots by name
    favorites.sort((robot1, robot2) => (robot1.name > robot2.name) ? 1 : ((robot2.name > robot1.name) ? -1 : 0)); 
    let robotLinks = favorites.map(robot => (
        <RobotLink key={robot._id} robot={robot} 
        handleRobotSelection={handleRobotSelection}
        />
        )
    );
    return robotLinks;
}

function UserPage({user, robots, handleRobotSelection}) {

    return (
        <div>
            {user ? 
                <div className='UserPage'>
                    <Link to="/robots" className='UserPage-X'>X</Link>
                    <div className='UserPage-Info'>
                        <p className='UserPage-icon'>{user.name[0].toUpperCase()}</p>
                        <div className='UserPage-contact'>
                            <p>Name: <span>{user.name}</span></p> 
                            <p>Email: <span>{user.email}</span></p> 
                        </div>
                    </div>
                    <div className='UserPage-favorites'>
                        <h2>Favorited Robots</h2>
                            {getUserFavorites(user, robots, handleRobotSelection).length > 0 ?
                                <div className='UserPage-robots'>
                                    {getUserFavorites(user, robots, handleRobotSelection)}
                                </div>
                                :
                                <div className='UserPage-NoFavorites'><p>No Favorites Yet</p></div>
                            }
                    </div>
                </div>
                : 
                <h1>Please Login</h1>}
        </div>
    );
}

export default UserPage;
  