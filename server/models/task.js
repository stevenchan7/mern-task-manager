const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDue: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
