import express from "express";
import { ownerLogout, ownerSignIn, ownerSignUp } from "../Controller/ownerController.js";
export const ownerRouter = express.Router();
//===== Owner Sign Up =====
ownerRouter.post("/signup",ownerSignUp)
//===== user SingIn ====
ownerRouter.post('/signin',ownerSignIn)
//===== Logout =====
ownerRouter.get('/logout',ownerLogout)