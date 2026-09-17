import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/config.js";
import User from "../models/user.js";
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import ConflictError from '../errors/ConflictError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  
  // Only require email/password if either is provided (Sprint 13 flow)
  // Sprint 12 flow (name/avatar only) should still succeed
  
  const userData = { name, avatar };
  if (email) userData.email = email;
  if (password) userData.password = password;

  User.create(userData)
    .then((user) => {
      const response = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      };
      return res.status(201).send(response);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000 || (err.keyPattern && err.keyPattern.email)) {
        return next(new ConflictError("An account with this email already exists"));
      }
      if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided for user creation"));
      }
      return next(err);
    });
};
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return next(err);
  });
};

const getCurrentUser = (req, res, next) => {
  const  userId  = req.user._id;

  User.findById(userId)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("No user found");
      }
       return res.status(200).send(userData);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("The id string is in an invalid format"))
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user found with matching ID");
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
      return  next(new BadRequestError("The id string is in an invalid format"))
      }
      return  next(err);     
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, avatar }, { new: true, runValidators: true })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("No user found with matching ID");
      }
      return res.status(200).send(userData);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("The id string is in an invalid format"))
      }
      return next(err);      
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      return res.status(200).send({ token });
    })
    .catch((err) => {
  console.error('LOGIN ERROR:', err.message);
  return next(new UnauthorizedError("Incorrect email or password"));
    });
};

export { createUser, getUsers, getCurrentUser, getUserById, updateUser, login };