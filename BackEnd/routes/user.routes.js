import express from "express"
import { getUserData, loginUser, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.get('/data' , verifyJWT , getUserData)


export default userRouter