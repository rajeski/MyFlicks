// Rearranged code based on CF-provided examples

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  Movies = Models.Movie,
  Users = Models.User,
  Genres = Models.Genre,
  Directors = Models.Director,
  passport = require('passport'),
  cors = require('cors'),
  { check, validationResult } = require('express-validator');

require('./passport');

// Previous local database connection
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://myFlixDBAdmin:Admin@myflixdb-bfxal.mongodb.net/myFlixDB?retryWrites=true&w=majority', {useNewUrlParser: true});

const app = express();

var allowedOrigins = ['http://localhost:8080', 'http://erinnienhuis.com', 'http://localhost:1234'];

// Cors  
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
})); // Unsure, is Cors Middleware?

// Middleware 

// Logging
app.use(morgan('common'));

// JSON Parsing
app.use(bodyParser.json());

// User Authorization
var auth = require('./auth')(app);

// Static files
app.use(express.static('public'));

// Application Routing 

// Error Handling 
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Uh-oh! Something\'s not right!');
});

// Requests
app.get('/', function(req, res) {
  var responseText = 'Welcome!!!'
  res.send(responseText);
});

// GET Movie list with Director and Genre
app.get('/movies', function(req, res) {
  Movies.aggregate([
    { $lookup:
      {
        from: 'directors',
        localField: 'Director',
        foreignField: '_id',
        as: 'moviedirectordetails'
      }
    },
    { $lookup:
      {
        from: 'genres',
        localField: 'Genres',
        foreignField: '_id',
        as: 'moviegenredetails'
      }
    }
  ])
    .then(function(movies) {
      res.status(201).json(movies);
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// GET Single Movie By Title 
app.get("/movies/:Title", function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
  });

// GET Genre 
app.get("/genres/:Genre", function(req, res) {
  Genres.findOne({ Name : req.params.Genre })
  .then(function(genre) {
    res.json(genre.Description)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

// GET Movie list by Genre
app.get("/movies/genres/:genre", (req, res) => {
  // Search by genre name and return ID

  // Search all movie documents' Genres array for the ID returned above

  // Mongoose callback function
  // Movies.find( { "Genre.Name" : "Thriller" }, function(err, movies) {
    // Logic here
  //} );

  // Mongoose promise function
  // Movies.find( { "Genre.Name" : "Thriller" }).then(function(movies) {
    // Logic here
  //});

  res.send('Under Construction.');
})

// GET Director by Name
app.get("/directors/:Name", function(req, res) {
  Directors.findOne({ Name : req.params.Name })
  .then(function(director) {
    res.json(director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

// ADD Movie Data for New Movie to Movie list 
app.post("/movies", (req, res) => {
//   let newMovie = req.body;
//   if (!newMovie.title) {
//     const message = "Missing title in request body";
//     res.status(400).send(message);
//   } else {
//     newMovie.id = uuid.v4();
//     topMovies.push(newMovie);
//     res.status(201).send(newMovie);
// }'
  res.send('Under Construction.');
});

// DELETE Movie by Title from Movie List
app.delete("/movies/:title", (req, res) => {
  // let movie = topMovies.find((movie) => { return movie.title === req.params.title });
  //
  // if (movie) {
  //   topMovies.filter(function(obj) { return obj.title !== req.params.title });

  // res.status(201).send("Movie " + req.params.title + " was deleted.")
// }
  res.send('Under Construction.');
});

// USERS

// GET All users 
app.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// GET User by Username 
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

// POST Create a New User 
app.post('/users',
  // Validation logic
  [
    check('Username', 'Username cannot have fewer than 5 characters.').isLength({min: 5}),
    check('Username', 'Username may not contain non alphanumeric characters.').isAlphanumeric(),
    check('Password', 'Password is required.').not().isEmpty(),
    check('Email', 'Email must be valid email address.').isEmail()
  ], (req, res) => {
    // Check validation object for errors
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

  // API Post logic
  var hashedPassword = Users.hashPassword(req.body.Password); // Hash password 

  Users.findOne({ Username : req.body.Username }) // Check if user already exists
  .then(function(user) {
    if (user) { // Username already exists
      return res.status(400).send(req.body.Username + "already exists!");
    } else { // Username can be used
      Users
      .create({
        Username: req.body.Username,
        Password: hashedPassword, // Store hashed password
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) }) // Return new 'user' document
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// UPDATE User Information by Username 
app.put("/users/:Username",

// Validation logic
[
  check('Username', 'Username cannot have fewer than 5 characters.').isLength({min: 5}),
  check('Username', 'Username may not contain non alphanumeric characters.').isAlphanumeric(),
  check('Password', 'Password is required.').not().isEmpty(),
  check('Email', 'Email must be valid email address.').isEmail()
], passport.authenticate('jwt', { session: false }), function(req, res) {

  // Check validation object for errors
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // API Post logic
  var hashedPassword = Users.hashPassword(req.body.Password); //Hash the password using the HashPassword from bcrypt, enforced by models.js

  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
    {
      Username : req.body.Username,
      Password : hashedPassword,
      Email : req.body.Email,
      Birthday : req.body.Birthday
    }},
    { new : true }, // Return updated document information 
    function(err, updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// ADD Movie to User Favorites' Movie List 
app.post("/users/:Username/Movies/:MovieID", passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

// DELETE Movie from User Favorites' Movie List
// Validation logic 
app.delete("/users/:Username/Movies/:MovieID", passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $pull : { FavoriteMovies : req.params.MovieID }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

// DELETE User
// Validation logic 
app.delete("/users/:Username", passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndRemove({ Username : req.params.Username })
  .then(function(user) {
    if(!user) {
      res.status(400).send(req.params.Username + " was not found!");
    } else {
      res.status(200).send(req.params.Username + " was deleted!");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port 3000.")
});