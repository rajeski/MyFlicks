import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        // Call the superclass constructor
        // so React can initialize it
        super();
        // Initialize the state to an empty object so we can destructure it later
        this.state = { movies: null, selectedMovie: null };
    }
    // One of the "hooks" available in a React Component

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    componentDidMount() {
        axios
            .get('https://stark-harbor-92573.herokuapp.com/movies')
            .then(response => {
                console.log(response.data);
                // Assign the result to the state
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    // onMovieClick(movie) {
    //     this.setState({
    //         selectedMovie: movie
    //     });
    // }

    render() {
        // If the state isn't initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies, selectedMovie } = this.state;
        // Before the movies have been loaded
        if (!movies) return <div className='main-view' />;
        return (
            <div className='main-view'>
                {selectedMovie ? <MovieView movie={selectedMovie} onClick={movie => this.onMovieClick(movie)} /> :
                    movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))}
            </div>
        );
    }
}

getMovies(token) {
    axios.get('https://stark-harbor-92573.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}