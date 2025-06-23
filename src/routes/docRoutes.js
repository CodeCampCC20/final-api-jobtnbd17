import express from "express";
import { authDocCheck } from "../middleware/authUser.middleware.js";
import { doctorUpdate, getDoctor } from "../controllers/docController.js";

const docRouter = express.Router();

docRouter.get('/doctors/me',authDocCheck,getDoctor)
docRouter.patch("/doctors/me", authDocCheck, doctorUpdate);

export default docRouter;
