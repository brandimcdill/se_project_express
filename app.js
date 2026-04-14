import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { createUser, login, getUsers, getUserById } from './controllers/users.js';
import { createItem, getItems, deleteItem, likes, removeLikes } from './controllers/clothingItem.js';
import auth from './middlewares/auth.js';
import { ERROR_TYPES } from "./utils/error.js";
import usersRouter from "./routes/users.js";
import clothingItemRouter from "./routes/clothingItem.js";

const app = express();
app.use(cors());
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
  })
  .catch(console.error);
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "69334f961ea8827c8436170a", // paste the _id of the test user created in the previous step
  };
  next();
});

// Wrap controllers to ensure errors are passed to error handler


app.post('/signin', login);
app.post('/signup', createUser);
app.post('/users', createUser);
app.get('/users', getUsers);
app.get('/users/:userId', getUserById);
app.post('/items', createItem);
app.get('/items', getItems);
app.delete('/items/:itemId', deleteItem);
app.put('/items/:itemId/likes', likes);
app.delete('/items/:itemId/likes', removeLikes);
app.get('/', (req, res) => res.send('Server is running')); // Unprotected root route
app.use('/users', auth, usersRouter);
app.use('/items', auth, clothingItemRouter);

// Global error handler middleware (MUST be before catch-all)
app.use((err, req, res) => {
  if (err.code === 11000) {
    return res.status(ERROR_TYPES.DUPLICATE_LOGIN.statusCode)
              .send({ message: ERROR_TYPES.DUPLICATE_LOGIN.message });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
              .send({ message: ERROR_TYPES.BAD_REQUEST.message });
  }
  
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  
  return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
            .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
});

// Catch-all for undefined routes (MUST be last)
app.use((req, res) => {
  res
    .status(ERROR_TYPES.NOT_FOUND.statusCode)
    .send({ message: ERROR_TYPES.NOT_FOUND.message });
});





app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log("Server is running");
});

