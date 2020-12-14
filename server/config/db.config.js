const mysql = require('mysql2');

const dbConnect = mysql.createConnection({
  host: process.env.db_HOST,
  user: process.env.db_USER,
  password: process.env.db_PASSWORD,
  database: process.env.db_NAME,
  port: process.env.db_PORT
});

dbConnect.connect(error => {
  if (error) throw error;
  console.log('Database Connected Successfully!!!');
});

module.exports = dbConnect;