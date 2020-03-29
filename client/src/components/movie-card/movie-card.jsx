import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from react - router - dom;

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <Card style={{ width: '16rem' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};