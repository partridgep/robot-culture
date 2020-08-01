import React, { Component } from 'react';
import './AddRobotPage.css';
import AddName from '../../components/AddName/AddName';
import AddManufacturer from '../../components/AddManufacturer/AddManufacturer';
import AddHeight from '../../components/AddHeight/AddHeight';
import AddMedia from '../../components/AddMedia/AddMedia';

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
        height: {feet: 0, inches: 0},
        manufacturer: '',
        actors: [],
        categories: [],
        addProcess: 0
    }

    componentDidMount() {
        if (this.props.user && this.props.user.admin) {
            const approved = true;
            this.setState({ approved });
        }
    }

    handleChange = (e) => {
        console.log(e.target.name);
        this.setState({
          // Using ES2015 Computed Property Names
          [e.target.name]: e.target.value
        });
      }
    
    handleSubmit = (e) => {
        if (e) e.preventDefault();
        const addProcess = this.state.addProcess + 1;
        this.setState({addProcess});
    }

    handleSkip = () => {
        const addProcess = this.state.addProcess + 1;
        this.setState({addProcess});
    }

    handleChooseOption = (e, type) => {
        this.setState({
            [type]: e.target.innerText
        });
    }

    handleClickOption = (option, type) => {
        this.setState({
            [type]: option
        })
    }

    handleChooseMediaOption = (array, type) => {
        this.setState({
            [type]: array
        })
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
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddManufacturer>
                    </div>
                }
                {this.state.addProcess === 2 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter Robot Height</h1>     
                    <AddHeight 
                        {... this.props} 
                        addProcess={this.state.addProcess} 
                        height={this.state.height}
                        name={this.state.name}
                        handleClickOption={this.handleClickOption}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        >
                    </AddHeight>
                    </div>
                }
                {this.state.addProcess === 3 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter {this.state.name}'s Movies</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        movies={this.state.movies}
                        addProcess={this.state.addProcess} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.addProcess === 4 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter {this.state.name}'s Books</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        books={this.state.books}
                        addProcess={this.state.addProcess} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.addProcess === 5 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter {this.state.name}'s TV Shows</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        tvShows={this.state.tvShows}
                        addProcess={this.state.addProcess} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.addProcess === 6 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter {this.state.name}'s Games</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        games={this.state.games}
                        addProcess={this.state.addProcess} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.addProcess === 7 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter the Actors for {this.state.name}</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        actors={this.state.actors}
                        addProcess={this.state.addProcess} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                <div className='AddRobotPage-progressBar'>
                    <div className='AddRobotPage-progressBarFill' 
                        style={{width: `${this.state.addProcess*10}%`}}
                    />
                </div>
            </div>
        );
    }
}

export default AddRobotPage;