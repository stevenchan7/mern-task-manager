import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MonthList() {
  const [uniqueMonth, setUniqueMonth] = useState([]);
  const [err, setErr] = useState('');

  async function getUniqueMonth() {
    try {
      const res = await axios.get('/api/availmonths');
      console.log(res.data);
      if (res.data.message) setErr(res.data.message);
      setUniqueMonth(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  useEffect(() => {
    getUniqueMonth();
  }, []);

  return (
    <div>
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
      <p>{err}</p>
    </div>
  );
}
