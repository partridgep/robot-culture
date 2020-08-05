import React from 'react';
import styles from './UpdateSummary.module.css';
import '../../pages/UpdatesPage/UpdatesPage.css';

function getUpdates(robot) {
    let allUpdates;
    let updates = [];
    for (var update of robot.updates) {
        console.log(update);
        for (let key of Object.keys(update)) {
            if (key === 'name') {
                updates.push(<p>{"Name: "+robot.name+" => "+update.name}</p>)
            }
            if (key === 'manufacturer') {
                updates.push(<p>{"Manufacturer: "+robot.manufacturer+" => "+update.manufacturer}</p>)
            }
            if (key === 'height') {
                updates.push(<p>{"Height: "+robot.height.feet+" feet, "+robot.height.inches+ " inches => "+update.height.feet+" feet, "+update.height.inches+" inches"}</p>)
            }
            if (key === 'movies') {
                for (var movie of update.movies) {
                    if (!robot.movies.includes(movie)) 
                    updates.push(<p>New Movie: <a href={movie.link}>{movie.title} ({movie.releaseYear})</a></p>)
                }
            }
            if (key === 'books') {
                for (var book of update.books) {
                    if (!robot.books.includes(book)) updates.push(<p>New Book: <a href={book.link}>{book.title}</a></p>)
                }
            }
            if (key === 'tvShows') {
                for (var tvShow of update.tvShows) {
                    if (!robot.tvShows.includes(tvShow)) updates.push(<p>New TV Show: <a href={tvShow.link}>{tvShow.title}</a></p>)
                }
            }
            if (key === 'games') {
                for (var game of update.games) {
                    if (!robot.games.includes(game)) updates.push(<p>New Game: <a href={game.link}>{game.title}</a></p>)
                }
            }
            if (key === 'actors') {
                for (var actor of update.actors) {
                    if (!robot.actors.includes(actor)) updates.push(<p>New Actor: <a href={actor.link}>{actor.name}</a></p>)
                }
            }
            if (key === 'categories') {
                for (var category of update.categories) {
                    if (!robot.categories.includes(category)) updates.push(<p>New Category: {category.name}</p>)
                }
            }
            if (key === 'imageLandscape') {
                updates.push(<div>
                    <img src={robot.imageLandscape} alt="old landscape" /> to <img src={update.imageLandscape} alt="new landscape" />
                </div>)
            }
            if (key === 'imagePortrait') {
                updates.push(<div>
                    <img src={robot.imagePortrait} alt="old portrait" /> to <img src={update.imagePortrait} alt="new portrait" />
                </div>)
            }
        }
    }

    allUpdates = (
        <ul className={styles.listOfUpdates}>
            {updates.map(update => {
                return update
            })}
        </ul>
    )

    return allUpdates;

}


const UpdateSummary = ({robot}) => (

        <div key={robot._id} className='UpdatesPage-approvalRow'>
            <div className={styles.summary}>
                <h3>Proposed Changes to {robot.name}</h3>
                {getUpdates(robot)}
            </div>
        </div>
)

export default UpdateSummary;