import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RobotLink.module.css';

function robotFontSize(name) {

    let className = styles.normal;
    if (name.length > 8) {
        className = styles.long;
    }
    return className;
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
                margin: robotMargin(robot)
            }}
            className={`${styles.link} ${robotFontSize(robot.name)}`} 
            to={'/robots/'+robot._id}
            key={robot._id}
            onClick={() => handleRobotSelection(robot)}
        >
        {robot.name}
        </Link>
)

export default RobotLink;