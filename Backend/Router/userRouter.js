import express from "express"
import { Logout, meRoute, reSendOtp, resetPassword, resetPasswordUsingPhone, sendOtp, sendOtpPhone, userProfile, userSignIn, userSignUp, verifyPhone } from "../Controller/userController.js"
import { userAuth } from "../middleware/userMiddleware.js"
export const userRouter = express.Router()
//===== user Singup ====
userRouter.post("/signup",userSignUp)
//===== user SingIn ====
userRouter.post('/signin',userSignIn)
//=====Verify User using Phone ======
userRouter.post('/verify/:phone',verifyPhone)
//=====Send Otp using phone for verify user =====
userRouter.post('/resend/:phone',reSendOtp)
//===== Logout =====
userRouter.get('/logout',Logout)
//=====user Profile ====
userRouter.get('/profile',userAuth,userProfile)
// =====Send Otp using Email Otp=====
userRouter.post('/sendotp',sendOtp)
// =====Compare OTP and Reset Password using Email Otp =====
userRouter.post("/reset/:email",resetPassword)
// =====Send Otp using phone for reset password =====
userRouter.post('/phoneotp',sendOtpPhone)
// =====Verify Otp using phone for reset password =====
userRouter.post('/resetpassword/:phone',resetPasswordUsingPhone)
// ===== Me Route =====
userRouter.get("/me",userAuth,meRoute)
