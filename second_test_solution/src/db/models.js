const mongoose = require('mongoose');

const courierSchema = mongoose.Schema({
  id: Number,
  max_capacity: Number,
});

const Courier = mongoose.model('Courier', courierSchema);

module.exports = { Courier };
