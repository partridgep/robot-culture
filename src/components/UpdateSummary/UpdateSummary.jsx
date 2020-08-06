import React from 'react';
import styles from './UpdateSummary.module.css';
import '../../pages/UpdatesPage/UpdatesPage.css';

import ApprovalButtons from '../ApprovalButtons/ApprovalButtons';

import robotsService from '../../utils/robotsService';

// APPROVAL FUNCTIONS TO BE PASSED DOWN TO APPROVAL BUTTONS

async function approveChange(robot, update, updateRobots, idx) {
    const robots = await robotsService.approveChange(robot._id, update, idx);
    updateRobots(robots);
}

async function denyChange(robot, update, updateRobots, idx) {
    const robots = await robotsService.denyChange(robot._id, update, idx);
    updateRobots(robots);
}

async function approveRemoval(robot, update, updateRobots, idx) {
    const robots = await robotsService.approveRemoval(robot._id, update, idx);
    updateRobots(robots);
}


function getUpdates(robot, updateRobots) {
    // initialize value for list of all updates
    let allUpdates;

    // initialize empty array of items to add to <ul>
    let updates = [];
    // iterate through each robot's updates
    for (let i=0; i < robot.updates.length; i++) {

        let update = robot.updates[i];
    
        // add paragraph corresponding to update
        if (update.name) {
            updates.push(
            <div className={styles.changeRow} key={update.name}>
                <p>{"Name: "+robot.name+" => "+update.name}</p>
                <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={update} idx={i} updateRobots={updateRobots}/>
            </div>
            )
        }
        if (update.manufacturer) {
            updates.push(
            <div className={styles.changeRow} key={update.manufacturer}>
                <p key={update.manufacturer}>{"Manufacturer: "+robot.manufacturer+" => "+update.manufacturer}</p>
                <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={update} idx={i} updateRobots={updateRobots}/>
            </div>
            )
        }
        if (update.height) {
            updates.push(
                <div className={styles.changeRow} key={update.height.feet}>
                    <p>{"Height: "+robot.height.feet+" feet, "+robot.height.inches+ " inches => "+update.height.feet+" feet, "+update.height.inches+" inches"}</p>
                    <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={update} idx={i} updateRobots={updateRobots}/>
                </div>
            )
        }
        if (update.movies) {
            // for each movie in update, see if already in robot's movies
            for (let movie of update.movies) {
                if (!robot.movies.some(oldMovie => oldMovie.link === movie.link)) {
                    // add paragraph if new
                    updates.push(
                        <div className={styles.changeRow} key={movie.link}>
                            <p>New Movie: <a href={movie.link}>{movie.title} ({movie.releaseYear})</a></p>
                            <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={{movies: [movie]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                } 
            }
            // then compare each movie in robot's array to update movies
            for (let oldMovie of robot.movies) {
                // if one is missing, mark it as having been deleted
                if (!update.movies.some(movie => movie.link === oldMovie.link)) {
                    updates.push(
                        <div className={styles.changeRow} key={oldMovie.link}>
                            <p>Deleted Movie: <a href={oldMovie.link}>{oldMovie.title} ({oldMovie.releaseYear})</a></p>
                            <ApprovalButtons approveChange={approveRemoval} denyChange={denyChange} robot={robot} update={{movies: [oldMovie]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                } 
            }
        }
        if (update.books) {
            for (let book of update.books) {
                // for each book in update, see if already in robot's books
                if (!robot.books.some(oldBook => oldBook.link === book.link)) {
                    // add paragraph if new
                    updates.push(
                        <div className={styles.changeRow} key={book.link}>
                            <p key={book.link}>New Book: <a href={book.link}>{book.title}</a></p>
                            <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={{books: [book]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                }
            }
            // then compare each book in robot's array to update book
            for (let oldBook of robot.books) {
                if (!update.books.some(book => book.link === oldBook.link)) {
                    // if one is missing, mark it as having been deleted
                    updates.push(
                        <div className={styles.changeRow} key={oldBook.link}>
                            <p>Deleted book: <a href={oldBook.link}>{oldBook.title}</a></p>
                            <ApprovalButtons approveChange={approveRemoval} denyChange={denyChange} robot={robot} update={{books: [oldBook]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                } 
            }
        }
        if (update.games) {
            for (let tvShow of update.tvShows) {
                // for each show in update, see if already in robot's shows
                if (!robot.tvShows.some(oldShow => oldShow.link === tvShow.link)) {
                    // add paragraph if new
                    updates.push(
                        <div className={styles.changeRow} key={tvShow.link}>
                            <p>New TV Show: <a href={tvShow.link}>{tvShow.title}</a></p>
                            <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={{tvShows: [tvShow]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                }
            }
            // then compare each show in robot's array to update show
            for (let oldShow of robot.tvShows) {
                if (!update.tvShows.some(tvShow => tvShow.link === oldShow.link)) {
                    // if one is missing, mark it as having been deleted
                    updates.push(
                        <div className={styles.changeRow} key={oldShow.link}>
                            <p>Deleted TV Show: <a href={oldShow.link}>{oldShow.title} ({oldShow.releaseYear})</a></p>
                            <ApprovalButtons approveChange={approveRemoval} denyChange={denyChange} robot={robot} update={{tvShows: [oldShow]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                } 
            }
        }
        if (update.games) {
            for (let game of update.games) {
                // for each game in update, see if already in robot's games
                if (!robot.games.some(oldGame => oldGame.link === game.link)) {
                    // add paragraph if new
                    updates.push(
                        <div className={styles.changeRow} key={game.link}>
                            <p>New Game: <a href={game.link}>{game.title}</a></p>
                            <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={{games: [game]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                }
            }
            // then compare each show in robot's array to update show
            for (let oldGame of robot.games) {
                if (!update.games.some(game => game.link === oldGame.link)) {
                    // if one is missing, mark it as having been deleted
                    updates.push(
                        <div className={styles.changeRow} key={oldGame.link}>
                            <p>Deleted Game: <a href={oldGame.link}>{oldGame.title} ({oldGame.releaseYear})</a></p>
                            <ApprovalButtons approveChange={approveRemoval} denyChange={denyChange} robot={robot} update={{games: [oldGame]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                } 
            }
        }
        if (update.actors) {
            for (let actor of update.actors) {
                // for each actor in update, see if already in robot's actors
                if (!robot.actors.some(oldActors => oldActors.link === actor.link)) {
                    // add paragraph if new
                    updates.push(
                        <div className={styles.changeRow} key={actor.link}>
                            <p key={actor.link}>New Actor: <a href={actor.link}>{actor.name}</a></p>
                            <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={{actors: [actor]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                        )
                }
            }
             // then compare each actor in robot's array to update actor
             for (let oldActor of robot.actors) {
                if (!update.actors.some(actor => actor.link === oldActor.link)) {
                    // if one is missing, mark it as having been deleted
                    updates.push(
                        <div className={styles.changeRow} key={oldActor.link}>
                            <p>Deleted Actor: <a href={oldActor.link}>{oldActor.name}</a></p>
                            <ApprovalButtons approveChange={approveRemoval} denyChange={denyChange} robot={robot} update={{actors: [oldActor]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                } 
            }
        }
        if (update.categories) {
            for (let category of update.categories) {
                // for each category in update, see if already in robot's actors and add if new
                if (!robot.categories.includes(category)) updates.push(
                    <div className={styles.changeRow} key={category}>
                        <p key={category}>New Category: {category}</p>
                        <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={{categories: [category]}} idx={i} updateRobots={updateRobots}/>
                    </div>
                    )
            }
            // then compare each category in robot's array to update 
            for (let oldCategory of robot.categories) {
                if (!update.categories.some(category => category === oldCategory)) {
                    // if one is missing, mark it as having been deleted
                    updates.push(
                        <div className={styles.changeRow} key={oldCategory}>
                            <p key={oldCategory}>Deleted Category: {oldCategory}</p>
                            <ApprovalButtons approveChange={approveRemoval} denyChange={denyChange} robot={robot} update={{categories: [oldCategory]}} idx={i} updateRobots={updateRobots}/>
                        </div>
                    )
                } 
            }
        }
        if (update.imageLandscape && update.imageLandscape !== robot.imageLandscape) {
            updates.push(<div className={styles.imageSection}>
                <img className={styles.landscape} src={robot.imageLandscape} alt="old landscape" /><p>&#8594;</p><img className={styles.landscape} src={update.imageLandscape} alt="new landscape" />
            </div>)
        }
        if (update.imagePortrait && update.imagePortrait !== robot.imagePortrait) {
            updates.push(
                <div className={styles.changeRow} key={update.imagePortrait}>
                    <div className={styles.imageSection}>
                        <img className={styles.portrait} src={robot.imagePortrait} alt="old portrait" /><p>&#8594;</p><img className={styles.portrait} src={update.imagePortrait} alt="new portrait" />
                    </div>
                    <ApprovalButtons approveChange={approveChange} denyChange={denyChange} robot={robot} update={{imagePortrait: update}} idx={i} updateRobots={updateRobots}/>
                </div>
            )
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


const UpdateSummary = ({robot, updateRobots}) => (

        <div key={robot._id} className='UpdatesPage-approvalRow'>
            <div className={styles.summary}>
                <h3>Proposed Changes to {robot.name}</h3>
                {getUpdates(robot, updateRobots)}
            </div>
        </div>
)

export default UpdateSummary;