const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDue: String, // Date but for now let it be string
  completed: {
    type: Boolean,
    default: false,
  },
});
>>>>>>> 780a8d542e21007bd95f9fb5359e249dcd93e625

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
