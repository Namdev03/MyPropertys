import { Property } from "../model/propertyModel.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { User } from "../Model/userModel.js";
import { sendEmail } from "../Utils/sendEmail.js";

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
//=====Get Property by params======
export const getProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const properties = await Property.findById(propertyId)
      .populate("owner", "fullName email phone profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully.",
      properties
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
//=====Edit propery Details======
export const editProperty = async (req, res) => {
  try {
    const ownerId = req.id;
    const propertyId = req.params.id;
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

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // Check property ownership
    if (property.owner.toString() !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this property.",
      });
    }
    // Helper function for image upload
    const uploadImages = async (files = []) => {
      const imageUrls = [];
      for (const file of files) {
        const fileUri = getDataUri(file);

        const uploaded = await cloudinary.uploader.upload(fileUri, {
          folder: "MyProperty",
        });

        imageUrls.push(uploaded.secure_url);
      }

      return imageUrls;
    };

    // Upload new images only if provided
    const propertyImages =
      req.files?.propertyImages?.length > 0
        ? await uploadImages(req.files.propertyImages)
        : property.propertyImages;

    const roomImages =
      req.files?.roomImages?.length > 0
        ? await uploadImages(req.files.roomImages)
        : property.roomImages;

    const bathroomImages =
      req.files?.bathroomImages?.length > 0
        ? await uploadImages(req.files.bathroomImages)
        : property.bathroomImages;

    const hallImages =
      req.files?.hallImages?.length > 0
        ? await uploadImages(req.files.hallImages)
        : property.hallImages;

    // Update property details
    if (title) property.title = title;
    if (description) property.description = description;
    if (price) property.price = price;
    if (propertyType) property.propertyType = propertyType;
    if (bedrooms !== undefined) property.bedrooms = bedrooms;
    if (bathrooms !== undefined) property.bathrooms = bathrooms;
    if (area) property.area = area;
    if (address) property.address = address;
    if (city) property.city = city;
    if (state) property.state = state;
    if (country) property.country = country;
    if (amenities) property.amenities = amenities;
    if (isAvailable !== undefined) property.isAvailable = isAvailable;
    // Update images only if new images are uploaded
    if (propertyImages.length > 0) property.propertyImages = propertyImages;
    if (roomImages.length > 0) property.roomImages = roomImages;
    if (bathroomImages.length > 0) property.bathroomImages = bathroomImages;
    if (hallImages.length > 0) property.hallImages = hallImages;

    await property.save();

    return res.status(200).json({
      success: true,
      message: "Property updated successfully.",
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//=====whislist property =====
export const wishListProperty = async (req, res) => {
  try {
    const userId = req.id;
    const propertyId = req.params.id;

    // Check user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const isWishListed = property.wishlistby.includes(userId);

    if (isWishListed) {
      // Remove from wishlist
      await Promise.all([
        User.updateOne(
          { _id: userId },
          { $pull: { wishlist: propertyId } }
        ),
        Property.updateOne(
          { _id: propertyId },
          { $pull: { wishlistby: userId } }
        ),
      ]);

      return res.status(200).json({
        success: true,
        message: "Property removed from wishlist",
      });
    }

    // Add to wishlist
    await Promise.all([
      User.updateOne(
        { _id: userId },
        { $addToSet: { wishlist: propertyId } }
      ),
      Property.updateOne(
        { _id: propertyId },
        { $addToSet: { wishlistby: userId } }
      ),
    ]);

    return res.status(200).json({
      success: true,
      message: "Property added to wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//===== Book Property =====
export const bookProperty = async (req, res) => {
  try {
    const userId = req.id;
    const propertyId = req.params.id;

    // Check user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check property availability
    if (!property.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Property is not available for booking",
      });
    }

    // Check if already booked
    const isBooked = user.booked.includes(propertyId);

    if (isBooked) {
      await Promise.all([
        User.updateOne(
          { _id: userId },
          { $pull: { booked: propertyId } }
        ),
        Property.updateOne(
          { _id: propertyId },
          { $pull: { bookedby: userId } }
        ),
      ]);
      return res.status(200).json({
        success: true,
        booked: false,
        message: "Booking cancelled successfully",
      });
    }
    await sendEmail({
      to: user.email,
      subject: "Property Booking Confirmation 🏠",
      html: `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px;">
      
      <h2 style="color:#28a745;">Booking Confirmed 🎉</h2>

      <p>Hello <strong>${user.fullName}</strong>,</p>

      <p>Your booking has been confirmed successfully.</p>

      <hr>

      <h3>Property Details</h3>

      <p><strong>Property:</strong> ${property.title}</p>

      <p><strong>Address:</strong></p>

      <p>
        ${property.address}<br>
        ${property.city}, ${property.state}<br>
        ${property.country}
      </p>

      <p><strong>Price:</strong> ₹${property.price}</p>

      <p><strong>Booking Date:</strong> ${new Date().toLocaleDateString()}</p>

      <hr>

      <p>Thank you for choosing <strong>MyProperty</strong>.</p>

      <p>Best Regards,<br><strong>MyProperty Team</strong></p>

    </div>
  `,
    });
    // Book property
    await Promise.all([
      User.updateOne(
        { _id: userId },
        { $addToSet: { booked: propertyId } }
      ),
      Property.updateOne(
        { _id: propertyId },
        { $addToSet: { bookedby: userId } }
      ),
    ]);

    return res.status(200).json({
      success: true,
      booked: true,
      message: "Property booked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};