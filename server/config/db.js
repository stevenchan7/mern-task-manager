const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');
  } catch (err) {
    console.log('Failed connecting to DB...');
    g;
  }
};

module.exports = connectDB;
