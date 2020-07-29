import React, { Component } from 'react';
import './AddRobotPage.css';
import AddName from '../../components/AddName/AddName';
import AddManufacturer from '../../components/AddManufacturer/AddManufacturer';

class AddRobotPage extends Component {

    state = {
        approved: false,
        name: '',
        imageLandscape: '',
        imagePortrait: '',
        movies: [],
        books: [],
        games: [],
        tvShows: [],
        height: {},
        manufacturer: '',
        actors: [],
        categories: [],
        addProcess: 0
    }

    handleChange = (e) => {
        console.log(e.target.name);
        this.setState({
          // Using ES2015 Computed Property Names
          [e.target.name]: e.target.value
        });
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        const addProcess = this.state.addProcess + 1;
        this.setState({addProcess});
      }

      handleSkip = () => {
        const addProcess = this.state.addProcess + 1;
        this.setState({addProcess});
      }
    
    render() {
        return (
            <div className='AddRobotPage'>
                {this.state.addProcess === 0 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter New Robot Name</h1>     
                    <AddName 
                        {... this.props} 
                        addProcess={this.state.addProcess} 
                        name={this.state.name}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        >
                    </AddName>
                    </div>
                }
                {this.state.addProcess === 1 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter Robot Manufacturer</h1>     
                    <AddManufacturer 
                        {... this.props} 
                        addProcess={this.state.addProcess} 
                        manufacturer={this.state.manufacturer}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        >
                    </AddManufacturer>
                    </div>
                }
            </div>
        );
    }
}

export default AddRobotPage;