const express = require("express");
const initializeDatabase = require("./util/db-connection");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
initializeDatabase((err, db) => {
  if (err) {
    console.error("Database initialization failed:", err);
    process.exit(1);
  }

  app.get("/", (req, res) => {
    res.send("app running");
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
