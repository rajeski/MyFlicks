# Server Side Pro Node

The "MyFlicks" Movie Website Project (including building an API). Part of CareerFoundry's Full-Stack Web Development Course to demonstrate mastery regarding using JavaScript withing MERN stack.

This README provides an overview of the contains technical and content-related details about the server-side and client-side component of a React application called "myFlix". The REST API for "myFlix" is hosted online on Heroku and Netlify (https://distracted-elion-663925.netlify.app/) allowing registered / logged-in users access to information about different movies, directors, and genres. 

The server-side of the application (server, business logic, business layers) uses JavaScript and Node.js including a REST API (custom-created) as part of an architected database built using Express, and MongoDB.

The REST API can be accessed via commonly used HTTP methods (GET, POST, PUT, DELETE). CRUD (Create; Read; Update and/or Delete) is used to retrieve data from the database and store the accessed data in a non-relational way.

Server-side

Features

Allows, existing users; update their user info or delete their account
Allows, existing users; add or remove movies to/from their list of favorites
Allows, new users; create a user account
Allows, users; get detailed information about a director by name
Allows, users; get detailed information about a genre by genre name
Allows, users; get detailed information about a single movie by movie title
Allows, users; view a listing of all movies in the database

Dependencies

Bcrypt
Body-parser
Cors
Express
Express-validator
Jsonwebtoken
Mongoose
Morgan
Passport
Passport-jwt
Passport-local
Uuid

Client-side

Technical Details

The application - 
... single-page application
... uses state routing to navigate between views and share URLs
... allows users option to filter movies
... allows users option to sort movies
... used Parcel as its built tool
... written using React library; ES2015+ and, React Redux
... utilizes Bootstrap as a UI library for styling and responsiveness
... combination of class components and function components
... hosted online: myFlix

Additional Features / Website Improvements - 

1) The current homepage minimalism would benefit from the UX being redesigned
2) The delete favorite movie feature needs to be fully deployed 
3) A minimal number of demo movies are currently only offered in the database
4) An additional layer of API-security is highly recommended 
5) Full-deployment to Heroku is pending 

Demo Access Credentials - 
breakthru 
12345
