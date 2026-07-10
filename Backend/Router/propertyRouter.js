import expess from "express";
import { addNewProperty } from "../Controller/propertyController.js";
import { ownerAuth } from "../middleware/ownerMiddelware.js";
import upload from "../Config/multer.js";

export const propertyRouter = expess.Router();
//=====Add new property=====
propertyRouter.post('/add', ownerAuth,upload.fields([
  { name: "propertyImages", maxCount: 10 },
  { name: "roomImages", maxCount: 10 },
  { name: "bathroomImages", maxCount: 10 },
  { name: "hallImages", maxCount: 10 },
]), addNewProperty)