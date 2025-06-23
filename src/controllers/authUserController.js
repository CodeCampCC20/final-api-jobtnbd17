import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  try {
    const { username, password , confirmPassword} = req.body;

    console.log(req.body);

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      createError(400, "username already exist !");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);
    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });
    res.status(200).json({ message: "Register user Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { username , password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username : username,
      },
    });
    if(!user) {
    createError(400, "Username or Password invalid !!");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      createError(400, "Username or Password invalid");
    }

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.USER_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      id: user.id,
      username: user.username,
      specialization: user.specialization,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
