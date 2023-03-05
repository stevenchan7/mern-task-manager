import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
axios.defaults.withCredentials = true;

export default function HomePage() {
  const [getData, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [taskName, setTaskName] = useState('');
  const [taskDue, setTaskDue] = useState('');
  const [taskType, setTaskType] = useState('');
  const [errDelete, setErrDelete] = useState('');
  const [errSubmit, setErrSubmit] = useState('');
  const Navigate = useNavigate();

  // getTask function
  async function getTask() {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setData(response.data.data); //response.data is not the actual data array, response.data.data is...
    } catch (err) {
      console.log(err.message);
      Navigate('/login');
    }
  }

  useEffect(() => {
    getTask();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        taskName: taskName,
        taskDue: taskDue,
        taskType: taskType,
        date: startDate,
      });
      // if post success, call getTask again to update the list
      if (res.data.data) getTask();
    } catch (err) {
      console.log(err);
    }
  };

  const handleButtonDelete = async (e, taskId) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks/delete', {
        taskId: taskId,
      });

      if (res.data.data) getTask();
    } catch (err) {
      console.log(err);
    }
  };

  const handleButtonLogout = () => {
    axios
      .post('/api/auth/logout')
      .then((res) => {
        if (res.data.message) Navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid className='d-flex justify-content-center align-items-center'>
      <Container className='my-3'>
        <nav className='text-end'>
          <Button type='button' variant='link' onClick={handleButtonLogout}>
            Log Out
          </Button>
        </nav>
        <Form onSubmit={handleFormSubmit} className='my-3'>
          <Row style={{ margin: 'auto' }}>
            <Col sm={12}>
              <Form.Group className='mb-3'>
                <Form.Label>
                  <h3>Task</h3>
                </Form.Label>
                <Form.Control
                  type='text'
                  name='taskName'
                  id='taskName'
                  placeholder='Enter task'
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group className='mb-3'>
                <Form.Label>
                  <h3>Due Date</h3>
                </Form.Label>
                <Form.Control //Will change this later
                  type='text'
                  name='taskDue'
                  id='taskDue'
                  placeholder='Enter due: dd-mm-yy'
                  onChange={(e) => setTaskDue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group className='mb-3'>
                <Form.Select onChange={(e) => setTaskType(e.target.value)}>
                  <option>Task Type</option>
                  <option value='income'>Income</option>
                  <option value='expense'>Expense</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <DatePicker
                className='mb-3'
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Col>
            <Col>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col className='my-3'>
            <h3>Recent Submit</h3>
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
                    <Col>
                      <p>{task.taskType}</p>
                    </Col>
                    <Col>
                      <p>{task.date.slice(0, 10)}</p>
                    </Col>
                    {/* Delete button */}
                    <Col>
                      <button type='button' onClick={(e) => handleButtonDelete(e, task._id)}>
                        Delete
                      </button>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>

        <Link to='/months'>Months</Link>
      </Container>
    </Container>
  );
}
