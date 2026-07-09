import {Property} from "../model/propertyModel.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const addNewProperty = async (req, res) => {
  try {
    const owner = req.id;
    const {
      title,
      description,
      propertyType,
      purpose,
      furnishing,
      bhk,
      balconies,
      floor,
      totalFloors,
      price,
      securityDeposit,
      maintenanceCharge,
      availableFrom,
      amenities,
      rules,
      parking,
      nearbyPlaces,
      address,
      area,
    } = req.body;
    const uploadImages = async (files = []) => {
      const imageUrls = [];

      for (const file of files) {
        const fileUri = getDataUri(file);
        console.log(fileUri);
        
        const uploaded = await cloudinary.uploader.upload(
          fileUri,
          {
            folder: "myproperty"   
          }
        );
        imageUrls.push(uploaded.secure_url);
      }
      return imageUrls;
    };
    const propertyImages = await uploadImages(
      req.files.propertyImage || []
    );
    const roomImages = await uploadImages(
      req.files.rooms || []
    );
    const bathroomImages = await uploadImages(
      req.files.bathrooms || []
    );
    const hallImages = await uploadImages(
      req.files.hall || []
    );
   console.log(req.files);
   
    const property = await Property.create({
      owner,
      title,
      description,
      propertyType,
      propertyImage: propertyImages,
      rooms: roomImages,
      bathrooms: bathroomImages,
      hall: hallImages,
      purpose,
      furnishing,
      bhk,
      balconies,
      floor,
      totalFloors,
      area,
      price,
      securityDeposit,
      maintenanceCharge,
      availableFrom,
      amenities,
      rules,
      parking,
      nearbyPlaces,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};