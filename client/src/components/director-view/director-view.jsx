import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import "./director-view.scss";

// Director

function DirectorView(props) {
  const { movies } = props;
  if (!movies || !movies.length) return null;

  const movie = movies.find((movie) => movie.Director.name);

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="director-card">
            <div className="movie-director">
              <h2 className="director-title">Director Info</h2>
              <div className="director-name">
                <span className="label">Name: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="director-bio">
                <span className="label">Biography: </span>
                <span className="value">{movie.Director.Bio}</span>
              </div>
              <div className="director-dob">
                <span className="label">BirthDate: </span>
                <span className="value">{movie.Director.Birth}</span>
              </div>
            </div>
            <Link to={"/"}>
              <Button>Back</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(({ movies }) => ({ movies }))(DirectorView);

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string,
    Bio: PropTypes.string,
  }),
};
