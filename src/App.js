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
      {
        "movies": [
            "Wall-E"
        ],
        "books": [],
        "games": [],
        "actors": [
            "Ben Burtt"
        ],
        "_id": "5f14ae311e2231e17881c743",
        "name": "Wall-E",
        "height": 18,
        "length": 13,
        "width": 15,
        "categories": ["Pixar", "Friendly", "Animated"],
        "approved": true,
        "imageLandscape": "https://cdn.vox-cdn.com/thumbor/DUP2JhIEkY0yvu0RLcy34ipj6Z0=/0x0:1200x808/1200x800/filters:focal(475x111:667x303)/cdn.vox-cdn.com/uploads/chorus_image/image/55061015/wall_ecover.0.jpg",
        "imagePortrait": "https://img3.akspic.ru/image/21806-robot-atmosfera-sammit-piksar-film-1080x1920.jpg",
        "createdAt": "2020-07-19T20:33:53.168Z",
        "updatedAt": "2020-07-19T20:33:53.168Z",
        "__v": 0
    }
    ],
    selRobot: {}
  }

  async componentDidMount() {
    console.log('component did mount');
    const robots = await robotsService.index();
    console.log(robots);
  }

  handleRobotSelection = (robot) => {
    this.setState({ selRobot: robot });
  }

  render() {
    return( 
    <div className="App">
        <Route exact path="/" render={ props =>
          <LandingPage {...props} robots={this.state.robots} />
        } />
        <Route path="/robots" render={ props =>
          <SelectionPage 
            {...props} 
            robots={this.state.robots} 
            handleRobotSelection={this.handleRobotSelection}
          />
        } />
        <Route exact path="/robots/:id" render={ props =>
          <RobotInfoPage 
            {...props} 
            selRobot={this.state.selRobot}
          />
        } />
    </div>
    )
  }

}

export default App;
