import express from "express"
import { Logout, meRoute, resetPassword, sendOtp, userProfile, userSignIn, userSignUp } from "../Controller/userController.js"
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
// =====Send Otp using Email Otp=====
userRouter.post('/sendotp',sendOtp)
// =====Compare OTP and Reset Password using Email Otp =====
userRouter.post("/reset/:email",resetPassword)
// ===== Me Route =====
userRouter.get("/me",userAuth,meRoute)
