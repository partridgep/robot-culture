import React, { Component } from 'react';
import './AddRobotPage.css';
import { Link } from 'react-router-dom';

import AddName from '../../components/AddName/AddName';
import AddManufacturer from '../../components/AddManufacturer/AddManufacturer';
import AddHeight from '../../components/AddHeight/AddHeight';
import AddMedia from '../../components/AddMedia/AddMedia';
import AddImages from '../../components/AddImages/AddImages';
import AddCategories from '../../components/AddCategories/AddCategories';

import robotsService from '../../utils/robotsService';

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
        console.log('next page');
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

    handleEnter = e => {
        // if user hits Enter
        if (e.keyCode === 13) {
            this.handleSubmit();
        }
    }

    handlePrevious = () => {
        const addProcess = this.state.addProcess - 1;
        this.setState({addProcess});
    }

    handleFinalSubmit = async () => {
        const newRobot = {
            name: this.state.name,
            height: this.state.height,
            manufacturer: this.state.manufacturer,
            movies: this.state.movies,
            books: this.state.books,
            tvShows: this.state.tvShows,
            games: this.state.games,
            actors: this.state.actors,
            imageLandscape: this.state.imageLandscape,
            imagePortrait: this.state.imagePortrait,
            categories: this.state.categories,
            approved: this.state.approved
        };
        console.log(newRobot);
        const robots = await robotsService.create(newRobot);
        console.log(robots);
        this.handleSubmit();
        this.props.updateRobots(robots);
    }

    
    render() {
        return (
            <div className='AddRobotPage'>
                <div className='AddRobotPage-progressBarFill' 
                        style={{width: `${this.state.addProcess*10}%`}}
                />
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
                {this.state.addProcess > 0 && <h2 onClick={this.handlePrevious} className='AddRobotPage-prev'>{"< Previous"}</h2>}
                {this.state.addProcess > 0 && <Link to="/robots"><h2 className='AddRobotPage-X'>X</h2></Link>}
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
                        handleEnter={this.handleEnter}
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
                {this.state.addProcess === 8 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter Images for {this.state.name}</h1>     
                    <AddImages 
                        {... this.props} 
                        name={this.state.name}
                        imageLandscape={this.state.imageLandscape}
                        imagePortrait={this.state.imagePortrait} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleSkip={this.handleSkip}
                        handleEnter={this.handleEnter}
                        >
                    </AddImages>
                    </div>
                }
                {this.state.addProcess === 9 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Enter Categories for {this.state.name}</h1>     
                    <AddCategories 
                        {... this.props} 
                        name={this.state.name}
                        categories={this.state.categories}
                        addProcess={this.state.addProcess} 
                        handleChange={this.handleChange}
                        handleFinalSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddCategories>
                    </div>
                }
                {this.state.addProcess === 10 &&
                    <div className='AddRobotPage-last'>
                        {this.state.approved ?
                        <h1 className='AddRobotPage-title AddRobotPage-thankYou'>Thank you, {this.state.name} has been added to the database.</h1>
                        :
                        <h1 className='AddRobotPage-title AddRobotPage-thankYou'>Thank you, {this.state.name} has been submitted for approval.</h1>
                        }
                        <Link to='/robots' className='AddRobotPage-link'>Home</Link>    
                    </div>
                }
                </div>
        );
    }
}

export default AddRobotPage;