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
                selCategory={props.selCategory}
                search={props.search}
                user={props.user}
                handleCultureSelection={props.handleCultureSelection}
                handleCategorySelection={props.handleCategorySelection}
                handleSubmit={props.handleSubmit}
                handleChange={props.handleChange}
                resetSearch={props.resetSearch}
                handleLogout={props.handleLogout}
            />
            <div className='SelectionPage-AllLinks'>
                {/* show loading message if still getting robots */}
                {props.robots && props.robots.length === 0 && 'Loading...'}
                {/* Show robot links or "No Robots" if no robot matches query */}
                {props.robotsToShow.length === 0 && props.robots.length > 0 ? 
                    <p className="SelectionPage-NoRobots">No Robots</p> 
                    : 
                    robotLinks
                }
            </div>
        </div>
    );
}

export default SelectionPage;