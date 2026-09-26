import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
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


app.use((err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({ message: "An error has occurred on the server" });
  next();
});



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log("Server is running smmothly");
});

