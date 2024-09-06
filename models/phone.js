class Phone {
  static async getAll ({ limit, offset }) {
    try {
      const selectAllQuery = `
        SELECT *
        FROM phones
        ORDER BY id
        LIMIT ${limit} OFFSET ${offset}
      `;
      const foundPhones = await Phone.pool.query(selectAllQuery);
      return foundPhones.rows;
    } catch (err) {
      console.log('err:', err);
      throw new Error(err.details);
    }
  }
}

module.exports = Phone;
