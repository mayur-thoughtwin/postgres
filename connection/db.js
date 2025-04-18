const { Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  database: 'todo',
  password: '1234',
  port: 5432,
  host: 'localhost',
})

const closePool = async () => {
  try {
    await pool.end();
    console.log("Pool closed successfully.");
  } catch (error) {
    console.error("Error while closing the pool:", error);
  }
};
module.exports = { pool, closePool };