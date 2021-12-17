const mongoose = require('mongoose');
const {
  DB_NAME,
  BASE_URLS: { MONGO },
} = require('../constants');

async function connect() {
  await mongoose.connect(`${MONGO}/${DB_NAME}`);
}

module.exports = { connect };
