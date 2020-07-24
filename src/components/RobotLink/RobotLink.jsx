import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RobotLink.module.css';

const RobotLink = ({robot, handleRobotSelection}) => (

        <Link
            style={{
                backgroundImage: `url("${robot.imageLandscape}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
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