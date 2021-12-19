const { updateCourierCapacity } = require('../db/methods');

async function updateCourierAvailableCapacity(req, res, next) {
  const { id } = req.params;
  const { current_load } = req.body;

  try {
    const result = await updateCourierCapacity(id, current_load);

    if (result.not_found) {
      res
        .status(404)
        .send({ message: `Requested courier with id: ${id} not found` });
    }

    if (result.not_possible) {
      res.status(409).send({
        message: `Unable to update load for courier with id: ${id} - max capacity exceeded`,
      });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { updateCourierAvailableCapacity };
