const { Pool } = require('pg');
const Customer = require('./customer');
const Phone = require('./phone');

const connectionOptions = {
  user: 'postgres',
  host: 'localhost',
  database: 'phones_sales',
  password: 'postgres',
  port: 5432,
};

const pool = new Pool(connectionOptions);
pool.connect(err => {
  if (!err) {
    console.log('DB connection OK');
  }
});

process.on('beforeExit', () => pool.end());

Customer.pool = pool;
Phone.pool = pool;

module.exports = { Customer, Phone };
