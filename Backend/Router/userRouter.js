import express from "express"
import { Logout, meRoute, resetPassword, sendOtp, sendOtpPhone, userProfile, userSignIn, userSignUp, verifyPhone } from "../Controller/userController.js"
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
// =====Send Otp using phone for reset password =====
userRouter.post('/phoneotp/:phone',sendOtpPhone)
//=====Verify User using Phone ======
userRouter.post('/verify/:phone',verifyPhone)
// ===== Me Route =====
userRouter.get("/me",userAuth,meRoute)
