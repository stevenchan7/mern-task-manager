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
<<<<<<< HEAD
app.use(express.urlencoded({ extended: false }));
=======
>>>>>>> 780a8d542e21007bd95f9fb5359e249dcd93e625

// routes
app.get('/', (req, res) => {
  res.send('Hello Worlddddddd');
});

app.get('/api/tasks', async (req, res) => {
<<<<<<< HEAD
  find();
=======
>>>>>>> 780a8d542e21007bd95f9fb5359e249dcd93e625
  async function find() {
    try {
      await Task.find({}, (error, result) => {
        if (!error) {
          return res.status(200).json({ success: true, data: result });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }
<<<<<<< HEAD
=======
  find();
>>>>>>> 780a8d542e21007bd95f9fb5359e249dcd93e625
});

app.post('/api/tasks', (req, res) => {
  const createTask = async () => {
    try {
<<<<<<< HEAD
      await Task.create(req.body, (err) => {
        if (err) return handleError(err);
      });
=======
      await Task.create(req.body);
>>>>>>> 780a8d542e21007bd95f9fb5359e249dcd93e625
    } catch (err) {
      console.log(err.message);
    }
  };
  createTask();

<<<<<<< HEAD
  // res.status(201).json({ success: true, data: req.body });
  res.redirect('http://localhost:3000/');
=======
  res.status(201).json({ success: true, data: req.body });
>>>>>>> 780a8d542e21007bd95f9fb5359e249dcd93e625
});

app.put('/api/tasks/:id', (req, res) => {
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
