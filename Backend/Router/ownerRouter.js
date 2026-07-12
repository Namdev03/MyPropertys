import express from "express";
import { emailVerification, meRoute, ownerLogout, ownerProfile, ownerSignIn, ownerSignUp, resetOwnerPassword, sendOtptoVerify, sendOwnerOtp } from "../Controller/ownerController.js";
import { ownerAuth } from "../middleware/ownerMiddelware.js";
export const ownerRouter = express.Router();
//===== Owner Sign Up =====
ownerRouter.post("/signup",ownerSignUp)
//===== user SingIn ====
ownerRouter.post('/signin',ownerSignIn)
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
// ===== Me Route =====
ownerRouter.get("/me",ownerAuth,meRoute)
