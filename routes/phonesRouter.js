const { Router } = require('express');
const { pagination } = require('../middleware');
const { phoneController } = require('../controllers');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(pagination.paginatePhone, phoneController.getAllPhones);

module.exports = phonesRouter;
