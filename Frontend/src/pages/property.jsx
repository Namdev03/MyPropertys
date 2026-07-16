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
import { useParams } from "react-router";
import Loading from "../components/Loading.jsx";

export default function PropertyDetails() {

    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(propertyAsync(id))
    }, [dispatch])
    const { propertyData, isLoaing } = useSelector((store) => store.properties)

    const property = propertyData?.property || {};
    if (isLoaing) {
        return <Loading />
    }
    return (
        <div className="bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-8">

                {/* Image Gallery */}

                <div className="grid gap-3 lg:grid-cols-4">

                    <div className="lg:col-span-2">
                        <img
                            src={property?.propertyImages}
                            className="h-[420px] w-full rounded-2xl object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:col-span-2">
                        <img
                            key={id}
                            src={property?.propertyImages}

                            className="h-[200px] w-full cursor-pointer rounded-xl object-cover transition hover:scale-95"
                        />
                    </div>

                </div>

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

                        <div className="mt-5 flex justify-end gap-3">
                            <button className="flex-1 rounded-xl bg-green-700 py-4 text-white transition hover:bg-[#babfcb]">
                                Book
                            </button>
                            <button className="rounded-xl border p-3 hover:bg-red-50">
                                <Heart />
                            </button>

                            <button className="rounded-xl border p-3 hover:bg-gray-100">
                                <Share2 />
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

                        <div className="flex items-center gap-3">
                            <Wifi className="text-[#2F6844]" />
                            WiFi
                        </div>

                        <div className="flex items-center gap-3">
                            <Car className="text-[#2F6844]" />
                            Parking
                        </div>

                        <div className="flex items-center gap-3">
                            <Dumbbell className="text-[#2F6844]" />
                            Gym
                        </div>

                        <div className="flex items-center gap-3">
                            <Trees className="text-[#2F6844]" />
                            Garden
                        </div>

                        <div className="flex items-center gap-3">
                            <Shield className="text-[#2F6844]" />
                            Security
                        </div>

                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-[#2F6844]" />
                            Swimming Pool
                        </div>

                    </div>

                </div>

                {/* Interior Images */}
            </div>

        </div>
    );
}
