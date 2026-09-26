import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    requestLogger.info("Connected to DB");
  })
  .catch((err) => {
    console.error("Database connection failure:", err);
  });

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());


app.use(errorHandler);



app.listen(PORT, () => {
  requestLogger.info(`Listening on port ${PORT}`);
  requestLogger.info("Server is running smmothly");
});

