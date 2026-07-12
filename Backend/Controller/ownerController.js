import { Owner } from "../Model/ownerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utils/sendEmail.js";
const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "PRODUCTION", // false in dev (since dev is http)
  sameSite: process.env.NODE_ENV === "PRODUCTION" ? "strict" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
}
//===== Owner Sign up =====
export const ownerSignUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

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
//===== Owner Sign in =====
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
//===== Owner Logout  =====
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
export const ownerProfile = async (req, res) => {
  try {
    const ownerId = req.id;
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({
        message: "Owner not found"
      })
    };
    return res.status(200).json({
      message: "owner found successfully",
      owner
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}
// ===== Send OTP to Owner for password reset using Email =====
export const sendOwnerOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    owner.otp = otp;
    await owner.save();

    await sendEmail({
      to: owner.email,
      subject: "Owner Password Reset OTP",
      html: `
        <h2>Hello ${owner.fullName}</h2>
        <p>Your OTP is:</p>
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
};
// ===== Reset Owner Password Useing  email Otp =====
export const resetOwnerPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { otp, password } = req.body;

    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (owner.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    owner.password = hashPassword;
    owner.otp = null;

    await owner.save();

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
//===== send Email Verification Otp =====
export const sendOtptoVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    owner.otp = otp;
    await owner.save();
    await sendEmail({
      to: owner.email,
      subject: "Account Verifiction OTP",
      html: `
        <h2>Hello ${owner.fullName}</h2>
        <p>Your OTP is:</p>
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
//=====Email Verification using Otp =====
export const emailVerification = async (req, res) => {
  try {
    const { email } = req.params;
    const { otp } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (owner.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    } owner.isEmailVerified = true;
    owner.otp = null;
    await owner.save();
    return res.status(200).json({
      success: true,
      message: "Email Verifiction successfully",
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
    const ownerId = req.id;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "owner not authenticated",
      });
    }

    const owner = await Owner.findById(ownerId).select("-password");

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "owner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Owner authenticated",
      owner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};