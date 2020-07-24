import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import SelectionPage from './pages/SelectionPage/SelectionPage';
import RobotInfoPage from './pages/RobotInfoPage/RobotInfoPage';

import robotsService from './utils/robotsService';

class App extends Component {

  state = {
    robots: [
      /*
      {
        "movies": [
            {"title": "Wall-E", "link": "https://www.imdb.com/title/tt0910970/", "releaseYear": "2008"}
        ],
        "books": [],
        "games": [],
        "actors": [
            {
              "name": "Ben Burtt",
              "link": "https://www.imdb.com/name/nm0123785/?ref_=tt_cl_t1"
            }
        ],
        "_id": "5f14ae311e2231e17881c743",
        "name": "Wall-E",
        "height": {
          "feet": 0,
          "inches": 18
        },
        "manufacturer": "Buy n Large Corporation",
        "categories": ["Pixar", "Friendly", "Animated"],
        "tvShows" : [],
        "approved": true,
        "imageLandscape": "https://cdn.vox-cdn.com/thumbor/DUP2JhIEkY0yvu0RLcy34ipj6Z0=/0x0:1200x808/1200x800/filters:focal(475x111:667x303)/cdn.vox-cdn.com/uploads/chorus_image/image/55061015/wall_ecover.0.jpg",
        "imagePortrait": "https://img3.akspic.ru/image/21806-robot-atmosfera-sammit-piksar-film-1080x1920.jpg",
        "createdAt": "2020-07-19T20:33:53.168Z",
        "updatedAt": "2020-07-19T20:33:53.168Z",
        "__v": 0
    }
    */
    ],
    selRobot: {},
    robotsToShow: [],
    selCategory: "All",
    selCulture: "All Pop-Culture",
    robotsOfHoveredCategory: []
  }

  async componentDidMount() {
    //grab all the robots from the database
    const robots = await robotsService.index();
    console.log(robots);
    //set them to state
    this.setState({ robots });
    //filter robots to show (only the approved at this time)
    this.filterRobots();
  }

  //function called to filter the robots in the robotsToShow property
  filterRobots() {
    //initialize an array
    let robotsToShow = [];
    //filter through all the robots
    for (var robot of this.state.robots) {
      //filter through its categories
      for (var category of robot.categories) {
        //if the category matches the selected category value (and the robot is approved)
        if (((robot.approved && category === this.state.selCategory) 
        // OR if the selected category value is set to "ALL" (and the robot is approved)
        || (robot.approved && this.state.selCategory === "All")) 
        // AND the robot is not already in the array
        && !robotsToShow.includes(robot)) {
          // then check if the selected culture value is set to "All Pop-Culture"
          if (this.state.selCulture === "All Pop-Culture" 
          // or we are on "Movies" and the robot has at least one movie
          || (this.state.selCulture === "Movies" && robot.movies.length > 0) 
          // or we are on "Books" and the robot has at least one book
          || (this.state.selCulture === "Books" && robot.books.length > 0) 
          // or we are on "TV Shows" and the robot has at least one TV show
          || (this.state.selCulture === "TV shows" && robot.tvShows.length > 0) 
          // or we are on "Games" and the robot has at least one game
          || (this.state.selCulture === "Games" && robot.games.length > 0)) {
            //push the robot into the array
            robotsToShow.push(robot);
          }
        }
      }
    }
    //sort the robots by name
    robotsToShow.sort((robot1, robot2) => (robot1.name > robot2.name) ? 1 : ((robot2.name > robot1.name) ? -1 : 0)); 
    //set the array of robots to show to state
    this.setState({ robotsToShow });
  }

  // handles click on a robot link
  handleRobotSelection = (robot) => {
    this.setState({ selRobot: robot });
  }

  // handles change in the pop-culture selector
  handleCultureSelection = e => {
    this.setState({selCulture: e.target.value}, 
      //immediately filter robots as a callback function 
      //for a re-render of robots on the selection page
      () => this.filterRobots());
  }

  // handles change in the category selector
  handleCategorySelection = e => {
    let selCategory;
    // this will be used when selecting from the drop-down menu
    if (e.target.value) selCategory = e.target.value;
    // this will be used when clicking on a category link from within a robot page
    else selCategory = e.target.textContent;
    //immediately filter robots as a callback function 
    //for a re-render of robots on the selection page
    this.setState({ selCategory }, () => this.filterRobots());
  }

  handleHoverCategory = e => {
    const hoveredCategory = e.target.textContent;
    const categoryRobots = this.state.robots.filter((robot) => robot.categories.includes(hoveredCategory));
    this.setState({ robotsOfHoveredCategory: categoryRobots });
  }

  render() {
    return( 
    <div className="App">
        <Route exact path="/" render={ props =>
          <LandingPage {...props} robots={this.state.robots} handleLandingPageRobotClick={this.handleLandingPageRobotClick}/>
        } />
        <Route path="/robots" render={ props =>
          <SelectionPage 
            {...props} 
            robots={this.state.robots} 
            robotsToShow={this.state.robotsToShow}
            selCategory={this.state.selCategory}
            selCulture={this.state.selCulture}
            handleRobotSelection={this.handleRobotSelection}
            handleCultureSelection={this.handleCultureSelection}
            handleCategorySelection={this.handleCategorySelection}
          />
        } />
        <Route exact path="/robots/:id" render={ props =>
          <RobotInfoPage 
            {...props} 
            robots={this.state.robots}
            selRobot={this.state.robots.find((robot) => robot._id === props.match.params.id)}
            robotsOfHoveredCategory={this.state.robotsOfHoveredCategory}
            handleCategorySelection={this.handleCategorySelection}
            handleHoverCategory={this.handleHoverCategory}
          />
        } />
    </div>
    )
  }
}

export default App;
