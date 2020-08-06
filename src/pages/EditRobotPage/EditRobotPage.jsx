import React, { Component } from 'react';
import '../AddRobotPage/AddRobotPage.css';
import './EditRobotPage.css';
import { Link } from 'react-router-dom';

import AddName from '../../components/AddName/AddName';
import AddManufacturer from '../../components/AddManufacturer/AddManufacturer';
import AddHeight from '../../components/AddHeight/AddHeight';
import AddMedia from '../../components/AddMedia/AddMedia';
import AddImages from '../../components/AddImages/AddImages';
import AddCategories from '../../components/AddCategories/AddCategories';

import robotsService from '../../utils/robotsService';

let editPartNames = ["name", "manufacturer", "height", "movies", "books", "tvShows", "games", "actors", "images", "categories"];

class EditRobotPage extends Component {

    state = {
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
        approved: false,
        editPart: 0,
        robot: {}
    }

    async componentDidMount() {
        if (this.props.user && this.props.user.admin) {
            const approved = true;
            this.setState({ approved });
        }
        await this.setState({robot: this.props.selRobot});
        this.getCategoryToUpdate();
        this.getRobotInfo();
    }

    getCategoryToUpdate() {
        this.setState({ editPart: this.props.editPart });
    }

    getRobotInfo() {
        let updatedCategory = editPartNames[this.props.editPart];
        if (updatedCategory === 'images') {
            this.setState({
                imageLandscape: this.props.selRobot.imageLandscape,
                imagePortrait: this.props.selRobot.imagePortrait
            })
        }
        else this.setState({
            [`${updatedCategory}`] : this.props.selRobot[`${updatedCategory}`]
        });
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
            this.handleFinalSubmit();
        }
    }

    handleFinalSubmit = async (e) => {
        if (e) e.preventDefault();
        let updatedFields;
        let updatedCategory = editPartNames[this.props.editPart];
        if (updatedCategory !== 'images') {
            updatedFields = {
                [`${updatedCategory}`] : this.state[`${updatedCategory}`]
            }
        } else {
            updatedFields = {
                imageLandscape: this.state.imageLandscape,
                imagePortrait: this.state.imagePortrait
            }
        }
        console.log(updatedFields);
        const robots = await robotsService.update(this.state.robot._id, updatedFields);
        this.setState({ editPart : 10});
        console.log(robots);
        this.props.updateRobots(robots);
    }

    
    render() {
        return (
            <div className='AddRobotPage'>
                <Link to={this.props.selRobot && "/robots/"+this.props.selRobot._id}><h2 className='AddRobotPage-X'>X</h2></Link>
                {this.state.editPart === 0 &&
                    <div>
                        <h1 className='AddRobotPage-title'>Update Robot Name</h1>     
                        <AddName 
                            {... this.props} 
                            editPart={this.state.editPart} 
                            name={this.state.name}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleFinalSubmit}
                            >
                        </AddName>
                    </div>
                }
                {this.state.editPart === 1 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update Robot Manufacturer</h1>     
                    <AddManufacturer 
                        {... this.props} 
                        editPart={this.state.editPart} 
                        manufacturer={this.state.manufacturer}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddManufacturer>
                    </div>
                }
                {this.state.editPart === 2 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update Robot Height</h1>     
                    <AddHeight 
                        {... this.props} 
                        editPart={this.state.editPart} 
                        height={this.state.height}
                        name={this.state.robot.name}
                        handleClickOption={this.handleClickOption}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleEnter={this.handleEnter}
                        >
                    </AddHeight>
                    </div>
                }
                {this.state.editPart === 3 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update {this.state.name}'s Movies</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.robot.name}
                        movies={this.state.movies}
                        editPart={this.state.editPart} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.editPart === 4 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update {this.state.name}'s Books</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        books={this.state.books}
                        editPart={this.state.editPart} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.editPart === 5 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update {this.state.name}'s TV Shows</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        tvShows={this.state.tvShows}
                        editPart={this.state.editPart} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.editPart === 6 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update {this.state.name}'s Games</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        games={this.state.games}
                        editPart={this.state.editPart} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.editPart === 7 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update the Actors for {this.state.name}</h1>     
                    <AddMedia 
                        {... this.props} 
                        name={this.state.name}
                        actors={this.state.actors}
                        editPart={this.state.editPart} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddMedia>
                    </div>
                }
                {this.state.editPart === 8 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update Images for {this.state.name}</h1>     
                    <AddImages 
                        {... this.props} 
                        name={this.state.name}
                        imageLandscape={this.state.imageLandscape}
                        imagePortrait={this.state.imagePortrait} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleEnter={this.handleEnter}
                        >
                    </AddImages>
                    </div>
                }
                {this.state.editPart === 9 &&
                    <div>
                    <h1 className='AddRobotPage-title'>Update Categories for {this.state.name}</h1>     
                    <AddCategories 
                        {... this.props} 
                        name={this.state.name}
                        categories={this.state.categories}
                        editPart={this.state.editPart} 
                        handleChange={this.handleChange}
                        handleFinalSubmit={this.handleFinalSubmit}
                        handleSkip={this.handleSkip}
                        handleChooseOption={this.handleChooseOption}
                        handleClickOption={this.handleClickOption}
                        >
                    </AddCategories>
                    </div>
                }
                {this.state.editPart === 10 &&
                    <div className='AddRobotPage-last'>
                        {this.state.approved ?
                        <h1 className='AddRobotPage-title AddRobotPage-thankYou'>Thank you, {this.state.robot.name} has been updated.</h1>
                        :
                        <h1 className='AddRobotPage-title AddRobotPage-thankYou'>Thank you, this update for {this.state.robot.name} has been submitted for approval.</h1>
                        }
                        <Link to={'/robots/'+this.state.robot._id} className='AddRobotPage-link'>Home</Link>    
                    </div>
                }
                </div>
        );
    }
}

export default EditRobotPage;