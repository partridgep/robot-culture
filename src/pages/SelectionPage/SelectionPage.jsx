import React from 'react';
import Header from '../../components/Header/Header';
import RobotLink from '../../components/RobotLink/RobotLink';

function SelectionPage(props) {

    const robotLinks = props.robots.map(robot => (
            <RobotLink robot={robot} handleRobotSelection={props.handleRobotSelection}/>
        )
    );

    return (
        <div className='SelectionPage'>
            <Header />
            {props.robots && props.robots.length > 0 ? robotLinks : 'Loading...'}
        </div>
    );
}

export default SelectionPage;