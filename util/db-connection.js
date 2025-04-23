require("dotenv").config();
const mysql = require("mysql2");

const dbInit = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const initializeDatabase = (callback) => {
  dbInit.connect((err) => {
    if (err) return callback(err);

    const dbName = process.env.DB_NAME;

    dbInit.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
      if (err) return callback(err);

      const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: dbName,
      });

      db.connect((err) => {
        if (err) return callback(err);
        console.log(`Connected to MySQL Database: ${dbName}`);
        callback(null, db);
      });
    });
  });
};

module.exports = initializeDatabase;
