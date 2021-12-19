const { createOrUpdateCourierInDataBase } = require('../db/methods');
const { logger } = require('../logger');

async function createOrUpdateCourier(req, res, next) {
  const { id, max_capacity } = req.body;

  try {
    const result = await createOrUpdateCourierInDataBase(id, max_capacity);
    res.status(req.method === 'POST' ? 201 : 200).send(result);
    logger.info({
      resonse_sent: {
        status: req.method === 'POST' ? 201 : 200,
        body: result,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrUpdateCourier };
