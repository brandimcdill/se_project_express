import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';



import router from "./routes/index.js";

import { ERROR_TYPES } from "./utils/error.js";
const errorHandler = require('./middlewares/error-handler');


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


// Wrap controllers to ensure errors are passed to error handler

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());


// Global error handler middleware (MUST be before catch-all)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({ message: "An error has occurred on the server" });
});



app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log("Server is running");
});

