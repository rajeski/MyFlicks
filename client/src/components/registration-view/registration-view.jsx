import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, createUsername] = useState('');
    const [password, createPassword] = useState('');
    const [email, createEmail] = useState('');
    const [birthday, createDob] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post('https://stark-harbor-92573.herokuapp.com/movies', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('Success. Please log in')
                window.open('/', '_self'); // Open in current tab 
            })
            .catch(error => {
                console.log('Registration error. Username must be a minimum of five characters in length')
                return alert('Registration failure. Please select a username with a minimum of 5 characters');
            });
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