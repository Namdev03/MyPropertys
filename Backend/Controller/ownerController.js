import { Owner } from "../Model/ownerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION", // false in dev (since dev is http)
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
}
//===== Owner Sign Up Controller =====
export const ownerSignUp = async (req, res) => {
  try {
    const { fullName, email, password} = req.body;

    const isExist = await Owner.findOne({ email });

    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "Owner already exists.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const owner = await Owner.create({
      fullName,
      email,
      password: hashPassword,
      role: "Owner",
    });
    return res.status(201).json({
      success: true,
      message: "Owner registered successfully.",
      owner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//===== Owner Sign In Controller =====
export const ownerSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ email }).select("+password");

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found.",
      });
    }
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
    const token = jwt.sign(
      {
        id: owner._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("ownerToken", token, cookieOption);
    return res.status(200).json({
      success: true,
      message: `Welcome ${owner.fullName}`,
      owner: {
        id: owner._id,
        fullName: owner.fullName,
        email: owner.email,
        role: owner.role,
        profileImage: owner.profileImage,
        isEmailVerified: owner.isEmailVerified,
        isPhoneVerified: owner.isPhoneVerified,
        status: owner.status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//===== Owner Logout Controller =====
export const ownerLogout = async (req, res) => {
  try {
    res.clearCookie("ownerToken");

    return res.status(200).json({
      success: true,
      message: "Owner logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//=====Owner Profile ====
export const ownerProfile  = async (req,res) => {
    try {
        const ownerId = req.id;
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({
                message:"Owner not found"
            }) 
        };
        return res.status(200).json({
            message:"owner found successfully",
            owner
        })
    } catch (error) {
         return res.status(500).json({
            message:error.message
        });
    }
}