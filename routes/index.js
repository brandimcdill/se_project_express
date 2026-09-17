import express from 'express';
import auth from '../middlewares/auth.js';
import usersRouter from './users.js';
import clothingItemRouter from "./clothingItem.js";
import { createUser, login} from '../controllers/users.js';
import { getItems } from '../controllers/clothingItem.js';
import { validateUserBody, validateLogin } from '../middlewares/validation.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();

router.post('/signin', validateLogin, login)
router.post('/signup', validateUserBody, createUser);
router.get('/items', getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", clothingItemRouter);

router.use(( _next) => {
  throw new NotFoundError("The requested resource was not found");
});

export default router;
