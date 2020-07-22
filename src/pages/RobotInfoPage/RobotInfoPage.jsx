import React from 'react';
import './RobotInfoPage.css';
import Info from '../../components/Info/Info';

function RobotInfoPage({selRobot}) {

    return (
        <div className='RobotInfoPage'>
            <Info selRobot={selRobot}/>
        </div>
    );
}

export default RobotInfoPage;