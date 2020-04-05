import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter, movies } = state;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = filteredMovies.filter(m => m.title.toLowerCase().includes(visibilityFilter));
    }

    return { movies: filteredMovies };
};

function MovieList(props) {
    const { movies } = props;

    if (!movies) {
        return <div><p>... please stand-by... loading</p></div>;
    }

    return (
        <Row>
            {movies.map(movie => {
                return (
                    <Col key={movie._id} xs={12} sm={6} md={4}>
                        <MovieCard
                            key={movie._id}
                            value={movie._id}
                            movie={movie}
                            addFavorites={movieId => this.addToFavorites(movieId)} />
                    </Col>
                );
            })
            }
        </Row>
    )
}

export default MovieList;