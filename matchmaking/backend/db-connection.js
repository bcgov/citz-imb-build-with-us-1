const { Pool } = require('pg');
const pool = new Pool();

const connect = async () => {
  try {
    await pool.connect();
  } catch (error) {
    console.error('PG: Error in pool connection', error);
  }
};
connect();

module.exports = {
  async query(queryString, params) {
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      console.error('PG: Error in query', {queryString}, error);
    }
  }
};
