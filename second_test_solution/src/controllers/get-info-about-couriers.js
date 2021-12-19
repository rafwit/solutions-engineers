const { getCouriersWithMinCapacity } = require('../db/methods');

async function getInfoAboutCouriers(req, res, next) {
  const { capacity_required } = req.query;

  try {
    const result = await getCouriersWithMinCapacity(capacity_required);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getInfoAboutCouriers };
