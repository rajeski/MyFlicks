import { Route, BrowserRouter as Router } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import React from 'react';
import { RegistrationView } from '../registration-view/registration-view';
import axios from 'axios';
export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null,
        };
    }
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
            });
            this.getMovies(accessToken);
        }
    }
    getUser(token) {
        let username = localStorage.getItem('user');
        const userURL = 'https://stark-harbor-92573.herokuapp.com/users/';
        axios
            .get(userURL + username, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                this.props.setLoggedInUser(response.data);
                this.setState({
                    username: response.data.Username,
                    email: response.data.Email,
                    birthdate: response.data.BirthDate.substr(0, 10),
                    favoriteMovies: response.data.favoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getMovies(token) {
        axios
            .get('https://stark-harbor-92573.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }
    onLogOut() {
        this.setState({ user: null });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    render() {
        const { user } = this.state;
        const { movies } = this.props;
        // if (!movies) return <div className='main-view' />;
        return (
            <div className='main-view'>
                <Router basename='/client'>
                    {/* <Navbar bg='dark' variant='dark'>
            <Link to={'/'}>
              <Navbar.Brand className='main-title'>MyFlix</Navbar.Brand>
            </Link>
            <Nav className='mr-auto'></Nav>
            {user && (
              <div>
                <Link to={'/profile'}>
                  <Button variant='link'>Profile</Button>
                </Link>
                <Link to='/'>
                  <Button onClick={() => this.onLogOut()}>Log Out</Button>
                </Link>
              </div>
            )}
          </Navbar>
          <Container className='container'> */}
                    <Route
                        exact
                        path='/'
                        render={() => {
                            if (!user) {
                                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            }
                            return <MoviesList movies={movies} />;
                        }}
                    />
                    <Route
                        exact
                        path='/register'
                        render={() => {
                            return <RegistrationView />;
                        }}
                    />
                    <Route
                        exact
                        path='/movies/:movieId'
                        render={({ match }) => {
                            return <MovieView movieId={match.params.movieId} />;
                        }}
                    />
                    <Route
                        exact
                        path='/genres/:name'
                        render={({ match }) => {
                            return <GenreView movie={match.params.name} />;
                        }}
                    />
                    <Route
                        exact
                        path='/directors/:name'
                        render={({ match }) => {
                            return <DirectorView movie={match.params.name} />;
                        }}
                    />
                    <Route
                        exact
                        path='/profile'
                        render={() => {
                            return <ProfileView />;
                        }}
                    />
                    <Route
                        exact
                        path='/update'
                        render={() => {
                            return <UpdateView />;
                        }}
                    />
                    {/* </Container> */}
                </Router>
            </div>
        );
    }
}