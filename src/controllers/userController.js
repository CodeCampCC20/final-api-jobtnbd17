import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

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
  // console.log("kkkkkkkkkkkkkkkkkkkkk")
  try {
    const { username, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: {
        id : req.user.id
      },
    });
    const result = prisma.user.update({
      where: {
        id:req.user.id,
      },
      data: {
        username: username,
        password: password,
      },
    });
 
  
    res.status(200).json({
      username: result.username,
      password: result.password
    ,result });
  } catch (error) {
    next(error)
  }
};
