const { Phone } = require('../models');

module.exports.getAllPhones = async (req, res) => {
  const { pagination } = req;

  try {
    const foundPhones = await Phone.getAll(pagination);
    res.status(200).send(foundPhones);
  } catch (err) {
    next(err);
  }
};
