import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  // Navigate to home page if logged changed
  useEffect(() => {
    if (registered) Navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/auth/register',
        {
          username: username,
          password: password,
          email: email,
        },
        { withCredentials: true }
      );

      if (res.data.message) setRegistered(true); // set logged to true to trigger useEffect
    } catch (err) {
      // console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <Container fluid className='d-flex justify-content-center align-items-center'>
      <Container className='my-3'>
        <Form onSubmit={handleSubmit} className='mb-3'>
          <Row style={{ margin: 'auto' }}>
            <Col sm={12}>
              <Form.Group className='mb-3' controlId='formBasicText'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  id='formUsername'
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  id='formEmail'
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  id='formPassword'
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
          <Link to='/login'>Login Page</Link>
        </div>
      </Container>
    </Container>
  );
}
