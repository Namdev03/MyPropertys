import expess from "express";
import { addNewProperty, allProperty, editProperty, getProperty } from "../Controller/propertyController.js";
import { ownerAuth } from "../middleware/ownerMiddelware.js";
import upload from "../Config/multer.js";
import { userAuth } from "../middleware/userMiddleware.js";

export const propertyRouter = expess.Router();
//=====Add new property=====
propertyRouter.post('/add', ownerAuth,upload.fields([
  { name: "propertyImages", maxCount: 10 },
  { name: "roomImages", maxCount: 10 },
  { name: "bathroomImages", maxCount: 10 },
  { name: "hallImages", maxCount: 10 },
]), addNewProperty)
//=====Get All Property======
propertyRouter.get('/properties',userAuth,allProperty)
//=====Get Property by params======
propertyRouter.get('/property/:id',userAuth,getProperty)
//=====Edit propery Details======
propertyRouter.post('/property/:id',ownerAuth,editProperty)