import express from "express"
import { Logout, userSignIn, userSignUp } from "../Controller/userController.js"
export const userRouter = express.Router()
//===== user Singup ====
userRouter.post("/signup",userSignUp)
//===== user SingIn ====
userRouter.post('/signin',userSignIn)
//===== Logout =====
userRouter.get('/logout',Logout)