const mysql = require('mysql2/promise');
const config = require('../config/dbConfig');

module.exports = async function dbConnect() {
  try {
    return await mysql.createConnection(config);
  } catch (err) {
    throw new Error(err);
  }
};
