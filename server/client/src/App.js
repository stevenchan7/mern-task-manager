import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/MainPage';
import MonthList from './components/Months';
import TaskMonth from './components/TaskMonth';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/months' element={<MonthList />} />
        <Route path='/months/:month' element={<TaskMonth />} />
        {/* <Route path='/months'>
          <Route index element={<MonthList />} />
          <Route path='/month/:month' element={<TaskMonth />} />
        </Route> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
