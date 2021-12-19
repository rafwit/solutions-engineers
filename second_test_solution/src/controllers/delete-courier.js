const { deleteCourierFromDataBase } = require('../db/methods');
const { logger } = require('../logger');

async function deleteCourier(req, res, next) {
  const { id } = req.body;
  try {
    const result = await deleteCourierFromDataBase(id);
    const { deletedCount } = result;
    const resStatus = deletedCount === 1 ? 200 : 204;

    res.status(resStatus).end();
    logger.info({
      response_sent: {
        status: resStatus,
      },
      deleted_courier_id: id,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { deleteCourier };
