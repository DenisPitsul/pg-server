const createError = require('http-errors');
const { Customer } = require('./../models');

module.exports.createCustomer = async (req, res, next) => {
  const { body } = req;

  try {
    const createdCustomer = await Customer.create(body);
    if (!createdCustomer) {
      return res.status(400).send('Something went wrong');
    }
    res.status(201).send(createdCustomer);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllCustomers = async (req, res) => {
  const { pagination } = req;
  try {
    const foundCustomers = await Customer.getAll(pagination);
    res.status(200).send(foundCustomers);
  } catch (err) {
    next(err);
  }
};

module.exports.getCustomerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundCustomer = await Customer.getById(id);
    if (foundCustomer) {
      return res.status(200).send(foundCustomer);
    }
    next(createError(404, `Customer with id ${id} not found`));
  } catch (err) {
    next(err);
  }
};

module.exports.updateCustomerById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const updatedCustomer = await Customer.updateById(id, body);
    if (updatedCustomer) {
      return res.status(200).send(updatedCustomer);
    }
    next(createError(404, `Customer with id ${id} not found`));
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCustomerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await Customer.deleteById(id);
    if (deletedCustomer) {
      return res.status(204).send();
    }
    next(createError(404, `Customer with id ${id} not found`));
  } catch (err) {
    next(err);
  }
};

module.exports.getPhonesByCustomerId = async (req, res, next) => {
  const {
    params: { id },
    query,
  } = req;
  try {
    const foundPhones = await Customer.getPhonesByCustomerId(id, query);
    res.status(200).send(foundPhones);
  } catch (error) {
    next(err);
  }
};
