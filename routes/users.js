import express from 'express';
import { getCurrentUser, updateUser } from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.get("/me", getCurrentUser);

usersRouter.patch("/me", updateUser);


export default usersRouter;
