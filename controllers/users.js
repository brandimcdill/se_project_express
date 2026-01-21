const User = require("../models/user");
// Import ERROR_TYPES from your utils
const { ERROR_TYPES } = require("../utils/error");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      // Uses 500: INTERNAL_SERVER_ERROR
      res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
         .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, e });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user)) // 201 is standard for "Created"
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const err = new Error(ERROR_TYPES.NOT_FOUND.message);
      err.statusCode = ERROR_TYPES.NOT_FOUND.statusCode;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      // Handle CastError (invalid ID format) or 404 from orFail()
      if (e.name === "CastError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      if (e.statusCode === ERROR_TYPES.NOT_FOUND.statusCode) {
        return res.status(e.statusCode).send({ message: e.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
};

module.exports = { getUsers, createUser, getUserById };
