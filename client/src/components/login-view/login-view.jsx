import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios
            .post('https://stark-harbor-92573.herokuapp.com/login', {
                Username: username,
                Password: password,
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('User does not exist');
            });
    };
    return (
        <Form>
            <Form.Group controlId='formBasicUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={handleSubmit}>
                Submit
      </Button>
            <Form.Text className='text-muted'>Create a new user account</Form.Text>
        </Form>
    );
}