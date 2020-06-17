import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import "./director-view.scss";

// Director

function DirectorView(props) {
  const history = useHistory();
  const { movie } = props;
  if (!movie) return null;

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
            <Button onClick={() => history.goBack()}>Back</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

/**
 * Director information 
 * @function DirectorView
 * @param {string} props - movie.director.name props
 * @returns {DirectorView}
 */

export default connect(({ movies }) => ({ movies }))(DirectorView);

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string,
    Bio: PropTypes.string,
  }),
};
