import React from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./genre-view.scss";

// Genre (a single props which returns this element)

function GenreView(props) {
  const history = useHistory();
  const { movies } = props;
  if (!movies || !movies.length) return null;

  const movie = movies.find((movie) => movie.Genre.Name);
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="genre-card">
            <div className="genre-view">
              <h2 className="genre-title">Genre Info</h2>
              <div className="genre-div">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Genre.Description}</span>
              </div>
            </div>
            <Button onClick={() => history.goBack()}>Back</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

/**
 * Genre information (code block which returns the requested information)
 * @function GenreView
 * @param {string} props - movie.genre
 * @returns {Container} - Genre
 */

export default connect(({ movies }) => ({ movies }))(GenreView);

GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};
