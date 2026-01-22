const router = require("express").Router();

const { getUsers, createUser, getUserById } = require("../controllers/users");



// Create a user
router.post("/", createUser);

// Get user by ID
router.get("/:userId", getUserById);

module.exports = router;
