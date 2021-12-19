// lines 2-3 needed not to crash the unit tests for courier resolvers
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const mongoose = require('mongoose');
const { Courier } = require('./models');

const {
  DB_NAME,
  BASE_URLS: { MONGO },
} = require('../constants');
const { isLoadPossible } = require('../utils');

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
      overwrite: true,
    }
  );

  return courier;
}

async function deleteCourierFromDataBase(id) {
  const result = await Courier.remove({ id }, { single: true });

  return result;
}

async function getCouriersWithMinCapacity(expectedCapacity) {
  const result = await Courier.find({
    max_capacity: { $gte: expectedCapacity },
  });

  return result;
}

async function updateCourierCapacity(id, newLoad) {
  const courier = await Courier.findOne({ id });
  if (!courier) {
    return { not_found: true };
  }

  const {
    current_load: currentLoadBeforeNewLoad,
    max_capacity: maxCourierLoad,
  } = courier;

  if (!isLoadPossible(currentLoadBeforeNewLoad, newLoad, maxCourierLoad)) {
    return { not_possible: true };
  }

  const updatedCourier = await Courier.findOneAndUpdate(
    { id },
    {
      current_load: currentLoadBeforeNewLoad || 0 + newLoad,
    }
  );

  return updatedCourier;
}

module.exports = {
  connectToDataBase,
  createOrUpdateCourierInDataBase,
  deleteCourierFromDataBase,
  getCouriersWithMinCapacity,
  updateCourierCapacity,
};
