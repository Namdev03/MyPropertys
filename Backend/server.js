import "dotenv/config";
import express from "express";
import { MongoDbConnection } from "./Config/mongoDb.js";
import { userRouter } from "./Router/userRouter.js";
import cookieParser from "cookie-parser";
import { ownerRouter } from "./Router/ownerRouter.js";
import { propertyRouter } from "./Router/propertyRouter.js";
import { feedBackRouter } from "./Router/feedBackRouter.js";

const server = express()
//=====Middleware=====
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser())

// Port from .env
const port = process.env.PORT || 5000;

//=====user Router===== 
server.use('/user',userRouter)

//=====Owner Router=====
server.use('/owner',ownerRouter)

//=====Property Router=====
server.use('/property',propertyRouter)
//=====FeedBack Router=====
server.use('/feedback',feedBackRouter)
//=====Start server===== 
server.listen(port, async() =>  { 
    console.log(`Server is live on port ${port}`);
    await MongoDbConnection()
 });
