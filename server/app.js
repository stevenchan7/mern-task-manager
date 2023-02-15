// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

// routes
app.get('/', (req, res) => {
  res.send('Hello Worlddddddd');
});

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
