# App Project Scope

## Table of Contents
- [Project Site](#project-site)
- [Project Approach](#project-approach)
- [Technology & App Infrastructure](#tech-infrastructure)
- [Code Organisation](#code-org)


## Project Site
Heroku Page: https://sleepy-taiga-92579.herokuapp.com/

## Project Scope
This project involves building a book e-commerce platform. BE requirements include:

- **Routes for managing user accounts**: create, edit and get user accounts/ information

- **Routes for managing authentication requests**: log in, log out and session management

- **Routes for managing book**: get routes for different views: viewing by categories, by individual book, by search requests, by relevance. There are also routes to update book data upon every purchase, and routes to receive new book reviews from registered and logged in users

Since it is an e-commerce platform, most routes are GET, with a few PUT and POST ones to handle checkout and reviews. No DELETE routes would be needed unless there is an admin site built for the administrator of the e-commerce platform

## Technology & App Infrastructure

**Tech Stack**: 
- MongoDB: no-SQL database
- ExpressJS: NodeJS framework for the app backend
- React: for rendering UI components
- NodeJS: JS runtime environment

## Code Organisation

### Javascript

|Folder  |Purpose                                                    |Details|
|--------|-------------------------------------------------------------------|---------------------------------------------------------------------|
|`server.js`| Contains all starting codes to get the server running| This includes (1) Middlewares (2) connection to db and routes|
|`router`| Receive and direct various requests to appropriate controllers| Three types of requests are sent to 3 types of controllers for handling: (1) requests related to books (2) requests related to authentication and (3) requests related to user account/ profile|
|`controllers`| Controllers receive each type of request and assemble relevant services to send back an appropriate response. Thus controllers are the middle layers between services and routers| This includes (1) `accountControllers` (2) `authControllers` (3) `bookControllers`.|
|`services`| Contains code logics that helps transforming raw data into consistent format easily processed by the front-end (e.g. parsing string, parsing time, parsing custom error messages)| This includes (1) `httpResServices` that standardise the format of http responses, (2) `objClassBuilder` which is a utilities to quickly transform any raw data into good format (3) `accountServices`/ `bookServices` receives different types of requests from Controllers and will ensure consistent data format sent to Repo, as well as consistent data structure sent to Controllers (4)`passport` handles Auth requests traffic between Controllers and AuthRepo (5) `passwordValidatorSvc` can be used by controllers to validate passwords received|
|`models`| Contains main models used by the Repo | This includes (1) `User.js` (2) `Book.js`|
|`repositories`| Contains code logics that works directly with the database and assemble relavant data on demand to send to Services in response to Controllers' requests | This includes (1)`authRepositories` that manage requests to create new accounts, log in, log out and verify accounts (2) `accountRepositories` that manage data requests for user's profile, order history or profile updates (3) `bookRepositories` that manage data requests anything related to books|


