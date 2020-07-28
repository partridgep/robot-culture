import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';

function UserPage({user}) {

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
                            {user.favoritedRobots.length > 0 ?
                                <div className='UserPage-robots'>
                                    <p>Favorited</p>
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
  