import { createError } from "../utils/createError.js";
import jwt, { decode } from 'jsonwebtoken'

export const authUserCheck = (req, res, next) => {
  try {
    
    const header = req.headers.authorization;

    if(!header) {
      createError(401, "Token is missing.")
    }

    console.log(header);

    //2. split token
    const token = header.split(" ")[1]
    console.log(token)

    //3.verify token
    jwt.verify(token , process.env.USER_SECRET,(error,decode) => {
      console.log("aaaaaa",error)
      console.log("zzzzz",decode)
      if(error) {
        createError(401,"Token is invalid")
      }
      req.user = decode;
    })
    
    next()
  } catch (error) {
    next(error)
  }
}
export const authDocCheck = (req, res, next) => {
  try {
    
    const header = req.headers.authorization;

    if(!header) {
      createError(401, "Token is missing.")
    }

    console.log(header);

    //2. split token
    const token = header.split(" ")[1]
    console.log(token)

    //3.verify token
    jwt.verify(token , process.env.DOCTOR_SECRET,(error,decode) => {
      console.log("aaaaaa",error)
      console.log("zzzzz",decode)
      if(error) {
        createError(401,"Token is invalid")
      }
      req.user = decode;
    })
    
    next()
  } catch (error) {
    next(error)
  }
}