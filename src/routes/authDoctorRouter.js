import express from "express";
import { docLogin, docRegister } from "../controllers/authDocController.js";
import { registerSchema, validate } from "../validator/validate.js";

const authDocterRouter = express.Router();

authDocterRouter.post('/register/doctor',validate(registerSchema),docRegister)
authDocterRouter.post('/login/doctor',docLogin)


export default authDocterRouter;
