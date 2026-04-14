import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/config.js";
import User from "../models/user.js";
import { ERROR_TYPES } from "../utils/error.js";

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  const userData = { name, avatar };

  if (email) {
    userData.email = email;
  }
  if (password) {
    userData.password = password;
  }

  User.create(userData)
    .then((user) => {
      const response = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      };

      if (user.email) {
        response.email = user.email;
      }

      return res.status(201).send(response);
    })
    .catch((e) => {
      if (e.code === 11000) {
        return res.status(ERROR_TYPES.DUPLICATE_LOGIN.statusCode)
                  .send({ message: ERROR_TYPES.DUPLICATE_LOGIN.message });
      }
      if (e.name === "ValidationError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      return next(e);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
      .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message }));
};

const getCurrentUser = (req, res) => {
  const  userId  = req.user._id;
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

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, avatar }, { new: true })
    .orFail(() => {
      const err = new Error(ERROR_TYPES.NOT_FOUND.message);
      err.statusCode = ERROR_TYPES.NOT_FOUND.statusCode;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((e) => {
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

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
              .send({ message: ERROR_TYPES.BAD_REQUEST.message });
  }

  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d", });

    res.send({token});
  })
  .catch(() => {
    res
    .status(ERROR_TYPES.UNAUTHORIZED.statusCode)
    .send({message: ERROR_TYPES.UNAUTHORIZED.message});
  });
};

export { createUser, getUsers, getCurrentUser, getUserById, updateUser, login };