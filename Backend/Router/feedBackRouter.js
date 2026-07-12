import express from "express"
import { userAuth } from "../middleware/userMiddleware.js"
import { editFeedBack, getFeedBack, newFeedBack } from "../Controller/feedBackController.js"
export const feedBackRouter = express.Router()
//===== Add new Feed Back =====
feedBackRouter.post('/new/:id',userAuth,newFeedBack)
// ===== Get Feedback =====
feedBackRouter.get('/get/:id',userAuth,getFeedBack)
// ===== Edit Feedback =====
feedBackRouter.post('/edit/:id',userAuth,editFeedBack)