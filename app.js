import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { createUser, login} from './controllers/users.js';

import auth from './middlewares/auth.js';
import { ERROR_TYPES } from "./utils/error.js";
import usersRouter from "./routes/users.js";
import clothingItemRouter from "./routes/clothingItem.js";
import User from './models/user.js';

const app = express();
app.use(cors());
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);
app.use(express.json());


// Wrap controllers to ensure errors are passed to error handler


app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

app.use('/users',  usersRouter);
app.use('/items',  clothingItemRouter);


// Global error handler middleware (MUST be before catch-all)
app.use((err, req, res, next) => {
  // Handle duplicate key error (code 11000)
  if (err.code === 11000 || (err.keyPattern && err.keyPattern.email)) {
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

