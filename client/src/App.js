import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [getData, setdata] = useState(null);

  // Should use useEffect
  async function getTask() {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      console.log(response.data);
      // setdata(response.data);
      // console.log(getData);
    } catch (err) {
      console.log(err.message);
    }
  }
  getTask();

  return (
    <Container fluid className='d-flex justify-content-center align-items-center'>
      <Container>
        <Form>
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
      </Container>

      <Container>
        <div>
          {/* {taskData &&
            taskData.map((task) => {
              return (
                <div>
                  <p>task.taskName</p>
                  <p>task.taskDue</p>
                </div>
              );
            })} */}
        </div>
      </Container>
    </Container>
  );
}

export default App;
