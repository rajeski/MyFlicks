import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import axios from "axios";

import "./movie-card.scss";

export const MovieCard = (props) => {
  const [favArray, setFav] = useState([]);

  const { movie } = props;

  const addFavorites = (e) => {
    e.preventDefault();
    const url = "https://stark-harbor-92573.herokuapp.com/users/";
    const user = localStorage.getItem("user");
    const addMovie = `${url}${user}/Movies/${movie._id}`;

    let favArr = localStorage.getItem("favorites");
    let favorites = favArr ? JSON.parse(favArr) : [];

    axios
      .post(
        addMovie,
        {
          Username: user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((event) => {
        console.log("Error adding movie to My Favorites");
      });

    favorites.push(movie._id);

    setFav([...favArray, movie._id]);

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <Card
      className="mb-3 mb-sm-4 movie-card"
      style={{
        width: "16rem",
      }}
    >
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Image src={movie.ImagePath} rounded />
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={"/movies/" + movie._id}>
          <Button variant="link">Open</Button>
        </Link>
        {localStorage.getItem("favorites") &&
        localStorage.getItem("favorites").includes(movie._id) ? (
          <p className="added">Added to My Favorites</p>
        ) : (
          <Button variant="link" value={movie.Title} onClick={addFavorites}>
            Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
