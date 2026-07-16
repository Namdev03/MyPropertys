import React from "react";
import { Link } from "react-router";
import {
  MapPin,
  IndianRupee,
  Heart,
} from "lucide-react";
import { useSelector } from "react-redux"
function Properties() {
  const { propertiesData } = useSelector((store) => store.properties);
  return (
    <section className="min-h-screen bg-gray-100 py-10">

      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-[#14213D]">
            Explore Properties
          </h1>

          <p className="mt-3 text-gray-500">
            Discover your perfect home from our verified properties.
          </p>

        </div>

        {/* Property Grid */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

          {propertiesData?.properties?.map((property) => (

            <div
              key={property?._id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative overflow-hidden">
                <Link to={`/property/${property?._id}`}>
                  <img
                    src={property?.propertyImages}
                    alt={property?.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  {/* Property Type */}

                  <span className="absolute left-4 top-4 rounded-full bg-[#2F6844] px-4 py-1 text-xs font-semibold text-white">

                    {property?.propertyType}

                  </span>
                </Link>
                {/* Wishlist */}

                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:bg-red-50">

                  <Heart
                    size={20}
                    className="text-gray-600 hover:text-red-500"
                  />

                </button>

              </div>

              {/* Body */}
              <div className="space-y-4 p-5">
                <Link to={`/property/${property?._id}`}>
                  <h2 className="line-clamp-1 text-2xl font-bold text-[#14213D]">
                    {property?.title}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500">

                    <MapPin
                      size={18}
                      className="text-[#2F6844]"
                    />

                    <span className="line-clamp-1">
                      {property?.address}, {property?.city}, {property.state}
                    </span>

                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                    {property?.description}
                  </p>

                  {/* Bottom */}

                  <div className="flex items-center justify-between border-t pt-4">

                    <div className="flex items-center text-[#2F6844]">

                      <IndianRupee size={20} />

                      <span className="text-2xl font-bold">

                        {property?.price?.toLocaleString("en-IN")}

                      </span>

                    </div>
                    <button
                      className="rounded-xl bg-[#14213D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2F6844]"
                    >
                      View Details
                    </button>

                  </div>
                </Link>
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Properties;