import React from 'react';
import { Link } from 'react-router-dom';
import './UpdatesPage.css';
import RobotLink from '../../components/RobotLink/RobotLink';
import UpdateSummary from '../../components/UpdateSummary/UpdateSummary';

function getCreationTime(timestamp) {
    let creationTime = new Date(timestamp);
    let hour = creationTime.getHours();
    let minutes = (creationTime.getMinutes() < 10 ? '0':'') + creationTime.getMinutes();
    let date = creationTime.getDate();
    let month = creationTime.getMonth();
    let year = creationTime.getFullYear();
    creationTime = `Created at ${hour}:${minutes} on ${month + 1}/${date}/${year}`;
    return creationTime;
}

function getNewRobots(robots, handleRobotSelection, handleApproval, handleDelete) {
    let newRobots = [];
    for (var robot of robots) {
        if (!robot.approved) newRobots.push(robot);
    }
    let robotLinks = newRobots.map(robot => (
        <div key={robot._id} className='UpdatesPage-approvalRow'>
            <RobotLink style={{margin: "0"}} robot={robot} 
            handleRobotSelection={handleRobotSelection}
            />
            <p>{getCreationTime(robot.createdAt)}</p>
            <div className='UpdatesPage-buttons'>
                <button onClick={() => handleApproval(robot._id)}>Approve</button>
                <button onClick={() => handleDelete(robot._id)}>Delete</button>
            </div>
        </div>
        )
    );
    return robotLinks;
}

function getUpdatedRobots(robots, updateRobots) {
    let updatedRobots = [];
    for (var robot of robots) {
        if (robot.updates.length) updatedRobots.push(robot);
    }
    let updateLinks = updatedRobots.map((robot, index) => (
        <UpdateSummary robot={robot} key={index} updateRobots={updateRobots}/>
    ));
    return updateLinks;
}

function UpdatesPage({user, robots, handleRobotSelection, handleApproval, handleDelete, updateRobots}) {

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
                    <div className='UpdatesPage-newRobots'>
                            {getUpdatedRobots(robots, updateRobots).length > 0 ?
                                <div className='UpdatesPage-robots'>
                                    {getUpdatedRobots(robots, updateRobots)}
                                </div>
                                :
                                <div className='UpdatesPage-NoNew'><p>No Updated Robots</p></div>
                            }
                    </div>
                </div>
                : 
                <h1>Please Login</h1>}
        </div>
    );
}

export default UpdatesPage;