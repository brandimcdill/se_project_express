import express from 'express';
import { getCurrentUser, updateUser } from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.get("/me", getCurrentUser);
usersRouter.get("/getCurrentUser", getCurrentUser);

usersRouter.patch("/me", updateUser);
usersRouter.patch("/updateUser", updateUser);



export default usersRouter;
