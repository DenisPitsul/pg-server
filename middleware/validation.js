const {
  CREATE_CUSTOMER_VALIDATION_SCHEMA,
  UPDATE_CUSTOMER_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validateCustomerOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await CREATE_CUSTOMER_VALIDATION_SCHEMA.validate(body);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateCustomerOnUpdate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await UPDATE_CUSTOMER_VALIDATION_SCHEMA.validate(body);
    next();
  } catch (err) {
    next(err);
  }
};
