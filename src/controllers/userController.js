import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log("Hello", req.user);
    const hash = bcrypt.hashSync(password, 10);

    const result = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        username,
        password: hash,
      },
      omit: {
        password: true,
      },
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const postHealt = async (req, res, next) => {
  try {
    const { type, value } = req.body;
    console.log(type, value)
    const user = await prisma.healtRecord.create({
      
      data:{
        type,
        value,
      }
    });
    res.status(200).json({ message: "create healt record successfully" });
  } catch (error) {
    console.log(error);
    next();
  }
};
