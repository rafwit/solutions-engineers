/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const {
  PROPERTIES_TO_DELETE: { MONGO_ID, MONGOOSE_FLAG },
} = require('../constants');

const courierSchema = mongoose.Schema({
  id: { type: Number, required: true },
  max_capacity: { type: Number, required: true },
  current_load: { type: Number, required: false },
});

// allows to not sending __v and_id mongoose properties back to the client
courierSchema.set('toJSON', {
  transform(_, ret) {
    delete ret[MONGO_ID];
    delete ret[MONGOOSE_FLAG];
  },
});

const Courier = mongoose.model('Courier', courierSchema);

module.exports = { Courier };
