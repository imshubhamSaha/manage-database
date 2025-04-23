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

    // Create the database if it doesn't exist
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

        // Create the user_details table if it doesn't exist
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS user_details (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20)
          )
        `;

        db.query(createTableQuery, (err) => {
          if (err) return callback(err);
          console.log(`Table 'user_details' is ready.`);
          callback(null, db);
        });
      });
    });
  });
};

module.exports = initializeDatabase;
