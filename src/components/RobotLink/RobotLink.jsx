import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RobotLink.module.css';

function robotFontSize(name) {
    let size = '50px';
    if (window.innerWidth < 560) {
        size = '32px';
        if (name.length > 8) {
            size = '25px';
        }
    }
    else {
        if (name.length > 8) {
            size = '40px';
        }
    }
    return size;
}

function robotMargin(robot) {
    let margin;
    if (robot.approved) {
        margin = "0 15px 5% 15px";
    } else margin = "10px";
    return margin;
}

const RobotLink = ({robot, handleRobotSelection}) => (

        <Link
            style={{
                backgroundImage: `url("${robot.imageLandscape}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                fontSize: robotFontSize(robot.name),
                margin: robotMargin(robot)
            }}
            className={styles.link} 
            to={'/robots/'+robot._id}
            key={robot._id}
            onClick={() => handleRobotSelection(robot)}
        >
        {robot.name}
        </Link>
)

export default RobotLink;