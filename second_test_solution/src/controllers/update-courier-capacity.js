const { updateCourierCapacity } = require('../db/methods');
const { logger } = require('../logger');

async function updateCourierAvailableCapacity(req, res, next) {
  const { id } = req.params;
  const { current_load } = req.body;

  try {
    const result = await updateCourierCapacity(id, current_load);

    if (result.not_found) {
      res
        .status(404)
        .send({ message: `Requested courier with id: ${id} not found` });
      logger.info({
        response_sent: {
          status: 404,
        },
      });
    } else if (result.not_possible) {
      res.status(409).send({
        message: `Unable to update load for courier with id: ${id} - max capacity exceeded`,
      });
      logger.info({
        response_sent: {
          status: 409,
        },
      });
    } else {
      res.status(200).send(result);
      logger.info({
        response_sent: {
          status: 200,
          body: result,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { updateCourierAvailableCapacity };
