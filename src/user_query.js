const dbConn = require('./db_connection');

const getUser = (id, cb) => {
  dbConn.query('SELECT * from users WHERE id = $1;', [id], (error, data) => {
    if (error) cb(error);
    else cb(null, data.rows[0]);
  });
};

const getUsers = (cb) => {
  dbConn.query('SELECT * from users;', (error, data) => {
    if (error) cb(error);
    else cb(null, data.rows);
  });
};

const deleteUser = (id, cb) => {
  dbConn.query('DELETE FROM users WHERE id = $1;', [id], (error, data) => {
    if (error) cb(error);
    else cb(null, data.rows[0]);
  });
};

const createUser = (user, cb) => {
  const query = 'INSERT INTO users ("firstName", "lastName", age, type) VALUES ($1, $2, $3, $4);';
  dbConn.query(query, [user.firstName, user.lastName, user.age, user.type], (error, data) => {
    if (error) cb(error);
    else cb(null, data.rows);
  });
};

const updateUser = (user, cb) => {
  const query = 'UPDATE users SET "firstName"=$1, "lastName"=$2, age=$3, type=$4 WHERE id = $5;';
  dbConn.query(query, [user.firstName, user.lastName, user.age, user.type, user.id], (error, result) => {
    if (error) cb(error);
    else cb(null, result);
  });
};


module.exports = {
  getUser,
  getUsers,
  deleteUser,
  createUser,
  updateUser,
};
