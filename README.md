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

All robots displayed in the app are stored in a MongoDB database. Upon mounting, the App component accesses the database and stores its robot in state. 

## Setting the Criteria to Show Robots

The robot selection page doesn't just show every robot in the database, but instead it filters them through a set of criteria. Only the robots that fit the criteria will be added to the `RobotsToShow` array in state. For each robot in that array, a link is generated in the form of a button displaying their name and picture on the robot selection page.

The first criteria is *being approved by an admin*.

The second criteria is the pop-culture criteria. By default, it is set to "All Pop-Culture," but as the user specifies the type of pop-culture they wish to narrow their selection by in the drop-down menu, `RobotsToShow` will reflect their specifications.

The third criteria is category. Again, it it set by default to "All," but can be changed by the user in the drop-down menu.

The fourth and last criteria corresponds to the user's search input.  

# Future Enhancemnts

* Admins should be able to delete any robot in the database
* Simplify & improve update robot controller
* Make Robot Culture a WPA