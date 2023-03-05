import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  // Navigate to home page if logged changed
  useEffect(() => {
    if (logged) Navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      // Navigate to home page if token provided (one way)
      // if (res.data.token) {
      //   Navigate('/');
      // }
      if (res.data.token) setLogged(true); // set logged to true to trigger useEffect
    } catch (err) {
      // console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <Container fluid className='d-flex justify-content-center align-items-center'>
      <Container className='my-3'>
        <Form onSubmit={handleSubmit} className='mb-3'>
          <Row style={{ width: '500px', margin: 'auto' }}>
            <Col sm={12}>
              <Form.Group className='mb-3' controlId='formBasicText'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Row>
        </Form>

        <div className='text-center'>
          <p>{error}</p>
          <Link to='/register'>Register Page</Link>
        </div>
      </Container>
    </Container>
  );
}
