import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const docRegister = async (req, res, next) => {
  try {
    const { username, password, confirmPassword ,specialization } = req.body;

    console.log(req.body);

    const doc = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    if (doc) {
      createError(400, "username already exist !");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);
    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization,
      },
    });
    res.status(200).json({ message: "Register doctor Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const docLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const doc = await prisma.doctor.findFirst({
      where: {
        username : username,
      },
    });
    if(!doc) {
    createError(400, "Username or Password invalid !!");
    }
    const checkPassword = bcrypt.compareSync(password, doc.password);
    if (!checkPassword) {
      createError(400, "Username or Password invalid");
    }

    const payload = {
      id: doc.id,
    };
    const token = jwt.sign(payload, process.env.DOCTOR_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      id: doc.id,
      username: doc.username,
      specialization: doc.specialization,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
