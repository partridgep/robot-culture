import React from 'react';
import './RobotInfoPage.css';
import Info from '../../components/Info/Info';

function RobotInfoPage(props) {

    return (
        <div className='RobotInfoPage'>
            {props.robots.length > 0 
            && 
            props.selRobot
            &&
            <Info 
                selRobot={props.selRobot} 
                key={props.selRobot._id} 
                user={props.user}
                robotsOfHoveredCategory={props.robotsOfHoveredCategory}
                handleCategorySelection={props.handleCategorySelection}
                handleHoverCategory={props.handleHoverCategory}
                handleAddToFavorites={props.handleAddToFavorites}
            />}
        </div>
    );
}

export default RobotInfoPage;