import { object, ref, string } from "yup";

export const registerSchema = object({
  username: string().min(6).required("Username is required more than 6 "),
  password: string().min(6, "Password ต้องมาUseกกว่า 6"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "confirm password invalid"
  ),
});


export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body,{abortEarly : false});
    next();
  } catch (error) {
    const errMsg = error.errors.map((item)=> item);
    const errTxt = errMsg.join(",")
    const mereErr = new Error(errTxt)
    console.log(errMsg);
    next(mereErr);
  }
};