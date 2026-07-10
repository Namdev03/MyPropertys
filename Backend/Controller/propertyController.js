import {Property} from "../model/propertyModel.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

//=====Add New Property=====//
export const addNewProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      address,
      city,
      state,
      country,
      amenities,
      isAvailable,
    } = req.body;

    const owner = req.id;

    // Validation
    if (
      !title ||
      !description ||
      !price ||
      !propertyType ||
      !area ||
      !address ||
      !city ||
      !state
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Helper Function
    const uploadImages = async (files = []) => {
      const imageUrls = [];

      for (const file of files) {
        const fileUri = getDataUri(file);
        const uploaded = await cloudinary.uploader.upload(
          fileUri,
          {
            folder: "MyProperty",
          }
        );

        imageUrls.push(uploaded.secure_url);
      }
      
      return imageUrls;
    };

    // Upload Images
    const propertyImages = await uploadImages(
      req.files?.propertyImages || []
    );
    const roomImages = await uploadImages(
      req.files?.roomImages || []
    );

    const bathroomImages = await uploadImages(
      req.files?.bathroomImages || []
    );

    const hallImages = await uploadImages(
      req.files?.hallImages || []
    );

    // Create Property
    const property = await Property.create({
      owner,
      title,
      description,
      price,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      address,
      city,
      state,
      country,
      amenities,
      isAvailable,
      propertyImages,
      roomImages,
      bathroomImages,
      hallImages,
    });

    return res.status(201).json({
      success: true,
      message: "Property added successfully.",
      property,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//=====Get All Property======
export const allProperty = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "fullName email phone profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        properties.length > 0
          ? "Properties fetched successfully."
          : "No properties found.",
      totalProperties: properties.length,
      properties,
    });
  } catch (error) {
   return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};