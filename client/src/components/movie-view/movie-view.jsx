import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
//import Image from "react-bootstrap/Image"; //This link was not here in the April 6th video and I am unsure what to do with it now?
import { Link, useHistory } from "react-router-dom";

import "./movie-view.scss";

/**
 * Add movie to favorite list
 * @function handleSubmit
 * @param {event} onClick
 * @returns {alert} - movie favorite added 
 */

function MovieView({ movie }) {
  const history = useHistory();
  if (!movie) return null;
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="movie-view-card">
            <div className="movie-view">
              <img
                className="movie-poster"
                style={{ textAlign: "center" }}
                src={movie.ImagePath}
              />
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>

              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="buttons-container">
                <Button
                  onClick={() => history.goBack()}
                  variant="primary"
                  className="back-button"
                >
                  Go Back
                </Button>
                <Link to={"/genres/" + movie.Genre.Name}>
                  <Button variant="link">Genre</Button>
                </Link>
                <Link to={"/directors/" + movie.Director.Name}>
                  <Button variant="link">Director</Button>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export { MovieView };
