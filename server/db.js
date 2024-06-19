
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  database: 'INVENTORYSYSTEM',
  password: 'masterkey_2233#',
  port: 5432,
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connected successfully');
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});
module.exports = pool;
