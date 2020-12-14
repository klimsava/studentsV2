const mysql = require('mysql2/promise');
const config = require('../config/dbConfig');

async function dbConnect() {
  try {
    return await mysql.createConnection(config);
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = dbConnect