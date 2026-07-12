import { FeedBack } from "../Model/feedbackModel.js";
import { Property } from "../model/propertyModel.js";
import { User } from "../Model/userModel.js";
//===== Add new Feed Back =====
export const newFeedBack = async (req, res) => {
    try {
        const userId = req.id;
        const propertyId = req.params.id;
        const { feedback } = req.body;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        };
        const property = await Property.findById(propertyId)
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        };
        const feedBack = await FeedBack.create({
            user: userId,
            property: propertyId,
            feedback: feedback
        })
        property.feedback.push(feedBack._id);
        await property.save();
        return res.status(201).json({
            message: "Feedback added successfully",
            feedBack
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
// ===== Get Feedback =====
export const getFeedBack = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    // Fetch all feedback for the property
    const feedbacks = await FeedBack.find({ property: propertyId })
      .populate("user", "profileImage fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Feedback fetched successfully",
      feedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===== Edit Feedback =====
export const editFeedBack = async (req, res) => {
  try {
    const feedBackId = req.params.id;
    const { feedback } = req.body;
    // Validate input
    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Feedback is required",
      });
    }
    // Find feedback
    const feedBack = await FeedBack.findById(feedBackId);
    if (!feedBack) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }
    // Update feedback
    feedBack.feedback = feedback.trim();
    await feedBack.save();
    return res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      feedback: feedBack,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};