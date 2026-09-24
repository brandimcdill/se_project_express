import express from 'express';
import { getCurrentUser, updateUser } from "../controllers/users.js";
import { validateUserUpdate } from '../middlewares/validation.js';

const usersRouter = express.Router();

usersRouter.get("/me", getCurrentUser);
usersRouter.patch("/me", validateUserUpdate, updateUser);


export default usersRouter;
