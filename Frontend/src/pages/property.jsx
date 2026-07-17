import React, { useEffect, useState } from "react";
import {
    BedDouble,
    Bath,
    MapPin,
    Square,
    Heart,
    Share2,
    Wifi,
    Car,
    Trees,
    Dumbbell,
    Shield,
    Building2,
    CheckCircle,

} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { propertyAsync } from "../Redux/propertySlice.js";
import { Link, useParams } from "react-router";
import Loading from "../components/Loading.jsx";
import { pagePath } from "../Router/pagePaths.js";

export default function PropertyDetails() {

    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(propertyAsync(id))
    }, [dispatch])
    const { propertyData, isLoaing } = useSelector((store) => store.properties)

    const property = propertyData?.property || {};
    // Combine all images
    const allImages = [
        ...(property?.propertyImages || []),
        ...(property?.roomImages || []),
        ...(property?.hallImages || []),
        ...(property?.bathroomImages || []),
    ];
    const amenityIcons = {
        wifi: <Wifi className="text-[#2F6844]" />,
        parking: <Car className="text-[#2F6844]" />,
        garden: <Trees className="text-[#2F6844]" />,
        gym: <Dumbbell className="text-[#2F6844]" />,
        security: <Shield className="text-[#2F6844]" />,
        "swimming pool": <CheckCircle className="text-[#2F6844]" />,
        elevator: <Building2 className="text-[#2F6844]" />,
    };
    if (isLoaing) {
        return <Loading />
    }
    return (
        <div className="bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-8">

                {/* Image Gallery */}

                <div className="grid gap-4 lg:grid-cols-4">

                    {/* Large Image */}
                    <div className="lg:col-span-2">
                        <img
                            src={allImages[0] || "/placeholder.jpg"}
                            alt="Property"
                            className="h-[500px] w-full rounded-2xl object-cover shadow-lg transition duration-300 hover:brightness-95"
                        />
                    </div>

                    {/* Right Side Images */}
                    <div className="grid grid-cols-2 gap-4 lg:col-span-2">
                        {allImages.slice(1, 5).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Property ${index + 2}`}
                                className="h-[242px] w-full rounded-xl object-cover shadow-lg cursor-pointer transition duration-300 hover:scale-95"
                            />
                        ))}
                    </div>

                </div>

                {/* Remaining Images */}
                {allImages.length > 5 && (
                    <div className="mt-8">
                        <h2 className="mb-5 text-2xl font-bold text-[#14213D]">
                            Property Gallery
                        </h2>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {allImages.slice(5).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Gallery ${index + 6}`}
                                    className="h-64 w-full rounded-xl object-cover shadow-lg transition duration-300 hover:scale-105 cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>
                )}
                {/* Title */}

                <div className="mt-8 flex flex-col justify-between gap-5 lg:flex-row">

                    <div>

                        <h1 className="text-4xl font-bold text-[#14213D]">
                            {property.title}
                        </h1>

                        <p className="mt-2 flex items-center gap-2 text-gray-600">
                            <MapPin size={18} />
                            {property.address}, {property.city}, {property.state}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3">

                            <span className="rounded-full bg-[#14213D] px-4 py-2 text-white">
                                {property.propertyType}
                            </span>

                            <span
                                className={`rounded-full px-4 py-2 ${property.isAvailable
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {property.isAvailable ? "Available" : "Booked"}
                            </span>

                        </div>

                    </div>

                    <div className="text-right">

                        <h2 className="text-4xl font-bold text-[#2F6844]">
                            ₹{property?.price}
                        </h2>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">

                            {/* Book Button */}
                            <Link to={`${pagePath.BOOKING}/${id}`}
                            
                                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-emerald-700 hover:to-green-800 hover:shadow-xl active:scale-95 sm:min-w-[220px]"
                            >
                                <Building2 size={20} />
                                Book Now
                            </Link>
                            {/* Wishlist */}
                            <button
                                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                <Heart size={20} />
                            </button>

                            {/* Share */}
                            <button
                                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:bg-gray-100"
                            >
                                <Share2 size={20} />
                            </button>

                        </div>
                    </div>

                </div>

                {/* Property Info */}

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl bg-white p-5 shadow">
                        <BedDouble className="mb-2 text-[#2F6844]" />
                        <p>{property?.bedrooms} Bedrooms</p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <Bath className="mb-2 text-[#2F6844]" />
                        <p>{property?.bathrooms} Bathrooms</p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <Square className="mb-2 text-[#2F6844]" />
                        <p>{property?.area} sqft</p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <Building2 className="mb-2 text-[#2F6844]" />
                        <p>{property?.propertyType}</p>
                    </div>

                </div>

                {/* Description */}

                <div className="mt-8 rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-4 text-2xl font-bold text-[#14213D]">
                        Description
                    </h2>

                    <p className="leading-8 text-gray-600">
                        {property?.description}
                    </p>

                </div>

                {/* Amenities */}
                <div className="mt-8 rounded-2xl bg-white p-8 shadow">
                    <h2 className="mb-6 text-2xl font-bold text-[#14213D]">
                        Amenities
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {property?.amenities?.map((amenity, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 rounded-lg border p-4 transition hover:bg-gray-50"
                            >
                                {amenityIcons[amenity]}
                                <span className="capitalize">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Interior Images */}
            </div>

        </div>
    );
}
