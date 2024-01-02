// connection
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rehma123.',
  database: 'Myproject',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection using the promise-based approach
pool.promise()
  .query('SELECT 1 + 1 AS result')
  .then(([rows]) => {
    console.log('Database connection has been established successfully.');
    console.log('Result of the test query:', rows[0].result);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Export the pool for use in other parts of your application
module.exports = pool.promise(); // Using promise wrapper for async/await syntax