import express from 'express';
import { ERROR_TYPES } from "../utils/error";
import usersRouter from "./users";
import clothingItemRouter from "./clothingItem";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res
    .status(ERROR_TYPES.NOT_FOUND.statusCode)
    .send({ message: ERROR_TYPES.NOT_FOUND.message });
});

export default router;
