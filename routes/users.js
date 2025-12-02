const router = require("express").Router();
const { get } = require("mongoose");
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userID", getUser);
router.post("/", createUser);

module.exports = router;
