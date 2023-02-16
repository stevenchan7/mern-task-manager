const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDue: String,
});

module.exports = { taskSchema };
