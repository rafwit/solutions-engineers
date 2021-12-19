// lines 2-3 needed not to crash the unit tests for courier resolvers
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const mongoose = require('mongoose');
const { Courier } = require('./models');

const {
  DB_NAME,
  BASE_URLS: { MONGO },
} = require('../constants');

async function connectToDataBase() {
  await mongoose.connect(`${MONGO}/${DB_NAME}`);
}

async function createOrUpdateCourierInDataBase(id, maxCapacity) {
  const courier = await Courier.findOneAndUpdate(
    { id },
    { id, max_capacity: maxCapacity },
    {
      new: true,
      upsert: true,
    }
  );

  return courier;
}

module.exports = { connectToDataBase, createOrUpdateCourierInDataBase };
