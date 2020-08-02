import React from 'react';
import { Link } from 'react-router-dom';
import './UpdatesPage.css';
import RobotLink from '../../components/RobotLink/RobotLink';

function getNewRobots(robots, handleRobotSelection, handleApproval, handleDelete) {
    let newRobots = [];
    console.log(robots);
    for (var robot of robots) {
        if (!robot.approved) newRobots.push(robot);
    }
    let robotLinks = newRobots.map(robot => (
        <div className='UpdatesPage-approvalRow'>
            <RobotLink style={{margin: "0"}} key={robot._id} robot={robot} 
            handleRobotSelection={handleRobotSelection}
            />
            <p>{robot.createdAt}</p>
            <div className='UpdatesPage-buttons'>
                <button onClick={() => handleApproval(robot._id)}>Approve</button>
                <button onClick={() => handleDelete(robot._id)}>Delete</button>
            </div>
        </div>
        )
    );
    return robotLinks;
}

function UpdatesPage({user, robots, handleRobotSelection, handleApproval, handleDelete}) {

    return (
        <div>
            {user ? 
                <div className='UpdatesPage'>
                    <Link to="/robots" className='UpdatesPage-X'>X</Link>
                    <h2>New Robots</h2>
                    <div className='UpdatesPage-newRobots'>
                            {getNewRobots(robots, handleRobotSelection).length > 0 ?
                                <div className='UpdatesPage-robots'>
                                    {getNewRobots(robots, handleRobotSelection, handleApproval, handleDelete)}
                                </div>
                                :
                                <div className='UpdatesPage-NoNew'><p>No New Robots</p></div>
                            }
                    </div>
                    <h2>Updates to Robots</h2>
                </div>
                : 
                <h1>Please Login</h1>}
        </div>
    );
}

export default UpdatesPage;