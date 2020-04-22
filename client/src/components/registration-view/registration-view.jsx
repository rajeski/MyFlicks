import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://stark-harbor-92573.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("Success. Please log in");
        window.open("/client", "_self"); // Open in current tab
      })
      .catch((error) => {
        console.log(
          "Registration error. Username must be a minimum of five characters in length"
        );
        return alert(
          "Registration failure. Please select a username with a minimum of 5 characters"
        );
      });
  };

  return (
    <Container className="registrationForm">
      <Card className="registration-card">
        <h2 className="registration-title">Register</h2>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="emailShare">
              Your personal information will never be shared!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Sign-up
          </Button>
          <Form.Text className="text-muted">
            Existing user? Log-in <Link to={"/"}>CLICK</Link>
          </Form.Text>
        </Form>
      </Card>
    </Container>
  );
}
