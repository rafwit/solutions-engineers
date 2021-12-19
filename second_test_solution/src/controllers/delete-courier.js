const { deleteCourierFromDataBase } = require('../db/methods');

async function deleteCourier(req, res, next) {
  const { id } = req.body;
  try {
    const result = await deleteCourierFromDataBase(id);
    const { deletedCount } = result;
    const resStatus = deletedCount === 1 ? 200 : 204;

    res.status(resStatus).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { deleteCourier };
