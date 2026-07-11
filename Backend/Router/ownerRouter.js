import express from "express";
import { ownerLogout, ownerProfile, ownerSignIn, ownerSignUp } from "../Controller/ownerController.js";
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