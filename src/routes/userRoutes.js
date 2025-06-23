import express from "express";
import { getHealt, getHealtBtId, getUser, postHealt, updateUser } from "../controllers/userController.js";
import { authUserCheck } from "../middleware/authUser.middleware.js";

const userRouter = express.Router();

userRouter.get('/users/me',authUserCheck,getUser)
userRouter.patch('/users/me',authUserCheck,updateUser)
userRouter.post('/health-records',authUserCheck,postHealt)
userRouter.get('/health-records',authUserCheck,getHealt)
userRouter.get('/health-records/:id',authUserCheck,getHealtBtId)


export default userRouter;
