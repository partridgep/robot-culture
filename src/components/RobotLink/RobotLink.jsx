import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RobotLink.module.css';

function robotFontSize(name) {
    let size = '50px';
    if (name.length > 8) {
        size = '40px';
    } else if (name.length > 12) {
        size = '30px';
    }
    return size;
}

const RobotLink = ({robot, handleRobotSelection}) => (

        <Link
            style={{
                backgroundImage: `url("${robot.imageLandscape}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                fontSize: robotFontSize(robot.name)
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