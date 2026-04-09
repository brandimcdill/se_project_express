import express from 'express';
import { ERROR_TYPES } from "../utils/error.js";
import usersRouter from "./users.js";
import clothingItemRouter from "./clothingItem.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res
    .status(ERROR_TYPES.NOT_FOUND.statusCode)
    .send({ message: ERROR_TYPES.NOT_FOUND.message });
});

export default router;
