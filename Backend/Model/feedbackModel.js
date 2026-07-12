import { Schema, model } from "mongoose";
const feedBackSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true
   },
   feedback: {
      type: String,
      required: true
   }
})
export const FeedBack = model("FeedBack", feedBackSchema)