const { Pool } = require('pg');
const pool = new Pool();

const connect = async () => {
  try {
    await pool.connect();
  } catch (error) {
    console.error(error);
  }
};
connect();

module.exports = {
  async query(queryString, params) {
    try {
      const results = await pool.query(queryString, params);
      return results;
    } catch (error) {
      console.error('PG: Error in query', {queryString}, error);
    }
  }
};
