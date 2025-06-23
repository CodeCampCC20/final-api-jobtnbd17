import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt  from "bcryptjs";

export const getDoctor = async (req, res, next) => {
  try {
    const user = await prisma.doctor.findUnique({
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

export const doctorUpdate = async (req, res, next) => {
  try {
    const { username, password , specialization } = req.body;

    // console.log("Hello", req.user);
    const hash = bcrypt.hashSync(password,10)

    const result = await prisma.doctor.update({
      where: {
        id: req.user.id,
      },
      data: {
        username,
        password: hash,
        specialization
      },
      omit : {
        password : true
      }
    });
    res.status(200).json({
      result
    });
  } catch (error) {
    next(error);
  }
};
