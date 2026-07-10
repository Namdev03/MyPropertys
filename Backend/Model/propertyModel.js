import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Villa", "PG", "Office"],
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    area: {
      type: Number, // sqft
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },
    amenities:
    {
      type: String,
      enum: ["wifi", "gym", "swimming pool", "parking", "garden", "security", "elevator"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    propertyImages: [
      {
        type: String,
      },
    ],

    roomImages: [
      {
        type: String,
      },
    ],

    bathroomImages: [
      {
        type: String,
      },
    ],

    hallImages: [
      {
        type: String,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Property = model("Property", propertySchema);