import React from 'react';
import { Link } from 'react-router-dom';
import ReactHover from 'react-hover';
import styles from './Categories.module.css';

// hover options for list of robots that pop up
// when hover over a category
const hoverOptions = {
    //pop-up does not move with the cursos
    followCursor: false,
    shiftX: 0,
    shiftY: 0
}

const Categories = ({selRobot, handleCategorySelection, handleHoverCategory, robotsOfHoveredCategory}) => (

    // display all the categories the robot belongs to
    <div className={styles.categories}>
    Categories:&nbsp;
        <span>
            {/* for each category, create a hoverable link */}
            {selRobot.categories.map((category, idx) => 
                (<ReactHover options={hoverOptions} key={idx}>

                    {/* declare the link as the hover "trigger" */}
                    <ReactHover.Trigger type='trigger'>
                        {/* create link to category,
                        click sets the category,
                        hover gets all robots in category */}
                        <Link 
                            to="/robots" 
                            key={idx} 
                            onClick={(e) => handleCategorySelection(e)} 
                            onMouseOver={(e) => handleHoverCategory(e)}
                        >{category}
                        </Link>
                    </ReactHover.Trigger>

                    {/* display of robots in category that appears on hover */}
                    {robotsOfHoveredCategory.length && 
                    <ReactHover.Hover type='hover'>
                        <div className={styles.hover}>
                            {/* for each robot in the category, create a link to robot */}
                            {robotsOfHoveredCategory.map(robot => 
                                <Link 
                                    to={'/robots/'+robot._id} 
                                    key={robot._id}
                                >{robot.name}</Link>)}</div>
                    </ReactHover.Hover> }
                    
                    {/* add comma between categories */}
                </ReactHover>)).reduce((prev, curr) => [prev, ', ', curr])}
        </span>
    </div>
)

export default Categories;