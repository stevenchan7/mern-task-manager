import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function TaskMonth() {
  const { month } = useParams();
  const [taskMonth, setTaskMonth] = useState([]);

  async function getTaskMonth() {
    try {
      const res = await axios.get(`/api/tasks/${month}`);
      setTaskMonth(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle delete button
  const handleButtonDelete = async (e, taskId) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/tasks/delete', {
        taskId: taskId,
      });
      // If delete success call getTaskMonth again so data will get updated
      if (res.data.data) getTaskMonth();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTaskMonth();
  }, []);

  return (
    <Container>
      {taskMonth &&
        taskMonth.map((task) => {
          return (
            <Row key={task._id}>
              <Col>
                <p>{task.taskName}</p>
              </Col>
              <Col>
                <p>{task.taskDue}</p>
              </Col>
              <Col>
                <p>{task.date.slice(0, 10)}</p>
              </Col>
              <Col>
                <button type='button' onClick={(e) => handleButtonDelete(e, task._id)}>
                  Delete
                </button>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
}
