const env = require('env2');
const fs = require('fs');

env('./config.env');

const dbConn = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/init_database.sql`).toString();

const generate = function () {
  dbConn.query(sql, (error) => { if (error) throw error; });
};

module.exports = generate();
