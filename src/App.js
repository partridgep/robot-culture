import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import SelectionPage from './pages/SelectionPage/SelectionPage';
import RobotInfoPage from './pages/RobotInfoPage/RobotInfoPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserPage from './pages/UserPage/UserPage';
import AddRobotPage from './pages/AddRobotPage/AddRobotPage';

import robotsService from './utils/robotsService';
import userService from './utils/userService';
import UpdatesPage from './pages/UpdatesPage/UpdatesPage';

class App extends Component {

  state = {
    robots: [],
    selRobot: {},
    robotsToShow: [],
    filteredRobots: [],
    selCategory: "All",
    selCulture: "All Pop-Culture",
    robotsOfHoveredCategory: [],
    search: "",
    user: userService.getUser(),
  }

  async componentDidMount() {
    this.getRobots();
  }

  getRobots = async () => {
    //grab all the robots from the database
    const robots = await robotsService.index();
    console.log(robots);
    //set them to state
    this.setState({ robots });
    //filter robots to show (only the approved at this time)
    this.filterRobots();
  }

  // async componentDidUpdate() {
  //   this.getRobots();
  // }

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
          || (this.state.selCulture === "TV Shows" && robot.tvShows.length > 0) 
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
    // create duplicate array of filtered robots for search optimization
    this.setState({ robotsToShow, filteredRobots: robotsToShow });
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

  // handles hover over categories on robot info page
  handleHoverCategory = e => {
    // grab category name
    const hoveredCategory = e.target.textContent;
    // find all robots from category
    const categoryRobots = this.state.robots.filter((robot) => (robot.categories.includes(hoveredCategory)) && robot.approved);
    // set state of category robots
    this.setState({ robotsOfHoveredCategory: categoryRobots });
  }

  handleChange = e => {
    // get search value
    let search = e.target.value;
    console.log(search.toLowerCase());

    // set state of search value
    this.setState({ search });
    // if the search query is empty quit function (show all filtered robots)
    if (search === "") {
      this.filterRobots();
      return;
    };

    // initialize array of robots to show
    let robotsToShow = [];
    // iterate through array of filtered robots in state
    for (var robot of this.state.filteredRobots) {
      //console.log(robot.name.toLowerCase());
      //console.log(robot.name.toLowerCase().includes(search.toLowerCase()));
      // if name includes letters in search query, add robot to array
      if (robot.name.toLowerCase().includes(search.toLowerCase())) {
        robotsToShow.push(robot);
        }
      else {
        // iterate through robot's categories
        for (var category of robot.categories) {
          // if category name includes letters in search query
          // add to array if it is not already in it
          if (category.toLowerCase().includes(search.toLowerCase()) && !robotsToShow.includes(robot)) {
            robotsToShow.push(robot);
          }
        }
      }
    }

    //display robots that match search query
    this.setState({ robotsToShow });
  }

  // handles submit of search bar
  handleSubmit = e => {
      // Prevent Page Refresh
      e.preventDefault();
  }

  handleAddToFavorites = async id => {
    const robots = await robotsService.update(id, this.state.user._id);
    this.setState({ robots });
  }

  handleApproval = async id => {
    const robots = await robotsService.approve(id);
    await this.setState({ robots });
    this.filterRobots();
  }

  handleDelete = async id => {
    const robots = await robotsService.deleteRobot(id);
    console.log('deleted robot');
    console.log(robots);
    await this.setState({ robots });
    console.log('set state for robots:');
    console.log(robots);
    this.filterRobots();
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  updateRobots = (robots) => {
    this.setState({ robots });
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
            search={this.state.search}
            user={this.state.user}
            handleRobotSelection={this.handleRobotSelection}
            handleCultureSelection={this.handleCultureSelection}
            handleCategorySelection={this.handleCategorySelection}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleLogout={this.handleLogout}
          />
        } />
        <Route exact path="/robots/:id" render={ props =>
          <RobotInfoPage 
            {...props} 
            robots={this.state.robots}
            selRobot={this.state.robots.find((robot) => robot._id === props.match.params.id)}
            robotsOfHoveredCategory={this.state.robotsOfHoveredCategory}
            user={this.state.user}
            handleCategorySelection={this.handleCategorySelection}
            handleHoverCategory={this.handleHoverCategory}
            handleAddToFavorites={this.handleAddToFavorites}
          />
        } />
        <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        <Route exact path='/user' render={ props =>
          <UserPage 
            {...props} 
            user={this.state.user}
            robots={this.state.robots}
            handleRobotSelection={this.handleRobotSelection}
          />
        }/>
        <Route exact path='/admin' render={ props =>
          <UpdatesPage 
            {...props} 
            user={this.state.user}
            robots={this.state.robots}
            handleRobotSelection={this.handleRobotSelection}
            handleApproval={this.handleApproval}
            handleDelete={this.handleDelete}
          />
        }/>
        <Route exact path='/new-robot' render={ props =>
          <AddRobotPage 
            {...props} 
            user={this.state.user}
            robots={this.state.robots}
            updateRobots={this.updateRobots}
          />
        }/>
        <Route exact path='/icon' render={ props =>
          <div ><p style={{height: '100vh'}}> </p></div>
        }/>
    </div>
    )
  }
}

export default App;
