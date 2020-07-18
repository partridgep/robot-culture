import React from 'react';
import {Link} from 'react-router-dom';

function RobotInfoPage(props) {

    console.log('robot info page');

    return (
        <div>
            <h1>ROBOT CULTURE</h1>
            <h2>Wall-e</h2>
            <Link to="/robots">Home</Link>
        </div>
    );
}

export default RobotInfoPage;