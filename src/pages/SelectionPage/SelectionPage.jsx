import React from 'react';
import './SelectionPage.css';
import Header from '../../components/Header/Header';
import RobotLink from '../../components/RobotLink/RobotLink';

function SelectionPage(props) {

    const robotLinks = props.robotsToShow.map(robot => (
            <RobotLink key={robot._id} robot={robot} handleRobotSelection={props.handleRobotSelection}/>
        )
    );

    return (
        <div className='SelectionPage'>
            <Header 
                robots={props.robots}
                robotsToShow={props.robotsToShow}
                handleCultureSelection={props.handleCultureSelection}
                handleCategorySelection={props.handleCategorySelection}
                selCategory={props.selCategory}
            />
            <div className='SelectionPage-AllLinks'>
                {props.robots && props.robots.length > 0 ? robotLinks : 'Loading...'}
                {props.robotsToShow.length === 0 && <p>No Robots</p>}
            </div>
        </div>
    );
}

export default SelectionPage;