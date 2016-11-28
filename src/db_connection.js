const Pool = require('pg').Pool;
const url = require('url');

const DB_URL = process.env.DB_LIVEURL ? process.env.DB_LIVEURL : process.env.DB_URL;
if (!DB_URL) throw new Error('Environment variable DB_URL must be set');

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
};

if (username) options.user = username;
if (password) options.password = password;
options.ssl = (options.host !== 'localhost');

module.exports = new Pool(options);
