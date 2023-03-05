// import modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const connectDB = require('./config/db');
const { Task } = require('./models/task');
const verifyToken = require('./middlewares/authJwt');
const checkDuplicateUsernameOrEmail = require('./middlewares/verifySignUp');
const { signIn, signUp, signOut } = require('./controllers/auth.controller');
require('dotenv').config();

// create app
const app = express();

// middlewares
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cookie session
app.use(
  cookieSession({
    name: 'steven-session',
    secret: 'COOKIE_SECRET',
    httpOnly: true,
  })
);

// routes
app.post('/api/auth/register', checkDuplicateUsernameOrEmail, signUp);

app.post('/api/auth/login', signIn);

app.post('/api/auth/logout', signOut);

app.get('/api/tasks', verifyToken, async (req, res) => {
  find();
  async function find() {
    try {
      const tasks = await Task.find({ userId: req.userId }).sort('-createdAt').limit(5);
      return res
        .status(200)
        .json({ success: true, data: tasks, token: req.session.token, userId: req.userId });
    } catch (err) {
      console.log(err.message);
    }
  }
});

app.post('/api/tasks', verifyToken, async (req, res) => {
  createTask();
  async function createTask() {
    try {
      const task = await Task.create({
        taskName: req.body.taskName,
        taskDue: req.body.taskDue,
        taskType: req.body.taskType,
        date: req.body.date,
        userId: req.userId,
      });
      res.status(200).json({ success: true, data: task });
    } catch (err) {
      console.log(err);
    }
  }
});

app.post('/api/tasks/delete', verifyToken, (req, res) => {
  Task.deleteOne({ _id: req.body.taskId }, (err, result) => {
    if (err) return res.status(400).json({ message: err });
    // deleteOne return an object with deletedCount property
    if (result.deletedCount > 0) return res.status(200).json({ data: result.deletedCount });
  });
});

app.get('/api/tasks/availmonths', verifyToken, (req, res) => {
  // Find all but select only createdAt field
  Task.find({}, '-_id date', (err, data) => {
    if (err) return res.status(400).json({ success: false, message: err });
    if (data.length === 0)
      return res.status(400).json({ success: false, message: 'No task available' });
    // Get only the year and the month from full date
    const months = data.map((date) => {
      return date.date.slice(0, 7);
    });
    // Remove duplicate
    const uniquemonths = [...new Set(months)];

    res.status(200).json({ success: true, data: uniquemonths });
  });
});

app.get('/api/tasks/:month', verifyToken, async (req, res) => {
  find();
  async function find() {
    try {
      const tasks = await Task.find({
        userId: req.userId,
        date: { $regex: '.*' + req.params.month + '.*', $options: 'i' },
      });
      const tasksIn = await Task.find({
        userId: req.userId,
        date: { $regex: '.*' + req.params.month + '.*', $options: 'i' },
        taskType: 'income',
      });
      const tasksEx = await Task.find({
        userId: req.userId,
        date: { $regex: '.*' + req.params.month + '.*', $options: 'i' },
        taskType: 'expense',
      });
      if (!tasks) {
        return res.status(400).json({ success: false, message: 'No task this month' });
      }
      res
        .status(200)
        .json({ success: true, data: { all: tasks, income: tasksIn, expense: tasksEx } });
    } catch (err) {
      console.log(err.message);
    }
  }
});

// PRODUCTION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running');
  });
}

// port
const port = process.env.PORT || 5000;

// database and listen
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
