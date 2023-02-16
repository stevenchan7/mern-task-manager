// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { people } = require('./data');
const { Task } = require('./models/task');

// database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to db...');
  })
  .catch((err) => {
    console.log('Failed to connect', err);
  });

// create app
const app = express();

// middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Hello Worlddddddd');
});

app.get('/people', (req, res) => {
  async function find() {
    try {
      const task = await Task.findById('63ee2363d9cb5df154709c3e', (err, result) => {
        if (!err) {
          return res.status(200).json({ success: true, data: result });
        }
      });
      console.log(task);
    } catch (err) {
      console.log(err.message);
    }
  }
});

app.post('/people', (req, res) => {
  const createTask = async () => {
    try {
      await Task.create(req.body);
    } catch (err) {
      console.log(err.message);
    }
  };
  createTask();

  res.status(201).json({ success: true, data: req.body });
});

app.put('/people/:id', (req, res) => {
  const { newName } = req.body;
  const { id } = req.params;
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = newName;
    }
    return person;
  });
  res.status(201).json({ success: true, data: newPeople });
});

// async function find() {
//   try {
//     const task = await Task.findById('63ee2363d9cb5df154709c3e');
//     console.log(task);
//   } catch (err) {
//     console.log(err.message);
//   }
// }
// find();

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
