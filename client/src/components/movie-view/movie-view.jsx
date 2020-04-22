import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
//import Image from "react-bootstrap/Image"; //This link was not here in the April 6th video and I am unsure what to do with it now?
import { Link } from "react-router-dom";

import "./movie-view.scss";

function MovieView({ movie }) {
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
                src={movie.Image}
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
                <span className="value">{movie.Genre.name}</span>
              </div>
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director.name}</span>
              </div>
              <div className="buttons-container">
                <Link to={"/"}>
                  <Button variant="primary" className="back-button">
                    Go Back
                  </Button>
                </Link>
                <Link to={"/genres/" + movie.Genre.name}>
                  <Button variant="link">Genre</Button>
                </Link>
                <Link to={"/directors/" + movie.Director.name}>
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
