import express from "express";
import { emailVerification, meRoute, ownerLogout, ownerProfile, ownerSignIn, ownerSignUp, reSendOtp, resetOwnerPassword, resetPasswordUsingPhone, sendOtpPhone, sendOtptoVerify, sendOwnerOtp, verifyPhone } from "../Controller/ownerController.js";
import { ownerAuth } from "../middleware/ownerMiddelware.js";
export const ownerRouter = express.Router();
//===== Owner Sign Up =====
ownerRouter.post("/signup",ownerSignUp)
//===== user SingIn ====
ownerRouter.post('/signin',ownerSignIn)
//=====Verify User using Phone ======
ownerRouter.post('/verify/:phone',verifyPhone)
//=====Send Otp using phone for verify user =====
ownerRouter.post('/resend/:phone',reSendOtp)
//===== Logout =====
ownerRouter.get('/logout',ownerLogout)
//=====Owner Profile ====
ownerRouter.get('/profile',ownerAuth,ownerProfile)
// ===== Send OTP to Owner using Email Otp =====
ownerRouter.post('/sendotp',sendOwnerOtp)
// =====Compare OTP and Reset Password using Email Otp=====
ownerRouter.post("/reset/:email",resetOwnerPassword)
//===== send Email Verification Otp =====
ownerRouter.post('/sendtoptoverification',ownerAuth,sendOtptoVerify)
//=====Email Verification using Otp =====
ownerRouter.post("/emailverification/:email",ownerAuth,emailVerification)
// =====Send Otp using phone for reset password =====
ownerRouter.post('/phoneotp',sendOtpPhone)
// =====Verify Otp using phone for reset password =====
ownerRouter.post('/resetpassword/:phone',resetPasswordUsingPhone)
// ===== Me Route =====
ownerRouter.get("/me",ownerAuth,meRoute)
