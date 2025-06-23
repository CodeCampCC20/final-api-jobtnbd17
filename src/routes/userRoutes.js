import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { authUserCheck } from "../middleware/authUser.middleware.js";

const userRouter = express.Router();

userRouter.get('/users/me',authUserCheck,getUser)
userRouter.patch('/users/me',authUserCheck,updateUser)

export default userRouter;
