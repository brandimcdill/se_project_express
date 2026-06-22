import express from "express";
import mongoose from "mongoose";
import cors from 'cors';


import router from "./routes/index.js";

import { ERROR_TYPES } from "./utils/error.js";


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


app.use(router);









// Global error handler middleware (MUST be before catch-all)
// eslint-disable-next-line no-unused-vars
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







app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log("Server is running");
});

