import Property from "../models/property.model.js";

export const addNewProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      purpose,
      furnishing,
      bhk,
      bathrooms,
      balconies,
      floor,
      totalFloors,
      area,          // { value, unit }
      price,
      securityDeposit,
      maintenanceCharge,
      availableFrom,
      address,       // { houseNo, street, landmark, city, state, country, pincode, location }
      amenities,
      rules,         // { petsAllowed, smokingAllowed, bachelorsAllowed, familyOnly }
      parking,       // { bike, car }
      nearbyPlaces,
    } = req.body;

    // Basic required-field validation
    if (!title || !description || !propertyType || !price) {
      return res.status(400).json({
        message: "Title, description, propertyType, and price are required",
      });
    }

    // Handle uploaded images (assuming multer + cloudinary middleware attaches req.files)
  

    const newProperty = await Property.create({
      owner: req.id, // comes from userAuth middleware
      title,
      description,
      propertyType,
      purpose,
      furnishing,
      bhk,
      bathrooms,
      balconies,
      floor,
      totalFloors,
      area,
      price,
      securityDeposit,
      maintenanceCharge,
      availableFrom,
      address,
      images,
      amenities,
      rules,
      parking,
      nearbyPlaces,
    });
    return res.status(201).json({
      message: "Property added successfully",
      property: newProperty,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};