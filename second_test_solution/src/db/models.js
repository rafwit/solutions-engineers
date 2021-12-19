/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const {
  PROPERTIES_TO_DELETE: { MONGO_ID, MONGOOSE_FLAG },
} = require('../constants');

const courierSchema = mongoose.Schema({
  id: Number,
  max_capacity: Number,
});

courierSchema.set('toJSON', {
  transform(_, ret) {
    delete ret[MONGO_ID];
    delete ret[MONGOOSE_FLAG];
  },
});

const Courier = mongoose.model('Courier', courierSchema);

module.exports = { Courier };
