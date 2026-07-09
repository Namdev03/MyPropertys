import expess from "express";
import { addNewProperty } from "../Controller/propertyController.js";
import { ownerAuth } from "../middleware/ownerMiddelware.js";
import upload from "../Config/multer.js";

export const propertyRouter = expess.Router();
//=====Add new property=====
propertyRouter.post('/add', ownerAuth, upload.fields([
    { name: "propertyImage", maxCount: 10 },
    { name: "rooms", maxCount: 20 },
    { name: "bathrooms", maxCount: 10 },
    { name: "hall", maxCount: 10 },
]), addNewProperty)