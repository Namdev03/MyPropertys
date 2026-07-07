import "dotenv/config";
import express from "express";
import { MongoDbConnection } from "./Config/mongoDb.js";
import { userRouter } from "./Router/userRouter.js";
import cookieParser from "cookie-parser";
const server = express()
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser())
// Port from .env
const port = process.env.PORT || 5000;
// Start server 
server.use('/user',userRouter)
server.listen(port, async() =>  { 
    console.log(`Server is live on port ${port}`);
    await MongoDbConnection()
 });
