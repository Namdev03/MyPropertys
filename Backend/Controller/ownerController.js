import { Owner } from "../Model/ownerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utils/sendEmail.js";
import client from "../Config/twilio.js";
const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "PRODUCTION", // false in dev (since dev is http)
  sameSite: process.env.NODE_ENV === "PRODUCTION" ? "strict" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
}
//===== Owner Sign up =====
export const ownerSignUp = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const isExist = await Owner.findOne({ email });
    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "Owner already exists.",
      });
    }
    const phoneNumber = `+91${phone}`
    const hashPassword = await bcrypt.hash(password, 10);
    const owner = await Owner.create({
      fullName,
      email,
      password: hashPassword,
      phone :phoneNumber,
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
    const { emailorPhone, password } = req.body;

    const isExist = await Owner.findOne({
      $or: [
        { email: emailorPhone },
        { phone: emailorPhone },
      ],
    }).select("+password +phone");

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "Owner not found.",
      });
    }
    if (!isExist.isPhoneVerified) {
      const verification = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({
          to: isExist.phone, // e.g. +916266976479
          channel: "sms",
        });
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully.",
      });
    }
    const isMatch = await bcrypt.compare(password, isExist.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
    if (!isExist.isPhoneVerified) {
      const verification = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({
          to: isExist.phone, // e.g. +916266976479
          channel: "sms",
        });
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully.",
      });
    }
    const token = jwt.sign(
      {
        owner: isExist.select("-password")
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
      owner: isExist.select("-password")
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//=====Verify phone using Otp=====
export const verifyPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const { otp } = req.body;
    const isExist = await Owner.findOne({ phone });
    if (!isExist) {
      return res.status(404).json({
        message: "Invailid Phone Number"
      })
    };
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code: otp,
      });

    isExist.isPhoneVerified = true;
    await isExist.save();
    return res.status(200).json({
      success: true,
      message: ` Successfully logged in ${isExist.fullName}`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//=====Send Otp using phone for verify user =====
export const reSendOtp = async (req, res) => {
  try {
    const { phone } = req.params;
    const user = await Owner.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        message: "Invailid Phone Number"
      })
    };
    // Generate OTP
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone, // e.g. +916266976479
        channel: "sms",
      });
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
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
// =====Send Otp using phone for reset password =====
export const sendOtpPhone = async (req, res) => {
    try {
        const { phone } = req.body;

        const phoneNumber = phone.startsWith("+") ? phone : `+91${phone}`;

        const user = await Owner.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid phone number",
            });
        }

        await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({
                to: phoneNumber,
                channel: "sms",
            });

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// =====Verify Otp using phone for reset password =====
export const resetPasswordUsingPhone = async (req, res) => {
    try {
        const { phone } = req.params;
        const { otp, password } = req.body;
        const user = await Owner.findOne({ phone });
        if (!user) {
            return res.status(404).json({
                message: "Invailid Phone Number"
            })
        };
         const verification = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({
                to: phone,
                code: otp,
            });
        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update password
        user.password = hashedPassword;
       await user.save()
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
}
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