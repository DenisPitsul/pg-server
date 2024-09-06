class Customer {
  static async create ({ firstName, lastName, email, tel }) {
    try {
      const insertQuery = `
        INSERT INTO customers (first_name, last_name, email, tel)
        VALUES ('${firstName}', '${lastName}', '${email}', '${tel}')
        RETURNING *
      `;
      const createdCustomer = await Customer.pool.query(insertQuery);
      return createdCustomer.rows[0];
    } catch (err) {
      console.log('err:', err);
      throw new Error(err.detail);
    }
  }
  static async getAll ({ limit, offset }) {
    try {
      const selectAllQuery = `
        SELECT *
        FROM customers
        ORDER BY id
        LIMIT ${limit} OFFSET ${offset}
      `;
      const foundCustomers = await Customer.pool.query(selectAllQuery);
      return foundCustomers.rows;
    } catch (err) {
      console.log('err:', err);
      throw new Error(err.detail);
    }
  }
  static async getById (id) {
    try {
      const selectByIdQuery = `
        SELECT *
        FROM customers
        WHERE id = ${id}
      `;
      const foundCustomer = await Customer.pool.query(selectByIdQuery);
      return foundCustomer.rows[0];
    } catch (err) {
      console.log('err:', err);
      throw new Error(err.detail);
    }
  }
  static async updateById (id, { firstName, lastName, email, tel }) {
    try {
      const fields = [];
      const values = [];

      if (firstName) {
        fields.push('first_name');
        values.push(firstName);
      }
      if (lastName) {
        fields.push('last_name');
        values.push(lastName);
      }
      if (email) {
        fields.push('email');
        values.push(email);
      }
      if (tel) {
        fields.push('tel');
        values.push(tel);
      }

      const setString = fields
        .map((field, index) => `${field} = $${index + 1}`)
        .join(', ');
      const updateQuery = `
        UPDATE customers
        SET ${setString}
        WHERE id = $${fields.length + 1}
        RETURNING *
      `;

      const updatedCustomer = await Customer.pool.query(updateQuery, [
        ...values,
        id,
      ]);
      return updatedCustomer.rows[0];
    } catch (err) {
      console.log('err:', err);
      throw new Error(err.detail);
    }
  }
  static async deleteById (id) {
    try {
      const deleteByIdQuery = `
        DELETE 
        FROM customers
        WHERE id = ${id}
        RETURNING *
      `;
      const deletedCustomer = await Customer.pool.query(deleteByIdQuery);
      return deletedCustomer.rows[0];
    } catch (err) {
      console.log('err:', err);
      throw new Error(err.detail);
    }
  }

  static async getPhonesByCustomerId (customerId, { brand }) {
    try {
      const selectPhonesByCustomerIdQuery = `
        SELECT p.id, p.brand, p.model, p.price, p.color, p.manufactured_year
        FROM phones AS p INNER JOIN phones_to_orders AS ptoo ON p.id = ptoo.phone_id
                         INNER JOIN orders AS o ON ptoo.order_id = o.id
                         INNER JOIN customers AS c ON o.customer_id = c.id
        WHERE c.id = ${customerId} ${brand ? `AND p.brand = '${brand}'` : ''}
        ORDER BY p.id
      `;
      const foundPhones = await Customer.pool.query(
        selectPhonesByCustomerIdQuery
      );
      return foundPhones.rows;
    } catch (err) {
      console.log('err:', err);
      throw new Error(er.details);
    }
  }
}

module.exports = Customer;
