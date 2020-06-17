import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from "../../actions/actions";

import MovieList from "../movie-list/movie-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
      // localStorage.setItem('user', this.state.user);
    }
  }

  /**
    * Logged in submits Get request for movie list
    * @function getMovies
    * @param {number} token
    * @returns {array} movies
    */

  getMovies(token) {
    axios
      .get("https://stark-harbor-92573.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
        // this.setState({
        // movies: response.data,
      })
      // })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
* Info sent to Post from LoginView
* @function onLoggedIn
* @param {object} authData from LoginView
* @returns {state}
* @returns {localStorage}
*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    localStorage.setItem("favorites", authData.user.FavoriteMovies);
    this.getMovies(authData.token);
  }
  onLogOut() {
    this.setState({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  render() {
    let { movies } = this.props;
    let { user } = this.state;
    // if (!movies) return <div className='main-view' />;
    return (
      <Router basename="/client">
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return <MovieList movies={movies} />;
            }}
          />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <MovieView
                  movie={movies.find(
                    (movie) => movie._id === match.params.movieId
                  )}
                />
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => (
              <DirectorView
                movie={movies.find(
                  (movie) => movie.Director.Name === match.params.name
                )}
              />
            )}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => (
              <GenreView
                movie={movies.find(
                  (movie) => movie.Genre.Name === match.params.name
                )}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #4
export default connect(mapStateToProps, { setMovies })(MainView);
