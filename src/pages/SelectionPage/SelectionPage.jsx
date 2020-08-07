import React from 'react';
import './SelectionPage.css';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import RobotLink from '../../components/RobotLink/RobotLink';
import Footer from '../../components/Footer/Footer';

function SelectionPage(props) {

    let robotLinks = props.robotsToShow.map(robot => (
            <RobotLink key={robot._id} robot={robot} handleRobotSelection={props.handleRobotSelection}/>
        )
    );

    return (
        <div className='SelectionPage'>
            <Header {... props} />
            <div className='SelectionPage-AllLinks'>
                {/* show loading message if still getting robots */}
                {props.robots && props.robots.length === 0 ? <p className="SelectionPage-NoRobots">Loading...</p>
                :
                // Show robot links or "No Robots" if no robot matches query
                props.robotsToShow.length === 0 && props.robots.length > 0 ? 
                    <p className="SelectionPage-NoRobots">No Robots</p> 
                    : 
                    <div className="SelectionPage-RobotLinks">
                    {robotLinks}
                    {/* show button to add robot on hover if logged in */}
                    {props.user && props.robots.length ? 
                        <Link to="/new-robot" className='SelectionPage-AddRobot'>
                            <div style={{display: 'block', height: '100%'}}>
                                <p className='SelectionPage-plus'>+</p>
                                <p className='SelectionPage-add'>Add Robot</p>
                            </div>
                        </Link>
                        :
                        <div></div>}
                    </div>
                }
            </div>
            <div style={{position: "relative", bottom: "0"}}>
                <Footer {... props} />
            </div>
        </div>
    );
}

export default SelectionPage;