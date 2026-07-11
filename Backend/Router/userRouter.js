import express from "express"
import { Logout, userProfile, userSignIn, userSignUp } from "../Controller/userController.js"
import { userAuth } from "../middleware/userMiddleware.js"
export const userRouter = express.Router()
//===== user Singup ====
userRouter.post("/signup",userSignUp)
//===== user SingIn ====
userRouter.post('/signin',userSignIn)
//===== Logout =====
userRouter.get('/logout',Logout)
//=====user Profile ====
userRouter.get('/profile',userAuth,userProfile)