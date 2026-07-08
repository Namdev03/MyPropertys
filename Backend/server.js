import "dotenv/config";
import express from "express";
import { MongoDbConnection } from "./Config/mongoDb.js";
import { userRouter } from "./Router/userRouter.js";
import cookieParser from "cookie-parser";
import { ownerRouter } from "./Router/ownerRouter.js";
const server = express()
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser())
// Port from .env
const port = process.env.PORT || 5000;
//=====user Router===== 
server.use('/user',userRouter)
//=====Owner Router=====
server.use('/owner',ownerRouter)
//=====Start server===== 
server.listen(port, async() =>  { 
    console.log(`Server is live on port ${port}`);
    await MongoDbConnection()
 });
