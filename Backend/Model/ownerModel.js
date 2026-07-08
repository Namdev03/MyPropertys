import mongoose from "mongoose";

const { Schema,model } = mongoose;
const ownerSchema = new mongoose.Schema(
  {
    //===== Basic Information =====
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    profileImage: {
      type: String,
      default: "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
    },

    //===== Role =====
    role: {
      type: String,
      default: "owner",
    },
    //===== Verification =====
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    //===== Account Status =====
    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },
    //===== Address =====
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
  },
  {
    timestamps: true, 
  }
);

export const Owner = model("Owner", ownerSchema);