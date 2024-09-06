const { Router } = require('express');
const { customerController } = require('./../controllers');
const { validation, pagination } = require('../middleware');

const customersRouter = Router();

customersRouter
  .route('/')
  .post(validation.validateCustomerOnCreate, customerController.createCustomer)
  .get(pagination.paginateCustomer, customerController.getAllCustomers);

customersRouter
  .route('/:id')
  .get(customerController.getCustomerById)
  .patch(
    validation.validateCustomerOnUpdate,
    customerController.updateCustomerById
  )
  .delete(customerController.deleteCustomerById);

customersRouter
  .route('/:id/phones')
  .get(customerController.getPhonesByCustomerId);

module.exports = customersRouter;
