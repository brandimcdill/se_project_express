const user = require("../models/user");
const User = require("../models/user");
// Import ERROR_TYPES from your utils
const { ERROR_TYPES } = require("../utils/error");
const jwt = require('jsonwebtoken');


const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.create({ name, avatar, email, password })
    .then((user) => res.status(201).send(user))
    .catch((e) => {
      if (e.code === 11000) {
      return res.status(ERROR_TYPES.DUPLICATE_LOGIN.statusCode)
                .send({ message: ERROR_TYPES.DUPLICATE_LOGIN.message });
    }
      if (e.name === "ValidationError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    })
     
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
        return res.status(e.statusCode).send({ message: ERROR_TYPES.NOT_FOUND.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
};


module.exports.login = (req, res) => {
  const {email, password } = req.body;

  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d", });
  })
}
