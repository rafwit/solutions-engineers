/* eslint-disable no-underscore-dangle */
const { createOrUpdateCourierInDataBase } = require('../db/methods');

async function createOrUpdateCourier(req, res, next) {
  const { id, max_capacity } = req.body;

  try {
    const result = await createOrUpdateCourierInDataBase(id, max_capacity);
    res.status(req.method === 'POST' ? 201 : 200).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrUpdateCourier };
