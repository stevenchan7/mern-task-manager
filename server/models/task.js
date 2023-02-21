const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDue: {
      type: String,
      required: true,
    }, // Date but for now let it be string
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
