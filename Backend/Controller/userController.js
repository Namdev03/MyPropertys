import { User } from "../Model/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendEmail } from "../Utils/sendEmail.js";
//===== User Sign Up =====
const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION", // false in dev (since dev is http)
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
}
export const userSignUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(409).json({
                message: "User already exists! Please login.",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
            email,
            password: hashPassword,
        });
        return res.status(201).json({
            message: "Successfully registered",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
//==== user Sign In=====
export const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isExist = await User.findOne({ email }).select("+password");
        if (!isExist) {
            return res.status(404).json({
                message: "Email does not exist",
            });
        }
        const isMatch = await bcrypt.compare(password, isExist.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign(
            { id: isExist._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, cookieOption);
        const user = {
            id: isExist._id,
            fullName: isExist.fullName,
            email: isExist.email,
            role: isExist.role,
            profileImage: isExist.profileImage,
            isEmailVerified: isExist.isEmailVerified,
            isPhoneVerified: isExist.isPhoneVerified,
            status: isExist.status
        };

        return res.status(200).json({
            message: `Successfully logged in ${isExist.fullName}`,
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
//=====Logout User ====
export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOption);
        return res.status(200).json({
            message: "successfullt logout"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
//=====user Profile ====
export const userProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        };
        return res.status(200).json({
            message: "user found successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// =====Send Otp using Email =====
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Invailid Email"
            })
        };
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        // Save OTP
        user.otp = otp;
        await user.save();
        // Send Email
        await sendEmail({
            to: user.email,
            subject: "OTP Verification",
            html: `
        <h2>Hello ${user.fullName}</h2>
        <h3>Your OTP is:</h3>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
        });
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
// =====Compare OTP and Reset Password using Email=====
export const resetPassword = async (req, res) => {
  try {
    const {email} = req.params
    const {otp, password } = req.body;
      
    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;
    // Clear OTP
    user.otp = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===== Me Route =====
export const meRoute = async (req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User authenticated",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};