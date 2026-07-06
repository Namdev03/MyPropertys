import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //===== Basic Information=====
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    fullName: {
      type: String,
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
      default: "",
    },

    //===== Role =====
    role: {
      type: String,
      enum: ["buyer", "owner", "agent", "admin"],
      default: "buyer",
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
    //=====Saved Properties =====
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    // Agent Details
    agencyName: String,
    
    experience: Number,

    licenseNumber: String,

    bio: String,

    // Authentication
    refreshToken: String,

    lastLogin: Date,

    loginProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // Settings
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);