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
  res.status(200).json({ success: true, data: people });
});

app.post('/people', (req, res) => {
  Task.create(req.body);
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

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
