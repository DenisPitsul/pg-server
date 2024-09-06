const { Pool } = require('pg');

const connectionOptions = {
  user: 'postgres',
  host: 'localhost',
  database: 'phones_sales',
  password: 'postgres',
  port: 5432,
};

const pool = new Pool(connectionOptions);

process.on('beforeExit', () => pool.end());

// pool
//   .query('SELECT CURRENT_DATE')
//   .then(res => console.log('1. res.rows[0]:', res.rows[0]))
//   .catch(err => console.log('err:', err));

// pool.query('SELECT CURRENT_DATE', (err, res) => {
//   if (!err) {
//     console.log('2. res.rows[0]:', res.rows[0]);
//   }
// });

// (async function () {
//   try {
//     const res = await pool.query('SELECT CURRENT_DATE');
//     console.log('3. res.rows[0]:', res.rows[0]);
//   } catch (err) {
//     console.log('err: ', err);
//   }
// })();

// pool
//   .query('SELECT * FROM users')
//   .then(res => console.log('res:', res.rows))
//   .catch(err => console.log('err:', err));

// const id = 1;
// (async () => {
//   try {
//     const user = await pool.query(`
//       SELECT *
//       FROM users
//       WHERE id = ${id}
//     `);
//     console.log('user.rows[0]:', user.rows[0]);
//   } catch (err) {
//     console.log('err:', err);
//   }
// })();

// (async () => {
//   try {
//     const user = await pool.query(
//       `
//       SELECT *
//       FROM users
//       WHERE id = $1
//     `,
//       [id]
//     );
//     console.log('user.rows[0]:', user.rows[0]);
//   } catch (err) {
//     console.log('err:', err);
//   }
// })();

// const firstName = 'Petro2';
// const lastName = 'Petrenko2';
// (async () => {
//   try {
//     const user = await pool.query(
//       `
//       SELECT *
//       FROM users
//       WHERE first_name = $1 AND last_name = $2
//     `,
//       [firstName, lastName]
//     );
//     console.log('user.rows[0]:', user.rows[0]);
//   } catch (err) {
//     console.log('err:', err);
//   }
// })();

// const user_id = 1;
// const created_at = '2024-09-03';
// (async () => {
//   try {
//     const user = await pool.query(
//       `
//       INSERT INTO orders (user_id, created_at)
//       VALUES ($1, $2)
//       RETURNING *
//     `,
//       [user_id, created_at]
//     );
//     console.log('user.rows[0]:', user.rows[0]);
//   } catch (err) {
//     console.log('err:', err);
//   }
// })();

class User {
  static async create ({ firstName, lastName, email, tel }) {
    try {
      const insertQuery = `
        INSERT INTO users (first_name, last_name, email, tel)
        VALUES ('${firstName}', '${lastName}', '${email}', '${tel}')
        RETURNING *
      `;
      const createdCustomer = await pool.query(insertQuery);
      return createdCustomer.rows[0];
    } catch (err) {
      console.log('err:', err);
    }
  }
  static getAll ({ limit, offset }) {}
  static getById (id) {}
  static updateById (id, { firstName, lastName, email, tel }) {}
  static deleteById (id) {}
}

const newUser = {
  firstName: 'Test',
  lastName: 'Testovich',
  email: 'mail100@gmail',
  tel: '+380123456780',
};

const createdUser = User.create(newUser).then(data =>
  console.log('Created user:', data)
);
