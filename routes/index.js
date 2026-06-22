import express from 'express';
import { ERROR_TYPES } from "../utils/error.js";
import auth from '../middlewares/auth.js';
import usersRouter from './users.js';
import clothingItemRouter from "./clothingItem.js";
import { createUser, login} from '../controllers/users.js';
import { getItems } from '../controllers/clothingItem.js'

const router = express.Router();

router.post('/signin', login)
router.post('/signup', createUser);
router.get('/items', getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res
    .status(ERROR_TYPES.NOT_FOUND.statusCode)
    .send({ message: ERROR_TYPES.NOT_FOUND.message });
});

export default router;
