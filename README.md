# Robot Culture

A MERN React.js responsive app to access a cloud-deployed database of robots from pop-culture, with CRUD features for signed-in users and admins.

## Getting Started
Click [here](https://robot-culture.herokuapp.com/) to access the app (please allow 20-30 seconds for Heroku to warm up.)

You may find the project planning Trello board at [this link](https://trello.com/b/O7AjDUUq/robot-culture).

## Technologies Used
* React.js
* CSS
* Express
* MongoDB
* Mongoose
* Node
* JWT (JSON Web Tokens)
* Google Fonts
* APIs: [OMDB API](http://omdbapi.com/), [Google Books API](https://developers.google.com/books), [Unofficial IMDb API](https://rapidapi.com/hmerritt/api/imdb-internet-movie-database-unofficial/details)


## ERD

![ERD](https://i.imgur.com/aWqicDC.png)


## Wireframes + Screenshots of Completed Project

*Landing Page:*

![Landing Page](https://i.imgur.com/7DzxjxC.png)

*Robot Selection Page:*

![Robot Selection Page](https://i.imgur.com/RCsBvPh.png)

*Robot Information Page:*

![Robot Information Page](https://i.imgur.com/0YbLPpX.png)

*Adding New Robot Form:*

![Form to Add New Robot](https://i.imgur.com/wzoLhLf.png)

*Login Page:*

![Login Page](https://i.imgur.com/jnIVOyF.png)

*User Page:*

![User Page](https://i.imgur.com/9ZPGxj1.png)

*Admin Page:*

![Admin Page](https://i.imgur.com/GhNn72Z.png)

# Functionality

## Retrieving Robots

All robots displayed in the app are stored in a MongoDB database. Upon mounting, the App.js component accesses the database and stores its robot in state. 

## Setting the Criteria to Show Robots

The robot selection page doesn't just show every robot in the database, but instead it filters them through a set of criteria. Only the robots that fit the criteria will be added to the `RobotsToShow` array in state. For each robot in that array, a link is generated in the form of a button displaying their name and picture on the robot selection page.

The first criteria is *being approved by an admin*.

The second criteria is the pop-culture criteria. By default, it is set to "All Pop-Culture," but as the user specifies the type of pop-culture they wish to narrow their selection by in the drop-down menu, `RobotsToShow` will reflect their specifications.

The third criteria is category. Again, it it set by default to "All," but can be changed by the user in the drop-down menu.

The fourth and last criteria corresponds to the user's search input. The `handleChange` method in App.js will filter through all the robots from a duplicate array of `RobotsToShow` to ensure it is only delivering search results that comply to the other parameters.

![Searh Results](https://i.imgur.com/fnZMeb6.png)
*An example of search results with clear pop-culture and category filters.*

![Search Results + Category Filter](https://i.imgur.com/g4ZJu4t.png)
*Search results against the category filter*

## Displaying a Robot's Details

![Robot Information Page](https://i.imgur.com/L35UuKx.png)

Upon clicking on a robot in the Robot Selection, the user is redirected to the Robot Information page. In state, `SelRobot` becomes the robot that matches the id parameters of the selected robot. From that selected robot in state, the Robot Info page displays whatever details are stored in its database. Below the name at the top, the user will find its image to the right, and a box of further information to the left. 

For any media details, such as movies, TV Shows, books, games, or actors, the user is able to click on each item and be redirected to the appropriate link in a new tab for further exploration. That is because the Media and Actors schemas in the Robot model contain a link component that is rendered as an `href` on the page.

## Exploring Categories

On the Robot Information Page, the user can see which categories the selected robot belongs to. Each category acts as a link that will take the user back to the Robot Selection Page with the corresponding category filters.

However, a significantly more fun way to explore robots of the same category is to hover over each category name and let a list of robots appear. Each robot in this list is then a link to that robot.

![Category Hover Example](https://i.imgur.com/g6Tq9Vi.gif)

## User Authentification

This app utilizes JWTs (JSON Web Tokens) to authentificate users. On the Login Page, new users may sign up, and returning users may log back in. Many features are exclusive to signed-in users, such as favoriting a robot, adding a new robot to the database, or suggesting updates to robots. Furthermore, admin users have extra privileges, such as approving or rejecting new robots and updates to existing robots.

# Future Enhancements

* Admins should be able to delete any robot in the database
* Simplify & improve update robot controller
* Make Robot Culture a WPA