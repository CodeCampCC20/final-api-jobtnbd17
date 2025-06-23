import express from "express";
import { userLogin, userRegister } from "../controllers/authUserController.js";
import { registerSchema, validate } from "../validator/validate.js";


const authUserRouter = express.Router();

authUserRouter.post('/register/user',validate(registerSchema),userRegister)
authUserRouter.post('/login/user',userLogin)


export default authUserRouter;
