import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [getData, setData] = useState([]);

  useEffect(() => {
    getTask();
    async function getTask() {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setData(response.data.data); //response.data is not the actual data array, response.data.data is...
      } catch (err) {
        console.error(err.message);
      }
    }
  }, []);

  console.log(getData);

  return (
    <Container fluid className='d-flex justify-content-center align-items-center'>
      <Container className='my-3'>
        <Row>
          <Col lg={12} className='mb-5'>
            <Form action='http://localhost:5000/api/tasks' method='POST'>
              <Form.Group className='mb-3'>
                <Form.Label>
                  <h3>Task</h3>
                </Form.Label>
                <Form.Control type='text' name='taskName' id='taskName' placeholder='Enter task' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  <h3>Due Date</h3>
                </Form.Label>
                <Form.Control //Will change this later
                  type='text'
                  name='taskDue'
                  id='taskDue'
                  placeholder='Enter due: dd-mm-yy'
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            {getData &&
              getData.map((task) => {
                return (
                  <Row key={task._id}>
                    <Col>
                      <p>{task.taskName}</p>
                    </Col>
                    <Col>
                      <p>{task.taskDue}</p>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </Container>

      {/* <Container>
        {getData &&
          getData.map((task) => {
            return (
              <div>
                <p>{task.taskName}</p>
                <p>{task.taskDue}</p>
              </div>
            );
          })}
      </Container> */}
    </Container>
  );
}

export default App;
