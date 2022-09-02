const mongoose = require('mongoose');

const connectionDB = (url) =>
  mongoose.connect(url, console.log('DB connection successfully..........'));

module.exports = connectionDB;
