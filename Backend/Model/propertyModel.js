import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic Details
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      enum: [
        "Apartment",
        "Villa",
        "House",
        "PG",
        "Hostel",
        "Office",
        "Shop",
        "Warehouse",
      ],
      required: true,
      trim: true,
    },

    purpose: {
      type: String,
      enum: ["Rent", "Sale"],
      default: "Rent",
    },

    furnishing: {
      type: String,
      enum: [
        "Fully Furnished",
        "Semi Furnished",
        "Unfurnished",
      ],
    },

    // Images
    propertyImages: {
      type: [String],
      required: true,
    },

    roomImages: {
      type: [String],
      required: true,
    },

    bathroomImages: {
      type: [String],
      required: true,
    },

    hallImages: {
      type: [String],
      default: [],
    },

    // Property Details
    bhk: Number,

    bathrooms: {
      type: Number,
      default: 1,
    },

    balconies: Number,

    floor: Number,

    totalFloors: Number,

    area: {
      value: Number,
      unit: {
        type: String,
        default: "sq.ft",
      },
    },

    price: {
      type: Number,
      required: true,
    },

    securityDeposit: Number,

    maintenanceCharge: Number,

    availableFrom: Date,

    status: {
      type: String,
      enum: ["Available", "Booked", "Rented", "Inactive"],
      default: "Available",
    },

    // Address
    address: {
      houseNo: String,
      street: String,
      landmark: String,
      city: String,
      state: String,
      country: String,
      pincode: String,

      location: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
        },
      },
    },

    // Amenities
    amenities: [String],

    // Rules
    rules: {
      petsAllowed: Boolean,
      smokingAllowed: Boolean,
      bachelorsAllowed: Boolean,
      familyOnly: Boolean,
    },

    // Parking
    parking: {
      bike: Boolean,
      car: Boolean,
    },

    // Nearby Places
    nearbyPlaces: [
      {
        name: String,
        distance: String,
      },
    ],

    // Statistics
    totalViews: {
      type: Number,
      default: 0,
    },

    totalLikes: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Property = model("Property", propertySchema);