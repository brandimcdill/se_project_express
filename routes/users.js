import express from 'express';
import { getCurrentUser, updateUser } from "../controllers/users.js";
import { validateUserBody } from '../middlewares/validation.js';

const usersRouter = express.Router();

usersRouter.get("/me", getCurrentUser);
usersRouter.patch("/me", validateUserBody, updateUser);


export default usersRouter;
