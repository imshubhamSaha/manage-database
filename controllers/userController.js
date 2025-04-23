const dbInit = require("../util/db-connection");

let db;
dbInit((err, connection) => {
  if (err) throw err;
  db = connection;
});

// INSERT user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO user_details (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: "Failed to insert user" });
    }
    console.log("User Inserted:", { id: result.insertId, name, email });
    res.status(201).json({ id: result.insertId, name, email });
  });
};

// GET all users
exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM user_details";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    console.log("Users Fetched:", results.length);
    res.json(results);
  });
};

// GET user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM user_details WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User Fetched:", results[0]);
    res.json(results[0]);
  });
};

// UPDATE user by ID
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = "UPDATE user_details SET name = ?, email = ? WHERE id = ?";
  db.query(query, [name, email, id], (err, result) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ error: "Update failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User Updated:", { id, name, email });
    res.json({ id, name, email });
  });
};

// DELETE user by ID
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM user_details WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({ error: "Delete failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User Deleted:", id);
    res.json({ message: `User ${id} deleted successfully` });
  });
};
