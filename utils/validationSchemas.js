const yup = require('yup');

const FIRST_NAME_VALIDATION_SCHEMA = yup.string().trim().min(2).max(32);
const LAST_NAME_VALIDATION_SCHEMA = yup.string().trim().min(2).max(32);
const EMAIL_VALIDATION_SCHEMA = yup.string().email();
const TEL_VALIDATION_SCHEMA = yup
  .string()
  .matches(/^\+\d{12}$/, 'Tel must be like + XX XXX XXX XX XX');

module.exports.CREATE_CUSTOMER_VALIDATION_SCHEMA = yup.object({
  firstName: FIRST_NAME_VALIDATION_SCHEMA.required(),
  lastName: LAST_NAME_VALIDATION_SCHEMA.required(),
  email: EMAIL_VALIDATION_SCHEMA,
  tel: TEL_VALIDATION_SCHEMA,
});

module.exports.UPDATE_CUSTOMER_VALIDATION_SCHEMA = yup.object({
  firstName: FIRST_NAME_VALIDATION_SCHEMA,
  lastName: LAST_NAME_VALIDATION_SCHEMA,
  email: EMAIL_VALIDATION_SCHEMA,
  tel: TEL_VALIDATION_SCHEMA,
});
