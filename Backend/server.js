import "dotenv/config";
import express from "express";
const server = express()
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Port from .env
const port = process.env.PORT || 5000;
// Start server 
server.listen(port, () => { console.log(`Server is live on port ${port}`); });
