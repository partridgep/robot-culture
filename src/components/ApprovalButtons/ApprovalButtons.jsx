import React from 'react';
// import styles from './ApprovalButtons.module.css';
import parentStyles from '../UpdateSummary/UpdateSummary.module.css';

const ApprovalButtons = ({approveChange, denyChange, robot, update, idx, updateRobots}) => {

    return (
        <div className={parentStyles.approvalButtons}>
            <button onClick={() => approveChange(robot, update, updateRobots, idx)}>✔︎</button>
            <button onClick={() => denyChange(robot, update, updateRobots, idx)}>𐄂</button>
        </div>
    )
}


export default ApprovalButtons;