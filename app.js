require("dotenv").config();
const express = require("express");
const initializeDatabase = require("./util/db-connection");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

initializeDatabase((err, db) => {
  if (err) throw err;

  app.use("/users", userRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
