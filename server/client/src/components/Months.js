import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MonthList() {
  const [uniqueMonth, setUniqueMonth] = useState([]);
  const [err, setErr] = useState('');

  async function getUniqueMonth() {
    try {
      const res = await axios.get('/api/tasks/availmonths');
      console.log(res.data);
      setUniqueMonth(res.data.data);
    } catch (err) {
      // console.log(err.response.data.message);
      setErr(err.response.data.message);
    }
  }

  useEffect(() => {
    getUniqueMonth();
  }, []);

  return (
    <div className='m-3'>
      <ul>
        {uniqueMonth &&
          uniqueMonth.map((month) => {
            return (
              <li>
                <Link to={`/months/${month}`}>{month}</Link>{' '}
              </li>
            );
          })}
      </ul>
      <h1>{err}</h1>
    </div>
  );
}
