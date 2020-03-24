import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './registration-view.scss';
import axios from 'axios'


export function RegistrationView(props) {
    const [username, createUsername] = useState('');
    const [password, createPassword] = useState('');
    const [email, createEmail] = useState('');
    const [birthday, createDob] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, birthday, email);
        // Send authentication request to the server
        props.onLoggedIn(username);
    };

    return (
        <Container className='registrationContainer'>
            <Form className='registrationForm'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => createEmail(e.target.value)} />
                    <Form.Text className='emailShare'>
                        Your personal information will never be shared with any third-party.
          </Form.Text>
                </Form.Group>

                <Form.Group controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={e => createUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Passwordy" value={password} onChange={e => createPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formBasicDob'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="01/01/1985" value={birthday} onChange={e => createDob(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Checking this means you are in good company" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Get started!
        </Button>
                <Button variant='primary' onClick={() => props.onClick()}>
                    Existing user?
        </Button>
            </Form>
        </Container>
    );
}

RegistrationView.propTypes = {
    onSignedIn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};