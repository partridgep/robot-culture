import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import SelectionPage from './pages/SelectionPage/SelectionPage';
import RobotInfoPage from './pages/RobotInfoPage/RobotInfoPage';

class App extends Component {

  state = {
    robots: [],
    selRobot: {}
  }

  render() {
    return( 
    <div className="App">
      <Switch>
        <Route exact path="/" render={ props =>
          <LandingPage {...props} robots={this.state.robots} />
        } />
        <Route exact path="/robots" render={ props =>
          <SelectionPage {...props} />
        } />
        <Route exact path="/robots/:id" render={ props =>
          <RobotInfoPage {...props} />
        } />
      </Switch>
    </div>
    )
  }

}

export default App;
