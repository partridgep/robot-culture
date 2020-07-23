import React from 'react';
import './RobotInfoPage.css';
import Info from '../../components/Info/Info';
import robotsService from '../../utils/robotsService';

function RobotInfoPage({selRobot, robots}) {

    return (
        <div className='RobotInfoPage'>
            {robots.length > 0 && <Info selRobot={selRobot} key={selRobot._id}/>}
        </div>
    );
}

export default RobotInfoPage;