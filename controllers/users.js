const User = require("../models/user");
const { error } = require("../utils/error");


const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      return res.status(404).send({ message: "Failed to getUsers", e })
    })
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(400).send({ message: "Validation error." });
      }
      return res.status(500).send({ message: "Failed to createUser" });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("UserID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send(user))

    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "NOT_FOUND (404)" });
      }
      if (e.name === "CastError") {
        return res.status(400).send({ message: "BAD_REQUEST (400)" });
      }
      return res.status(500).send({ message: "INTERNAL_SERVER_ERROR (500)" });
    });
};

module.exports = { getUsers, createUser, getUserById };
